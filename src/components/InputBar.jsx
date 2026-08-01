import { useTranslation } from "react-i18next";

const InputBar = ({
	newItem,
	addItem,
	inputRef,
	inputBarRef,
	setInputFocused,
	handleItemInputChange,
	inputBarTop,
	children,
}) => {
	const { t } = useTranslation();
	return (
	<div
		ref={inputBarRef}
		className="fixed left-0 right-0 bg-munchlist-green shadow-lg z-50"
		style={
			inputBarTop != null
				? { top: `${inputBarTop}px`, bottom: "auto" }
				: { bottom: 0 }
		}
	>
		<div className="max-w-md mx-auto p-4">
			<div className="relative flex items-center bg-white rounded-2xl pl-4 pr-1.5 py-1.5 gap-2">
				<input
					ref={inputRef}
					type="text"
					name="grocery-item"
					autoComplete="off"
					data-lpignore="true"
					data-1p-ignore="true"
					value={newItem}
					onChange={(e) => handleItemInputChange(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addItem(e);
						}
					}}
					onFocus={() => setInputFocused(true)}
					onBlur={() => setTimeout(() => setInputFocused(false), 100)}
					placeholder={t("inputBar.placeholder")}
					className="flex-1 min-w-0 py-2 text-munchlist-ink placeholder:text-munchlist-muted focus:outline-none"
				/>
				<button
					onClick={addItem}
					className="flex-none w-10 h-10 flex items-center justify-center bg-munchlist-green text-white rounded-xl hover:bg-munchlist-green-deep transition-colors"
				>
					<span className="sr-only">{t("inputBar.addSr")}</span>
					<svg
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2.4}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</button>
			</div>
		</div>
		{children}
	</div>
	);
};

export default InputBar;
