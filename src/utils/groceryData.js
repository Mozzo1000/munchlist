export const CATEGORY_IDS = [
	"produce",
	"dairy",
	"bakery",
	"meat",
	"seafood",
	"pantry",
	"frozen",
	"beverages",
	"household",
	"other",
];

export const UNIT_IDS = [
	"pcs",
	"kg",
	"g",
	"l",
	"ml",
	"dl",
	"jars",
	"bottles",
	"bags",
	"packs",
];

export const COMMON_GROCERY_ITEMS = [
	{ id: "milk", categoryId: "dairy", name: { en: "Milk", sv: "Mjölk" } },
	{ id: "bread", categoryId: "bakery", name: { en: "Bread", sv: "Bröd" } },
	{ id: "eggs", categoryId: "dairy", name: { en: "Eggs", sv: "Ägg" } },
	{ id: "butter", categoryId: "dairy", name: { en: "Butter", sv: "Smör" } },
	{ id: "cheese", categoryId: "dairy", name: { en: "Cheese", sv: "Ost" } },
	{ id: "chicken", categoryId: "meat", name: { en: "Chicken", sv: "Kyckling" } },
	{ id: "ground_beef", categoryId: "meat", name: { en: "Ground beef", sv: "Nötfärs" } },
	{ id: "fish", categoryId: "seafood", name: { en: "Fish", sv: "Fisk" } },
	{ id: "rice", categoryId: "pantry", name: { en: "Rice", sv: "Ris" } },
	{ id: "pasta", categoryId: "pantry", name: { en: "Pasta", sv: "Pasta" } },
	{ id: "tomatoes", categoryId: "produce", name: { en: "Tomatoes", sv: "Tomater" } },
	{ id: "onions", categoryId: "produce", name: { en: "Onions", sv: "Lök" } },
	{ id: "potatoes", categoryId: "produce", name: { en: "Potatoes", sv: "Potatis" } },
	{ id: "carrots", categoryId: "produce", name: { en: "Carrots", sv: "Morötter" } },
	{ id: "bananas", categoryId: "produce", name: { en: "Bananas", sv: "Bananer" } },
	{ id: "apples", categoryId: "produce", name: { en: "Apples", sv: "Äpplen" } },
	{ id: "oranges", categoryId: "produce", name: { en: "Oranges", sv: "Apelsiner" } },
	{ id: "lettuce", categoryId: "produce", name: { en: "Lettuce", sv: "Sallad" } },
	{ id: "spinach", categoryId: "produce", name: { en: "Spinach", sv: "Spenat" } },
	{ id: "bell_pepper", categoryId: "produce", name: { en: "Bell pepper", sv: "Paprika" } },
	{ id: "garlic", categoryId: "produce", name: { en: "Garlic", sv: "Vitlök" } },
	{ id: "ginger", categoryId: "produce", name: { en: "Ginger", sv: "Ingefära" } },
	{ id: "yogurt", categoryId: "dairy", name: { en: "Yogurt", sv: "Yoghurt" } },
	{ id: "muesli", categoryId: "pantry", name: { en: "Muesli", sv: "Müsli" } },
	{ id: "oats", categoryId: "pantry", name: { en: "Oats", sv: "Havregryn" } },
	{ id: "flour", categoryId: "pantry", name: { en: "Flour", sv: "Mjöl" } },
	{ id: "sugar", categoryId: "pantry", name: { en: "Sugar", sv: "Socker" } },
	{ id: "salt", categoryId: "pantry", name: { en: "Salt", sv: "Salt" } },
	{ id: "pepper", categoryId: "pantry", name: { en: "Pepper", sv: "Peppar" } },
	{ id: "olive_oil", categoryId: "pantry", name: { en: "Olive oil", sv: "Olivolja" } },
	{ id: "cooking_oil", categoryId: "pantry", name: { en: "Cooking oil", sv: "Matolja" } },
	{ id: "vinegar", categoryId: "pantry", name: { en: "Vinegar", sv: "Vinäger" } },
	{ id: "honey", categoryId: "pantry", name: { en: "Honey", sv: "Honung" } },
	{ id: "peanut_butter", categoryId: "pantry", name: { en: "Peanut butter", sv: "Jordnötssmör" } },
	{ id: "jam", categoryId: "pantry", name: { en: "Jam", sv: "Sylt" } },
	{ id: "ketchup", categoryId: "pantry", name: { en: "Ketchup", sv: "Ketchup" } },
	{ id: "mustard", categoryId: "pantry", name: { en: "Mustard", sv: "Senap" } },
	{ id: "mayonnaise", categoryId: "pantry", name: { en: "Mayonnaise", sv: "Majonnäs" } },
	{ id: "soy_sauce", categoryId: "pantry", name: { en: "Soy sauce", sv: "Sojasås" } },
	{ id: "chili_sauce", categoryId: "pantry", name: { en: "Chili sauce", sv: "Chilisås" } },
	{ id: "crushed_tomatoes", categoryId: "pantry", name: { en: "Crushed tomatoes", sv: "Krossade tomater" } },
	{ id: "beans", categoryId: "pantry", name: { en: "Beans", sv: "Bönor" } },
	{ id: "lentils", categoryId: "pantry", name: { en: "Lentils", sv: "Linser" } },
	{ id: "chickpeas", categoryId: "pantry", name: { en: "Chickpeas", sv: "Kikärtor" } },
	{ id: "frozen_vegetables", categoryId: "frozen", name: { en: "Frozen vegetables", sv: "Frysta grönsaker" } },
	{ id: "frozen_berries", categoryId: "frozen", name: { en: "Frozen berries", sv: "Frysta bär" } },
	{ id: "ice_cream", categoryId: "frozen", name: { en: "Ice cream", sv: "Glass" } },
	{ id: "coffee", categoryId: "beverages", name: { en: "Coffee", sv: "Kaffe" } },
	{ id: "tea", categoryId: "beverages", name: { en: "Tea", sv: "Te" } },
	{ id: "orange_juice", categoryId: "beverages", name: { en: "Orange juice", sv: "Apelsinjuice" } },
	{ id: "water", categoryId: "beverages", name: { en: "Water", sv: "Vatten" } },
	{ id: "paper_towels", categoryId: "household", name: { en: "Paper towels", sv: "Hushållspapper" } },
	{ id: "toilet_paper", categoryId: "household", name: { en: "Toilet paper", sv: "Toalettpapper" } },
	{ id: "dish_soap", categoryId: "household", name: { en: "Dish soap", sv: "Diskmedel" } },
	{ id: "laundry_detergent", categoryId: "household", name: { en: "Laundry detergent", sv: "Tvättmedel" } },
	{ id: "toothpaste", categoryId: "household", name: { en: "Toothpaste", sv: "Tandkräm" } },
	{ id: "shampoo", categoryId: "household", name: { en: "Shampoo", sv: "Schampo" } },
];

export function getGroceryItemsForLocale(lng) {
	return COMMON_GROCERY_ITEMS.map((item) => ({
		id: item.id,
		categoryId: item.categoryId,
		name: item.name[lng] ?? item.name.en,
	}));
}

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

export function getAllGroceryItems(lng) {
	return [...getCustomGroceryItems(), ...getGroceryItemsForLocale(lng)];
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
