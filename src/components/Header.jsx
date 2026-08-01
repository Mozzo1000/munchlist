import React from "react";
import { useTranslation } from "react-i18next";
import { Rows3, List, Settings } from "lucide-react";
import logo from "../assets/logo.svg";

const Header = ({ groupByCategory, setGroupByCategory, openSettings }) => {
	const { t } = useTranslation();
	return (
		<div className="sticky top-0 z-30 bg-munchlist-bg flex items-center justify-between p-3 pb-8">
			<div className="flex items-center gap-3">
				<img src={logo} alt="Munchlist Logo" className="w-10 h-10" />
				<h1 className="text-2xl font-extrabold tracking-tight text-munchlist-ink">
					Munchlist
				</h1>
			</div>
			<div className="flex items-center gap-2 ml-auto">
				<div className="flex rounded-xl overflow-hidden border border-munchlist-line bg-white p-1 gap-1">
					<button
						onClick={() => setGroupByCategory(true)}
						className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
							groupByCategory
								? "bg-munchlist-green text-white"
								: "text-munchlist-muted hover:bg-munchlist-surface-alt"
						}`}
						title={t("header.showByCategory")}
					>
						<Rows3 className="w-6 h-6" />
					</button>
					<button
						onClick={() => setGroupByCategory(false)}
						className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
							!groupByCategory
								? "bg-munchlist-green text-white"
								: "text-munchlist-muted hover:bg-munchlist-surface-alt"
						}`}
						title={t("header.showAsList")}
					>
						<List className="w-6 h-6" />
					</button>
				</div>
				<button
					onClick={openSettings}
					className="p-2.5 rounded-xl text-munchlist-muted hover:bg-munchlist-surface-alt hover:text-munchlist-ink transition-colors"
					title={t("header.settings")}
				>
					<Settings className="w-6 h-6" />
				</button>
			</div>
		</div>
	);
};

export default Header;
