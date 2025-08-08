import React from "react";
import { ShoppingCart, Rows3, List } from "lucide-react";

const Header = ({ groupByCategory, setGroupByCategory }) => (
	<div className="sticky top-0 z-30 bg-gray-100 flex items-center justify-between p-2 pb-8">
		<div className="flex items-center gap-3">
			<img src="favicon.png" alt="Munchlist Logo" className="w-10 h-10" />
			<h1 className="text-2xl font-bold">Munchlist</h1>
		</div>
		<div className="flex gap-0 ml-auto rounded-lg overflow-hidden border border-gray-200 bg-white">
			<button
				onClick={() => setGroupByCategory(true)}
				className={`flex items-center gap-1 px-3 py-1 transition-colors border-0 rounded-none ${
					groupByCategory
						? "bg-munchlist-green text-white"
						: "text-[#4b6c57] hover:bg-gray-50"
				}`}
				title="Show by category"
				style={{ borderRight: "1px solid #e5e7eb" }}
			>
				<Rows3 className="w-6 h-6" />
			</button>
			<button
				onClick={() => setGroupByCategory(false)}
				className={`flex items-center gap-1 px-3 py-1 text-sm transition-colors border-0 rounded-none ${
					!groupByCategory
						? "bg-munchlist-green text-white"
						: "text-[#4b6c57] hover:bg-gray-50"
				}`}
				title="Show as list"
			>
				<List className="w-6 h-6" />
			</button>
		</div>
	</div>
);

export default Header;
