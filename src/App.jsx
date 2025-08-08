import { useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { showItemAddedToast } from "./utils/toast";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db.jsx";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import InputBar from "./components/InputBar";
import EditDrawer from "./components/EditDrawer.jsx";
import SuggestionBar from "./components/SuggestionBar";
import {
	COMMON_GROCERY_ITEMS,
	CATEGORIES,
	getCustomGroceryItems,
	addCustomGroceryItem,
	getAllGroceryItems,
	updateCustomGroceryItem,
} from "./utils/groceryData";
import Onboarding from "./components/Onboarding";

function App() {
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
	const [category, setCategory] = useState(CATEGORIES[0]);
	const [dropdownOpen, setDropdownOpen] = useState(null);
	const [inputFocused, setInputFocused] = useState(false);
	const [groupByCategory, setGroupByCategory] = useState(() => {
		const stored = localStorage.getItem("munchlist-group-by-category");
		return stored === null ? true : stored === "true";
	});
	const inputRef = useRef(null);
	const [inputBottom, setInputBottom] = useState(0);
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		suggestion: null,
	});

	useEffect(() => {
		const handleResize = () => {
			if (window.visualViewport) {
				const viewport = window.visualViewport;
				const keyboardHeight =
					window.innerHeight - viewport.height - viewport.offsetTop;
				setInputBottom(keyboardHeight > 0 ? keyboardHeight : 0);
			}
		};

		window.visualViewport?.addEventListener("resize", handleResize);
		window.visualViewport?.addEventListener("scroll", handleResize);

		return () => {
			window.visualViewport?.removeEventListener("resize", handleResize);
			window.visualViewport?.removeEventListener("scroll", handleResize);
		};
	}, []);

	useEffect(() => {
		localStorage.setItem("munchlist-group-by-category", groupByCategory);
	}, [groupByCategory]);

	useEffect(() => {
		setFilteredSuggestions(getAllGroceryItems().slice(0, 8));
	}, []);

	const handleItemInputChange = (value) => {
		setNewItem(value);
		setQuantity(""); // Reset temp values when typing
		setUnit("");
		let allItems = getAllGroceryItems();
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
		await addItem(null, suggestion.name, suggestion.category);
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
			setCategory(item.category || CATEGORIES[0]);
		} else {
			setQuantity("");
			setUnit("");
			setEditText("");
			setCategory(CATEGORIES[0]);
		}
		setDrawerItemId(itemId);
		setDrawerOpen(true);
	};

	const closeDrawer = () => {
		setDrawerOpen(false);
		setDrawerItemId(null);
	};

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
					category: updates.category,
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

		const category = categoryOverride || "Övrigt";

		const existingItem = items.find(
			(i) => i.name.trim().toLowerCase() === name.toLowerCase()
		);

		const allItems = getAllGroceryItems();
		if (
			!allItems.some((item) => item.name.toLowerCase() === name.toLowerCase())
		) {
			addCustomGroceryItem({ name, category });
		}

		if (existingItem) {
			if (existingItem.completed) {
				await db.items.update(existingItem.id, {
					completed: false,
					quantity: undefined,
					unit: undefined,
				});
				showItemAddedToast({
					name: existingItem.name,
					id: existingItem.id,
					openDrawer,
				});
			} else {
				let newQuantity = (existingItem.quantity || 1) + 1;
				await db.items.update(existingItem.id, { quantity: newQuantity });
				showItemAddedToast({
					name: existingItem.name,
					id: existingItem.id,
					openDrawer,
				});
			}
			setNewItem("");
			setQuantity("");
			setUnit("");
			setFilteredSuggestions(COMMON_GROCERY_ITEMS.slice(0, 8));
			return;
		}

		const quantityValue =
			nameOverride || categoryOverride
				? undefined
				: quantity && !isNaN(quantity) && quantity !== ""
				? parseFloat(quantity)
				: undefined;

		const id = await db.items.add({
			name: name,
			quantity: quantityValue,
			unit: nameOverride || categoryOverride ? "" : unit || "",
			category: category,
			createdAt: new Date(),
		});

		showItemAddedToast({ name, id, openDrawer });
		setNewItem("");
		setQuantity("");
		setUnit("");
		setFilteredSuggestions(COMMON_GROCERY_ITEMS.slice(0, 8));
	};

	const toggleComplete = async (id) => {
		const item = items.find((i) => i.id === id);
		await db.items.update(id, { completed: !item.completed });
	};

	const groupedItems = {};
	(items || []).forEach((item) => {
		if (item.completed) {
			if (!groupedItems["Completed"]) groupedItems["Completed"] = [];
			groupedItems["Completed"].push(item);
		} else {
			const cat = item.category || "Other";
			if (!groupedItems[cat]) groupedItems[cat] = [];
			groupedItems[cat].push(item);
		}
	});

	return (
		<div className="h-screen bg-gray-100 flex flex-col relative overflow-hidden">
			<Header
				groupByCategory={groupByCategory}
				setGroupByCategory={setGroupByCategory}
			/>
			<div className="flex-1 overflow-y-auto flex flex-col items-center justify-start w-full">
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
				inputFocused={inputFocused}
				setInputFocused={setInputFocused}
				handleItemInputChange={handleItemInputChange}
				filteredSuggestions={filteredSuggestions}
				selectSuggestion={selectSuggestion}
				inputBottom={inputBottom}
			>
				<SuggestionBar
					inputFocused={inputFocused}
					filteredSuggestions={filteredSuggestions}
					selectSuggestion={selectSuggestion}
					setDeleteDialog={setDeleteDialog}
				/>
			</InputBar>
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
			<ToastContainer stacked position="top-center" />
			{showOnboarding && <Onboarding onFinish={handleCloseOnboarding} />}

			{deleteDialog.open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-white rounded-lg p-6 shadow-lg">
						<p className="mb-4">
							Delete "{deleteDialog.suggestion.name}" from your custom
							suggestions?
						</p>
						<div className="flex gap-3 justify-end">
							<button
								className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
								onClick={() =>
									setDeleteDialog({ open: false, suggestion: null })
								}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default App;
