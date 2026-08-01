import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db.jsx";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import InputBar from "./components/InputBar";
import SuggestionBar from "./components/SuggestionBar";
import {
	CATEGORY_IDS,
	getCustomGroceryItems,
	addCustomGroceryItem,
	getAllGroceryItems,
	updateCustomGroceryItem,
} from "./utils/groceryData";

const EditDrawer = lazy(() => import("./components/EditDrawer.jsx"));
const SettingsDrawer = lazy(() => import("./components/SettingsDrawer.jsx"));
const Onboarding = lazy(() => import("./components/Onboarding"));

function App() {
	const { t, i18n } = useTranslation();
	const [showOnboarding, setShowOnboarding] = useState(() => {
		return localStorage.getItem("munchlist-onboarded") !== "true";
	});

	const handleCloseOnboarding = () => {
		setShowOnboarding(false);
		localStorage.setItem("munchlist-onboarded", "true");
	};
	const items = useLiveQuery(() => db.items.orderBy("category").toArray());
	const [newItem, setNewItem] = useState("");
	const [editText, setEditText] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerItemId, setDrawerItemId] = useState(null);
	const [quantity, setQuantity] = useState("");
	const [unit, setUnit] = useState("");
	const [category, setCategory] = useState(CATEGORY_IDS[0]);
	const [dropdownOpen, setDropdownOpen] = useState(null);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [inputFocused, setInputFocused] = useState(false);
	const [groupByCategory, setGroupByCategory] = useState(() => {
		const stored = localStorage.getItem("munchlist-group-by-category");
		return stored === null ? true : stored === "true";
	});
	const inputRef = useRef(null);
	const inputBarRef = useRef(null);
	const [inputBarTop, setInputBarTop] = useState(null);
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		suggestion: null,
	});
	const [initialViewportHeight, setInitialViewportHeight] = useState(
		typeof window !== "undefined" ? window.innerHeight : 0
	);

	useEffect(() => {
		setInitialViewportHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		if (!inputFocused) {
			setInputBarTop(null);
			return;
		}
		const viewport = window.visualViewport;
		if (!viewport) return;

		// Anchor the bar's `top` directly to visualViewport coordinates rather
		// than deriving a `bottom` offset from window.innerHeight: innerHeight's
		// relationship to the keyboard-shrunk viewport varies across mobile
		// browsers, which was causing the bar to land in the wrong place. Using
		// only the visual viewport's own offsetTop/height keeps it correct
		// regardless of how the browser resizes the layout viewport.
		const updatePosition = () => {
			const barHeight = inputBarRef.current?.offsetHeight || 0;
			setInputBarTop(viewport.offsetTop + viewport.height - barHeight);
		};

		updatePosition();
		viewport.addEventListener("resize", updatePosition);
		viewport.addEventListener("scroll", updatePosition);

		return () => {
			viewport.removeEventListener("resize", updatePosition);
			viewport.removeEventListener("scroll", updatePosition);
		};
	}, [inputFocused]);

	useEffect(() => {
		localStorage.setItem("munchlist-group-by-category", groupByCategory);
	}, [groupByCategory]);

	useEffect(() => {
		setFilteredSuggestions(getAllGroceryItems(i18n.language).slice(0, 8));
	}, [i18n.language]);

	const handleItemInputChange = (value) => {
		setNewItem(value);
		setQuantity(""); // Reset temp values when typing
		setUnit("");
		let allItems = getAllGroceryItems(i18n.language);
		let filtered = allItems;
		if (value.length > 0) {
			filtered = allItems
				.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
				.slice(0, 8);
		} else {
			filtered = allItems.slice(0, 8);
		}
		setFilteredSuggestions(filtered);
	};

	const selectSuggestion = async (suggestion) => {
		setNewItem(suggestion.name);
		setShowSuggestions(false);
		await addItem(null, suggestion.name, suggestion.categoryId);
	};

	const openDrawer = async (itemId) => {
		let item = items.find((i) => i.id === itemId);
		if (!item) {
			item = await db.items.get(itemId);
		}
		if (item) {
			setQuantity(item.quantity ? item.quantity.toString() : "");
			setUnit(item.unit || "");
			setEditText(item.name);
			setCategory(item.category || CATEGORY_IDS[0]);
		} else {
			setQuantity("");
			setUnit("");
			setEditText("");
			setCategory(CATEGORY_IDS[0]);
		}
		setDrawerItemId(itemId);
		setDrawerOpen(true);
	};

	const closeDrawer = () => {
		setDrawerOpen(false);
		setDrawerItemId(null);
	};

	const openSettings = () => setSettingsOpen(true);
	const closeSettings = () => setSettingsOpen(false);

	const saveItemEdit = async () => {
		if (drawerItemId) {
			const currentItem = items.find((i) => i.id === drawerItemId);
			if (!currentItem) return;

			const updates = {
				name: editText.trim(),
				category: category,
			};

			if (quantity !== "" && !isNaN(quantity)) {
				updates.quantity = parseFloat(quantity);
			} else if (quantity === "") {
				updates.quantity = undefined;
			}

			if (unit !== currentItem.unit) {
				updates.unit = unit;
			}

			const customItems = getCustomGroceryItems();
			const isCustom = customItems.some(
				(i) => i.name.toLowerCase() === currentItem.name.toLowerCase()
			);
			if (isCustom) {
				updateCustomGroceryItem(currentItem.name, {
					name: updates.name,
					categoryId: updates.category,
				});
			}

			await db.items.update(drawerItemId, updates);
		}
		closeDrawer();
	};

	const addItem = async (e, nameOverride, categoryOverride) => {
		if (e && e.preventDefault) e.preventDefault();
		const name = (nameOverride !== undefined ? nameOverride : newItem).trim();
		if (!name) return;

		const category = categoryOverride || "other";

		const existingItem = items.find(
			(i) => i.name.trim().toLowerCase() === name.toLowerCase()
		);

		const allItems = getAllGroceryItems(i18n.language);
		if (
			!allItems.some((item) => item.name.toLowerCase() === name.toLowerCase())
		) {
			addCustomGroceryItem({ name, categoryId: category });
		}

		if (existingItem) {
			if (existingItem.completed) {
				await db.items.update(existingItem.id, {
					completed: false,
					quantity: undefined,
					unit: undefined,
				});
			} else {
				let newQuantity = (existingItem.quantity || 1) + 1;
				await db.items.update(existingItem.id, { quantity: newQuantity });
			}
			setNewItem("");
			setQuantity("");
			setUnit("");
			setFilteredSuggestions(getAllGroceryItems(i18n.language).slice(0, 8));
			return;
		}

		const quantityValue =
			nameOverride || categoryOverride
				? undefined
				: quantity && !isNaN(quantity) && quantity !== ""
				? parseFloat(quantity)
				: undefined;

		await db.items.add({
			name: name,
			quantity: quantityValue,
			unit: nameOverride || categoryOverride ? "" : unit || "",
			category: category,
			createdAt: new Date(),
		});

		setNewItem("");
		setQuantity("");
		setUnit("");
		setFilteredSuggestions(getAllGroceryItems(i18n.language).slice(0, 8));
	};

	const toggleComplete = async (id) => {
		const item = items.find((i) => i.id === id);
		await db.items.update(id, { completed: !item.completed });
	};

	return (
		// Height and scroll position are never touched by focus/keyboard state:
		// the list stays exactly where it is, and only the backdrop + input bar
		// float on top of it (like a drawer), positioned above the keyboard via
		// inputBarTop below. This avoids fighting the keyboard for layout space.
		<div
			className="bg-munchlist-bg flex flex-col"
			style={{ height: initialViewportHeight }}
		>
			<Header
				groupByCategory={groupByCategory}
				setGroupByCategory={setGroupByCategory}
				openSettings={openSettings}
			/>
			<div
				className="flex-1 flex flex-col items-center justify-start overflow-y-auto"
				style={{ height: initialViewportHeight }}
			>
				<div className="w-full max-w-md">
					<ShoppingList
						items={items}
						groupByCategory={groupByCategory}
						toggleComplete={toggleComplete}
						openDrawer={openDrawer}
						dropdownOpen={dropdownOpen}
						setDropdownOpen={setDropdownOpen}
						db={db}
					/>
				</div>
			</div>
			{inputFocused && (
				<div
					className="fixed inset-0 bg-black/50 z-30"
					style={{ pointerEvents: "auto" }}
					onMouseDown={() => setInputFocused(false)}
				/>
			)}
			<InputBar
				newItem={newItem}
				setNewItem={setNewItem}
				addItem={addItem}
				inputRef={inputRef}
				inputBarRef={inputBarRef}
				inputFocused={inputFocused}
				setInputFocused={setInputFocused}
				handleItemInputChange={handleItemInputChange}
				filteredSuggestions={filteredSuggestions}
				selectSuggestion={selectSuggestion}
				inputBarTop={inputBarTop}
			>
				<SuggestionBar
					inputFocused={inputFocused}
					filteredSuggestions={filteredSuggestions}
					selectSuggestion={selectSuggestion}
					setDeleteDialog={setDeleteDialog}
				/>
			</InputBar>
			<Suspense fallback={null}>
				<EditDrawer
					drawerOpen={drawerOpen}
					closeDrawer={closeDrawer}
					drawerItemId={drawerItemId}
					items={items}
					editText={editText}
					setEditText={setEditText}
					quantity={quantity}
					setQuantity={setQuantity}
					unit={unit}
					setUnit={setUnit}
					category={category}
					setCategory={setCategory}
					saveItemEdit={saveItemEdit}
				/>
			</Suspense>
			<Suspense fallback={null}>
				<SettingsDrawer settingsOpen={settingsOpen} closeSettings={closeSettings} />
			</Suspense>
			{showOnboarding && (
				<Suspense fallback={null}>
					<Onboarding onFinish={handleCloseOnboarding} />
				</Suspense>
			)}

			{deleteDialog.open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-white rounded-2xl p-6 shadow-lg border border-munchlist-line">
						<p className="mb-4 text-munchlist-ink">
							{t("deleteDialog.confirm", { name: deleteDialog.suggestion.name })}
						</p>
						<div className="flex gap-3 justify-end">
							<button
								className="px-4 py-2 font-bold bg-munchlist-surface-alt text-munchlist-ink rounded-xl hover:bg-munchlist-line"
								onClick={() =>
									setDeleteDialog({ open: false, suggestion: null })
								}
							>
								{t("common.cancel")}
							</button>
							<button
								className="px-4 py-2 font-bold bg-munchlist-danger text-white rounded-xl hover:opacity-90"
								onClick={() => {
									const items = getCustomGroceryItems().filter(
										(item) =>
											item.name.toLowerCase() !==
											deleteDialog.suggestion.name.toLowerCase()
									);
									localStorage.setItem(
										"custom_grocery_items",
										JSON.stringify(items)
									);
									setFilteredSuggestions((prev) =>
										prev.filter(
											(item) =>
												item.name.toLowerCase() !==
												deleteDialog.suggestion.name.toLowerCase()
										)
									);
									setDeleteDialog({ open: false, suggestion: null });
								}}
							>
								{t("common.delete")}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default App;
