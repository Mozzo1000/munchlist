import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import { migrateLegacyCustomItems } from "./utils/migrateLegacyData.js";
import App from "./App.jsx";

migrateLegacyCustomItems();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
