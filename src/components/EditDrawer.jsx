import { X } from "lucide-react";
import { UNITS, CATEGORIES } from "../utils/groceryData";

const EditDrawer = ({
	drawerOpen,
	closeDrawer,
	drawerItemId,
	editText,
	setEditText,
	quantity,
	setQuantity,
	unit,
	setUnit,
	category,
	setCategory,
	saveItemEdit,
}) => (
	<>
		{/* Backdrop */}
		<div
			className={`
        fixed inset-0 z-60 bg-black/50 transition-opacity duration-300
        ${
					drawerOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}
      `}
			onClick={closeDrawer}
		/>
		{/* Drawer */}
		<div
			className={`
        fixed top-0 bottom-0 right-0
        w-full md:w-lg
        bg-white shadow-lg z-100
        transform transition-transform duration-300 ease-in-out
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}
      `}
			style={{ maxWidth: "100vw" }}
		>
			<div className="flex flex-col h-full">
				{/* Drawer Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-800">Edit</h3>
					<button
						onClick={closeDrawer}
						className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>
				{/* Drawer Content */}
				<div className="flex-1 p-4 space-y-6">
					{drawerItemId && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Name
							</label>
							<input
								type="text"
								value={editText}
								onChange={(e) => setEditText(e.target.value)}
								className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg"
								placeholder="Edit item name..."
							/>
						</div>
					)}
					<div className="flex gap-3">
						<div className="flex-1">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Quantity
							</label>
							<input
								type="number"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								min="0"
								step="0.1"
								className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg"
								placeholder="Enter quantity..."
							/>
						</div>
						<div className="w-40">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Unit
							</label>
							<select
								value={unit}
								onChange={(e) => setUnit(e.target.value)}
								className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg"
							>
								<option value="">Ingen</option>
								{UNITS.map((unit) => (
									<option key={unit} value={unit}>
										{unit}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Category
						</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg"
						>
							{CATEGORIES.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="p-4 border-t border-gray-200">
					<div className="flex gap-3">
						<button
							onClick={closeDrawer}
							className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={saveItemEdit}
							className="flex-1 px-4 py-3 bg-munchlist-green text-white rounded-lg hover:bg-[#239651] transition-colors"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	</>
);

export default EditDrawer;
