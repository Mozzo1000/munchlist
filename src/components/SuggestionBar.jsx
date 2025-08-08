import {
	getCustomGroceryItems,
	addCustomGroceryItem,
} from "../utils/groceryData";

const SuggestionBar = ({
	inputFocused,
	filteredSuggestions,
	selectSuggestion,
	setDeleteDialog,
}) => {
	if (!inputFocused || filteredSuggestions.length === 0) return null;

	const isCustom = (name) =>
		getCustomGroceryItems().some(
			(item) => item.name.toLowerCase() === name.toLowerCase()
		);

	const handleDeleteRequest = (suggestion) => {
		if (isCustom(suggestion.name) && setDeleteDialog) {
			setDeleteDialog({ open: true, suggestion });
		}
	};

	let pressTimer = null;
	const handlePointerDown = (e, suggestion) => {
		if (!isCustom(suggestion.name)) return;
		pressTimer = setTimeout(() => {
			handleDeleteRequest(suggestion);
		}, 600);
	};
	const handlePointerUp = () => {
		clearTimeout(pressTimer);
	};

	return (
		<div className="absolute w-full bottom-full left-0 z-50 bg-[#4b6c57] rounded-t-3xl">
			<div className="sticky top-0 left-0 right-0 bg-munchlist-green rounded-t-3xl p-4 pb-2">
				<div className="text-left md:text-center text-lg font-semibold text-white">
					Vanliga varor
				</div>
			</div>
			<div className="flex flex-row gap-2 px-4 pb-4 overflow-x-auto no-scrollbar bg-munchlist-green md:justify-center">
				{filteredSuggestions.map((suggestion, index) => (
					<button
						key={index}
						type="button"
						tabIndex={-1}
						onMouseDown={(e) => e.preventDefault()}
						onClick={() => selectSuggestion(suggestion)}
						onContextMenu={(e) => {
							if (isCustom(suggestion.name)) {
								e.preventDefault();
								handleDeleteRequest(suggestion);
							}
						}}
						onPointerDown={(e) => handlePointerDown(e, suggestion)}
						onPointerUp={handlePointerUp}
						onPointerLeave={handlePointerUp}
						className="px-4 py-2 text-base rounded-lg bg-gray-50 hover:bg-gray-200 focus:bg-gray-50 focus:outline-none whitespace-nowrap"
					>
						{suggestion.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default SuggestionBar;
