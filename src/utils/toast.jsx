import { toast } from "react-toastify";

export function showItemAddedToast({ name, id, openDrawer }) {
	toast.success(
		<span>
			<span className="font-semibold">{name}</span> added!
			<button
				className="ml-3 px-3 py-1 text-sm bg-munchlist-green text-white rounded-lg hover:bg-[#239651] transition-colors"
				onClick={() => {
					openDrawer(id, true);
					toast.dismiss();
				}}
			>
				Change unit
			</button>
		</span>,
		{ autoClose: 5000 }
	);
}
