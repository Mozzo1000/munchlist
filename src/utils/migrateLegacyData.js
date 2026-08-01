const MIGRATION_FLAG_KEY = "munchlist-data-migrated-v2";
const CUSTOM_ITEMS_KEY = "custom_grocery_items";

const LEGACY_CATEGORY_MAP = {
	"Frukt & Grönt": "produce",
	Mejeri: "dairy",
	Bageri: "bakery",
	Kött: "meat",
	"Fisk & Skaldjur": "seafood",
	Skafferi: "pantry",
	Frys: "frozen",
	Dryck: "beverages",
	Hushåll: "household",
	Övrigt: "other",
	Other: "other",
};

export function migrateLegacyCustomItems() {
	if (localStorage.getItem(MIGRATION_FLAG_KEY) === "true") return;

	try {
		const items = JSON.parse(localStorage.getItem(CUSTOM_ITEMS_KEY) || "[]");
		const migrated = items.map(({ category, ...rest }) => ({
			...rest,
			categoryId: LEGACY_CATEGORY_MAP[category] ?? category ?? "other",
		}));
		localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify(migrated));
	} catch {
		// Corrupt or missing data — nothing to migrate.
	}

	localStorage.setItem(MIGRATION_FLAG_KEY, "true");
}
