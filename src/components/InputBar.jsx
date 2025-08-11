const InputBar = ({
	newItem,
	addItem,
	inputRef,
	setInputFocused,
	handleItemInputChange,
	inputBottom,
	children,
}) => (
	<div
		className="fixed bottom-0 left-0 right-0 bg-munchlist-green shadow-lg z-50 transition-all"
		style={{
			transform: inputBottom ? `translateY(-${inputBottom}px)` : undefined,
		}}
	>
		<div className="max-w-md mx-auto p-4">
			<div className="relative">
				<input
					ref={inputRef}
					type="text"
					value={newItem}
					onChange={(e) => handleItemInputChange(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addItem(e);
						}
					}}
					onFocus={() => setInputFocused(true)}
					onBlur={() => setTimeout(() => setInputFocused(false), 100)}
					placeholder="Add grocery item..."
					className="bg-white w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-transparent"
				/>
				<button
					onClick={addItem}
					className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
				>
					<span className="sr-only">Add</span>
					<svg
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</button>
			</div>
		</div>
		{children}
	</div>
);

export default InputBar;
