// Entry point. Each feature lives in its own small module and only runs when the page
// has the element it needs (marked with data-js="…"). Pages work without JavaScript.
import { initTheme } from "./theme.js";
import { initInspector } from "./inspect.js";
import { initExplorer } from "./explorer.js";
import { initPath } from "./path.js";
import { initContact } from "./contact.js";
import { initWorkPreview } from "./work.js";
import { initToc } from "./toc.js";

const $ = (sel, root = document) => root.querySelector(sel);

// The "build" intro (outlines, then content) plays once per visit, not on every page.
try {
	if (!sessionStorage.getItem("built")) {
		document.documentElement.classList.add("build");
		sessionStorage.setItem("built", "1");
		setTimeout(() => document.documentElement.classList.remove("build"), 2600);
	}
} catch { /* storage blocked: skip the intro */ }

export const announce = (text) => {
	const el = $('[data-js="announce"]');
	if (el) { el.textContent = ""; requestAnimationFrame(() => { el.textContent = text; }); }
};

initTheme($('[data-js="theme"]'), announce);
initInspector($('[data-js="inspect"]'), document.querySelectorAll('[data-js="tree"]'), announce);
initExplorer($('[data-js="explorer"]'), announce);
initPath($('[data-js="path"]'));
initContact($('[data-js="contact"]'), announce);
initWorkPreview($('[data-js="work-list"]'), $('[data-js="work-preview"]'));
initToc($('[data-js="toc"]'));
