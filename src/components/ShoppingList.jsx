import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Check,
	Trash2,
	Pencil,
	MoreVertical,
	ShoppingCart,
} from "lucide-react";

const ShoppingList = ({
	items = [],
	groupByCategory,
	toggleComplete,
	openDrawer,
	dropdownOpen,
	setDropdownOpen,
	db,
}) => {
	const { t } = useTranslation();
	const groupedItems = {};
	(items || []).forEach((item) => {
		if (item.completed) {
			if (!groupedItems["completed"]) groupedItems["completed"] = [];
			groupedItems["completed"].push(item);
		} else {
			const cat = item.category || "other";
			if (!groupedItems[cat]) groupedItems[cat] = [];
			groupedItems[cat].push(item);
		}
	});

	const completedCount = items?.filter((item) => item.completed).length;
	const deleteItem = async (id) => {
		await db.items.delete(id);
	};

	const categoryLabel = (categoryId) =>
		categoryId === "completed" ? t("shoppingList.completed") : t(`categories.${categoryId}`);

	return (
		<div className="px-4 pb-48 space-y-2">
			{items?.length === 0 ? (
				<div className="text-center py-12">
					<ShoppingCart className="w-20 h-20 text-munchlist-muted/40 mx-auto mb-4" />
					<p className="text-2xl font-extrabold text-munchlist-ink mb-2">
						{t("shoppingList.emptyTitle")}
					</p>
					<p className="text-lg text-munchlist-muted">
						{t("shoppingList.emptySubtitle")}
					</p>
				</div>
			) : (
				<>
					{groupByCategory
						? [
								...Object.keys(groupedItems).filter(
									(item) => item !== "completed"
								),
								...(groupedItems["completed"] ? ["completed"] : []),
						  ].map((category) => (
								<div key={category} className="mb-6">
									<h2
										className={`text-sm font-extrabold tracking-wide mb-2 ${
											category === "completed"
												? "text-munchlist-muted"
												: "text-munchlist-green"
										}`}
									>
										{categoryLabel(category)}
									</h2>
									{groupedItems[category].map((item) => (
										<ShoppingListItem
											key={item.id}
											item={item}
											toggleComplete={toggleComplete}
											openDrawer={openDrawer}
											deleteItem={deleteItem}
											dropdownOpen={dropdownOpen}
											setDropdownOpen={setDropdownOpen}
										/>
									))}
								</div>
						  ))
						: (items || []).map((item) => (
								<ShoppingListItem
									key={item.id}
									item={item}
									toggleComplete={toggleComplete}
									openDrawer={openDrawer}
									deleteItem={deleteItem}
									dropdownOpen={dropdownOpen}
									setDropdownOpen={setDropdownOpen}
								/>
						  ))}
				</>
			)}
			{completedCount > 0 && (
				<div className="text-center pt-4 pb-8">
					<button
						onClick={() => {
							const completedItems = items?.filter((item) => item.completed);
							for (const item of completedItems) {
								deleteItem(item.id);
							}
						}}
						className="px-4 py-2 text-sm font-medium text-munchlist-muted hover:text-munchlist-danger hover:bg-munchlist-surface-alt rounded-xl transition-colors"
					>
						{t("shoppingList.clearCompleted", { count: completedCount })}
					</button>
				</div>
			)}
		</div>
	);
};

const ShoppingListItem = ({
	item,
	toggleComplete,
	openDrawer,
	deleteItem,
	dropdownOpen,
	setDropdownOpen,
}) => {
	const { t } = useTranslation();
	const [justToggled, setJustToggled] = useState(false);

	const handleToggle = () => {
		setJustToggled(true);
		toggleComplete(item.id);
		setTimeout(() => setJustToggled(false), 500);
	};

	return (
	<div
		onClick={handleToggle}
		className={`rounded-2xl p-3.5 border mb-2 cursor-pointer transition-colors ${
			justToggled ? "duration-700" : "duration-300"
		} ${
			justToggled
				? "bg-munchlist-green/40 border-munchlist-green"
				: item.completed
				? "bg-munchlist-surface-alt border-munchlist-line"
				: "bg-white border-munchlist-line shadow-sm"
		}`}
	>
		<div className="flex items-center gap-3">
			<div
				className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
					item.completed
						? "bg-munchlist-green border-munchlist-green text-white"
						: "border-munchlist-line hover:border-munchlist-green"
				} ${justToggled ? "animate-check-pop" : ""}`}
			>
				{item.completed && <Check className="w-4 h-4" />}
			</div>
			<div className="flex-1 flex flex-row items-center gap-2 min-w-0">
				<span
					className={`text-munchlist-muted text-sm font-semibold ${
						item.completed ? "line-through" : ""
					}`}
				>
					{item.quantity ? item.quantity : ""}
					{item.unit ? `${item.quantity ? " " : ""}${t(`units.${item.unit}`)}` : ""}
				</span>
				<span
					className={
						item.completed
							? "break-all line-through text-munchlist-muted"
							: "break-all text-munchlist-ink"
					}
				>
					{item.name}
				</span>
			</div>
			<div className="relative" onClick={(e) => e.stopPropagation()}>
				<button
					onClick={() =>
						setDropdownOpen(dropdownOpen === item.id ? null : item.id)
					}
					className="p-2 rounded-lg text-munchlist-muted hover:bg-munchlist-surface-alt hover:text-munchlist-green transition-colors"
				>
					<MoreVertical className="w-5 h-5" />
				</button>
				{dropdownOpen === item.id && (
					<>
						<div
							className="fixed inset-0 z-40"
							onClick={() => setDropdownOpen(null)}
							tabIndex={-1}
						/>
						<div className="absolute right-0 mt-2 w-36 bg-white border rounded-2xl shadow-lg z-50 border-munchlist-line p-1.5">
							<button
								onClick={() => {
									openDrawer(item.id, true);
									setDropdownOpen(null);
								}}
								className="w-full text-left px-3 py-2 rounded-xl hover:bg-munchlist-surface-alt"
							>
								<Pencil className="inline mr-2 w-4 h-4" />
								{t("common.edit")}
							</button>
							<button
								onClick={() => {
									deleteItem(item.id);
									setDropdownOpen(null);
								}}
								className="w-full text-left px-3 py-2 rounded-xl text-munchlist-danger hover:bg-munchlist-surface-alt"
							>
								<Trash2 className="inline mr-2 w-4 h-4" />
								{t("common.delete")}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	</div>
	);
};

export default ShoppingList;
