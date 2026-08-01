import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
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
		<div className="absolute w-full bottom-full left-0 z-50 bg-munchlist-green-deep rounded-t-3xl">
			<div className="rounded-t-3xl p-4 pb-2">
				<div className="text-left md:text-center text-sm font-bold tracking-wide uppercase text-white/85">
					{t("suggestionBar.commonItems")}
				</div>
			</div>
			<div className="flex flex-row gap-2 px-4 pb-4 overflow-x-auto no-scrollbar md:justify-center">
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
						className="px-4 py-2 text-base font-medium rounded-xl bg-white/15 text-white hover:bg-white/25 whitespace-nowrap transition-colors"
					>
						{suggestion.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default SuggestionBar;
