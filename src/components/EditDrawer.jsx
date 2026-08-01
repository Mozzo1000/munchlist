import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { UNIT_IDS, CATEGORY_IDS } from "../utils/groceryData";

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
}) => {
	const { t } = useTranslation();
	return (
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
					<div className="flex items-center justify-between p-4 border-b border-munchlist-line">
						<h3 className="text-lg font-extrabold text-munchlist-ink">
							{t("editDrawer.title")}
						</h3>
						<button
							onClick={closeDrawer}
							className="p-2 rounded-lg text-munchlist-muted hover:bg-munchlist-surface-alt hover:text-munchlist-ink transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
					{/* Drawer Content */}
					<div className="flex-1 p-4 space-y-6">
						{drawerItemId && (
							<div>
								<label className="block text-xs font-bold uppercase tracking-wide text-munchlist-muted mb-2">
									{t("editDrawer.nameLabel")}
								</label>
								<input
									type="text"
									value={editText}
									onChange={(e) => setEditText(e.target.value)}
									className="w-full px-4 py-3 bg-munchlist-surface-alt border border-munchlist-line rounded-xl focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg text-munchlist-ink"
									placeholder={t("editDrawer.namePlaceholder")}
								/>
							</div>
						)}
						<div className="flex gap-3">
							<div className="flex-1">
								<label className="block text-xs font-bold uppercase tracking-wide text-munchlist-muted mb-2">
									{t("editDrawer.quantityLabel")}
								</label>
								<input
									type="number"
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
									min="0"
									step="0.1"
									className="w-full px-4 py-3 bg-munchlist-surface-alt border border-munchlist-line rounded-xl focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg text-munchlist-ink"
									placeholder={t("editDrawer.quantityPlaceholder")}
								/>
							</div>
							<div className="w-40">
								<label className="block text-xs font-bold uppercase tracking-wide text-munchlist-muted mb-2">
									{t("editDrawer.unitLabel")}
								</label>
								<select
									value={unit}
									onChange={(e) => setUnit(e.target.value)}
									className="w-full px-4 py-3 bg-munchlist-surface-alt border border-munchlist-line rounded-xl focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg text-munchlist-ink"
								>
									<option value="">{t("editDrawer.noneOption")}</option>
									{UNIT_IDS.map((id) => (
										<option key={id} value={id}>
											{t(`units.${id}`)}
										</option>
									))}
								</select>
							</div>
						</div>
						<div>
							<label className="block text-xs font-bold uppercase tracking-wide text-munchlist-muted mb-2">
								{t("editDrawer.categoryLabel")}
							</label>
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="w-full px-4 py-3 bg-munchlist-surface-alt border border-munchlist-line rounded-xl focus:outline-none focus:ring-2 focus:ring-munchlist-green focus:border-transparent text-lg text-munchlist-ink"
							>
								{CATEGORY_IDS.map((id) => (
									<option key={id} value={id}>
										{t(`categories.${id}`)}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="p-4 border-t border-munchlist-line">
						<div className="flex gap-3">
							<button
								onClick={closeDrawer}
								className="flex-1 px-4 py-3 bg-munchlist-surface-alt text-munchlist-ink font-bold rounded-xl hover:bg-munchlist-line transition-colors"
							>
								{t("common.cancel")}
							</button>
							<button
								onClick={saveItemEdit}
								className="flex-1 px-4 py-3 bg-munchlist-green text-white font-bold rounded-xl hover:bg-munchlist-green-deep transition-colors"
							>
								{t("common.save")}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditDrawer;
