import Dexie from "dexie";

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

const LEGACY_UNIT_MAP = {
	st: "pcs",
	kg: "kg",
	gram: "g",
	liter: "l",
	ml: "ml",
	dl: "dl",
	burkar: "jars",
	flaskor: "bottles",
	påsar: "bags",
	förpackningar: "packs",
};

export const db = new Dexie("MunchlistDB");
db.version(1).stores({
	items: "++id, name, completed, category, createdAt",
});
db.version(2)
	.stores({
		items: "++id, name, completed, category, createdAt",
	})
	.upgrade((tx) =>
		tx
			.table("items")
			.toCollection()
			.modify((item) => {
				item.category = LEGACY_CATEGORY_MAP[item.category] ?? item.category ?? "other";
				if (item.unit) {
					item.unit = LEGACY_UNIT_MAP[item.unit] ?? item.unit;
				}
			})
	);
