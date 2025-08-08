import { useState } from "react";
import { Settings, List, Edit3, ChevronRight, ChevronLeft } from "lucide-react";

const screens = [
	{
		title: "Welcome to Munchlist!",
		description:
			"Your simple grocery shopping companion. Let's show you around!",
		icon: <img src="/favicon.png" alt="Munchlist Logo" className="w-24 h-24" />,
	},
	{
		title: "Smart Autocomplete",
		description:
			"Start typing any grocery item and get suggestions from our database of common items. Save time with intelligent predictions.",
		icon: <Edit3 className="w-16 h-16 text-munchlist-green" />,
	},
	{
		title: "Organize Your Way",
		description:
			"Switch between list view and categorized view to organize your groceries by type - produce, dairy, meat, and more.",
		icon: <List className="w-16 h-16 text-munchlist-green" />,
	},
	{
		title: "Precise Quantities",
		description:
			"Set any items quantity to an exact amounts and unit. From 2.5 kg potatoes to 3 cans of tomatoes.",
		icon: <Settings className="w-16 h-16 text-munchlist-green" />,
	},
];

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
	const [index, setIndex] = useState(0);

	const next = () => {
		if (index < screens.length - 1) {
			setIndex(index + 1);
		} else {
			onFinish();
		}
	};

	const back = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
	};

	return (
		<div
			className={`
        fixed inset-0 z-50 flex flex-col items-center justify-center
        bg-white
        sm:bg-black/75
      `}
		>
			<div
				className={`
          flex flex-col items-center justify-center
          w-full h-full
          sm:h-auto sm:w-auto
          flex-1
        `}
			>
				{/* Onboarding content */}
				<div
					className="
            bg-white rounded-none p-4 w-full h-full max-w-none mx-0 text-center
            flex flex-col
            justify-center items-center
            sm:rounded-2xl sm:p-8 sm:max-w-md sm:w-full sm:mx-auto sm:h-auto
            relative
          "
				>
					<div className="mb-6 items-center justify-center flex">
						{screens[index].icon}
					</div>

					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						{screens[index].title}
					</h2>

					<p className="text-gray-600 mb-8 leading-relaxed">
						{screens[index].description}
					</p>

					{/* Progress indicators */}
					<div className="flex justify-center gap-2 mb-6">
						{screens.map((_, i) => (
							<span
								key={i}
								className={`w-3 h-3 rounded-full ${
									i === index ? "bg-munchlist-green" : "bg-gray-300"
								}`}
							/>
						))}
					</div>

					{/* Button row for desktop */}
					<div className="hidden sm:flex gap-3 w-full mt-4 justify-between">
						{index === 0 && (
							<button
								className="min-w-20 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
								onClick={() => onFinish()}
							>
								Skip
							</button>
						)}

						{index > 0 && (
							<button
								className="min-w-20 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
								onClick={back}
							>
								<ChevronLeft className="w-4 h-4" />
								Back
							</button>
						)}
						<button
							className="min-w-20 px-4 py-3 bg-munchlist-green text-white rounded-lg hover:bg-[#239651] transition-colors flex items-center justify-center gap-2"
							onClick={next}
						>
							{index === screens.length - 1 ? "Get Started" : "Next"}
							{index < screens.length - 1 && (
								<ChevronRight className="w-4 h-4" />
							)}
						</button>
					</div>
				</div>
			</div>
			{/* Button row for mobile, fixed at the bottom */}
			<div className="flex sm:hidden gap-3 w-full px-4 pb-6 pt-3 fixed bottom-0 justify-between">
				{index === 0 && (
					<button
						className="min-w-20 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
						onClick={() => onFinish()}
					>
						Skip
					</button>
				)}
				{index > 0 && (
					<button
						className="min-w-20 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
						onClick={back}
					>
						<ChevronLeft className="w-4 h-4" />
						Back
					</button>
				)}
				<button
					className="min-w-20 px-4 py-3 bg-munchlist-green text-white rounded-lg hover:bg-[#239651] transition-colors flex items-center justify-center gap-2"
					onClick={next}
				>
					{index === screens.length - 1 ? "Get Started" : "Next"}
					{index < screens.length - 1 && <ChevronRight className="w-4 h-4" />}
				</button>
			</div>
		</div>
	);
}
