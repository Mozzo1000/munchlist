export const COMMON_GROCERY_ITEMS = [
	{ name: "Mjölk", category: "Mejeri" },
	{ name: "Bröd", category: "Bageri" },
	{ name: "Ägg", category: "Mejeri" },
	{ name: "Smör", category: "Mejeri" },
	{ name: "Ost", category: "Mejeri" },
	{ name: "Kyckling", category: "Kött" },
	{ name: "Nötfärs", category: "Kött" },
	{ name: "Fisk", category: "Fisk & Skaldjur" },
	{ name: "Ris", category: "Skafferi" },
	{ name: "Pasta", category: "Skafferi" },
	{ name: "Tomater", category: "Frukt & Grönt" },
	{ name: "Lök", category: "Frukt & Grönt" },
	{ name: "Potatis", category: "Frukt & Grönt" },
	{ name: "Morötter", category: "Frukt & Grönt" },
	{ name: "Bananer", category: "Frukt & Grönt" },
	{ name: "Äpplen", category: "Frukt & Grönt" },
	{ name: "Apelsiner", category: "Frukt & Grönt" },
	{ name: "Sallad", category: "Frukt & Grönt" },
	{ name: "Spenat", category: "Frukt & Grönt" },
	{ name: "Paprika", category: "Frukt & Grönt" },
	{ name: "Vitlök", category: "Frukt & Grönt" },
	{ name: "Ingefära", category: "Frukt & Grönt" },
	{ name: "Yoghurt", category: "Mejeri" },
	{ name: "Müsli", category: "Skafferi" },
	{ name: "Havregryn", category: "Skafferi" },
	{ name: "Mjöl", category: "Skafferi" },
	{ name: "Socker", category: "Skafferi" },
	{ name: "Salt", category: "Skafferi" },
	{ name: "Peppar", category: "Skafferi" },
	{ name: "Olivolja", category: "Skafferi" },
	{ name: "Matolja", category: "Skafferi" },
	{ name: "Vinäger", category: "Skafferi" },
	{ name: "Honung", category: "Skafferi" },
	{ name: "Jordnötssmör", category: "Skafferi" },
	{ name: "Sylt", category: "Skafferi" },
	{ name: "Ketchup", category: "Skafferi" },
	{ name: "Senap", category: "Skafferi" },
	{ name: "Majonnäs", category: "Skafferi" },
	{ name: "Sojasås", category: "Skafferi" },
	{ name: "Chilisås", category: "Skafferi" },
	{ name: "Krossade tomater", category: "Skafferi" },
	{ name: "Bönor", category: "Skafferi" },
	{ name: "Linser", category: "Skafferi" },
	{ name: "Kikärtor", category: "Skafferi" },
	{ name: "Frysta grönsaker", category: "Frys" },
	{ name: "Frysta bär", category: "Frys" },
	{ name: "Glass", category: "Frys" },
	{ name: "Kaffe", category: "Dryck" },
	{ name: "Te", category: "Dryck" },
	{ name: "Apelsinjuice", category: "Dryck" },
	{ name: "Vatten", category: "Dryck" },
	{ name: "Hushållspapper", category: "Hushåll" },
	{ name: "Toalettpapper", category: "Hushåll" },
	{ name: "Diskmedel", category: "Hushåll" },
	{ name: "Tvättmedel", category: "Hushåll" },
	{ name: "Tandkräm", category: "Hushåll" },
	{ name: "Schampo", category: "Hushåll" },
];

export const UNITS = [
	"st",
	"kg",
	"gram",
	"liter",
	"ml",
	"dl",
	"burkar",
	"flaskor",
	"påsar",
	"förpackningar",
];

export const CATEGORIES = [
	"Frukt & Grönt",
	"Mejeri",
	"Bageri",
	"Kött",
	"Fisk & Skaldjur",
	"Skafferi",
	"Frys",
	"Dryck",
	"Hushåll",
	"Övrigt",
];

export function getCustomGroceryItems() {
	try {
		return JSON.parse(localStorage.getItem("custom_grocery_items") || "[]");
	} catch {
		return [];
	}
}

export function addCustomGroceryItem(item) {
	const items = getCustomGroceryItems();
	// Avoid duplicates (case-insensitive)
	if (!items.some((i) => i.name.toLowerCase() === item.name.toLowerCase())) {
		items.push(item);
		localStorage.setItem("custom_grocery_items", JSON.stringify(items));
	}
}

export function getAllGroceryItems() {
	return [...getCustomGroceryItems(), ...COMMON_GROCERY_ITEMS];
}

export function updateCustomGroceryItem(oldName, newItem) {
	const items = getCustomGroceryItems();
	const idx = items.findIndex(
		(i) => i.name.toLowerCase() === oldName.toLowerCase()
	);
	if (idx !== -1) {
		items[idx] = newItem;
		localStorage.setItem("custom_grocery_items", JSON.stringify(items));
	}
}
