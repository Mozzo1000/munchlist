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

	const completedCount = items?.filter((item) => item.completed).length;
	const deleteItem = async (id) => {
		await db.items.delete(id);
	};

	return (
		<div className="px-4 pb-48 space-y-2 flex-1">
			{items?.length === 0 ? (
				<div className="text-center py-12">
					<ShoppingCart className="w-24 h-24 text-gray-500 mx-auto mb-4" />
					<p className="text-2xl font-semibold text-gray-500 mb-2">
						Your shopping list is empty
					</p>
					<p className="text-lg text-gray-400">
						Add some items to get started!
					</p>
				</div>
			) : (
				<>
					{groupByCategory
						? [
								...Object.keys(groupedItems).filter(
									(item) => item !== "Completed"
								),
								...(groupedItems["Completed"] ? ["Completed"] : []),
						  ].map((category) => (
								<div key={category} className="mb-6">
									<h2
										className={`text-lg font-bold mb-2 ${
											category === "Completed"
												? "text-gray-400"
												: "text-munchlist-green"
										}`}
									>
										{category === "Completed" ? "Completed" : category}
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
						className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
					>
						Clear completed items ({completedCount})
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
}) => (
	<div
		className={`bg-white rounded-lg p-4 shadow-sm border-l-4 transition-all mb-2 ${
			item.completed ? "border-l-green-500 bg-green-50" : "border-l-amber-500"
		}`}
	>
		<div className="flex items-center gap-3">
			<button
				onClick={() => toggleComplete(item.id)}
				className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
					item.completed
						? "bg-green-500 border-green-500 text-white"
						: "border-gray-300 hover:border-munchlist-green"
				}`}
			>
				{item.completed && <Check className="w-4 h-4" />}
			</button>
			<div className="flex-1 flex flex-row items-center gap-2">
				<span
					className={`text-gray-500 text-sm font-medium ${
						item.completed ? "line-through" : ""
					}`}
				>
					{item.quantity ? item.quantity : ""}
					{item.unit ? `${item.quantity ? " " : ""}${item.unit}` : ""}
				</span>
				<span
					className={
						item.completed
							? "break-all line-through text-gray-500"
							: "break-all text-gray-800"
					}
				>
					{item.name}
				</span>
			</div>
			<div className="relative">
				<button
					onClick={() =>
						setDropdownOpen(dropdownOpen === item.id ? null : item.id)
					}
					className="p-2 text-gray-400 hover:text-munchlist-green transition-colors"
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
						<div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg z-50 border-gray-200">
							<button
								onClick={() => {
									openDrawer(item.id, true);
									setDropdownOpen(null);
								}}
								className="w-full text-left px-4 py-2 hover:bg-gray-50"
							>
								<Pencil className="inline mr-2 w-4 h-4" />
								Edit
							</button>
							<button
								onClick={() => {
									deleteItem(item.id);
									setDropdownOpen(null);
								}}
								className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
							>
								<Trash2 className="inline mr-2 w-4 h-4" />
								Delete
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	</div>
);

export default ShoppingList;
