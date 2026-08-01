import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../i18n";

const SettingsDrawer = ({ settingsOpen, closeSettings }) => {
	const { t, i18n } = useTranslation();

	const languages = [
		{ code: "en", label: t("settings.english") },
		{ code: "sv", label: t("settings.swedish") },
	];

	return (
		<>
			{/* Backdrop */}
			<div
				className={`
        fixed inset-0 z-60 bg-black/50 transition-opacity duration-300
        ${
					settingsOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}
      `}
				onClick={closeSettings}
			/>
			{/* Drawer */}
			<div
				className={`
        fixed top-0 bottom-0 right-0
        w-full md:w-lg
        bg-white shadow-lg z-100
        transform transition-transform duration-300 ease-in-out
        ${settingsOpen ? "translate-x-0" : "translate-x-full"}
      `}
				style={{ maxWidth: "100vw" }}
			>
				<div className="flex flex-col h-full">
					{/* Drawer Header */}
					<div className="flex items-center justify-between p-4 border-b border-munchlist-line">
						<h3 className="text-lg font-extrabold text-munchlist-ink">
							{t("settings.title")}
						</h3>
						<button
							onClick={closeSettings}
							className="p-2 rounded-lg text-munchlist-muted hover:bg-munchlist-surface-alt hover:text-munchlist-ink transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
					{/* Drawer Content */}
					<div className="flex-1 p-4 space-y-6">
						<div>
							<label className="block text-xs font-bold uppercase tracking-wide text-munchlist-muted mb-2">
								{t("settings.language")}
							</label>
							<div className="flex gap-3">
								{languages.map(({ code, label }) => (
									<button
										key={code}
										onClick={() => setLanguage(code)}
										className={`flex-1 px-4 py-3 font-bold rounded-xl transition-colors ${
											i18n.language === code
												? "bg-munchlist-green text-white"
												: "bg-munchlist-surface-alt text-munchlist-ink hover:bg-munchlist-line"
										}`}
									>
										{label}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsDrawer;
