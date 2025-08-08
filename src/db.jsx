import Dexie from "dexie";

export const db = new Dexie("MunchlistDB");
db.version(1).stores({
	items: "++id, name, completed, category, createdAt",
});
