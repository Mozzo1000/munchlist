import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import sv from "./locales/sv.json";

export const LANGUAGE_STORAGE_KEY = "munchlist-language";

export function getInitialLanguage() {
	const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
	if (stored === "en" || stored === "sv") return stored;

	const detected = navigator.language?.toLowerCase().startsWith("sv")
		? "sv"
		: "en";
	localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
	return detected;
}

export function setLanguage(lng) {
	i18n.changeLanguage(lng);
	localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
}

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		sv: { translation: sv },
	},
	lng: getInitialLanguage(),
	fallbackLng: "en",
	interpolation: { escapeValue: false },
});

document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lng) => {
	document.documentElement.lang = lng;
});

export default i18n;
