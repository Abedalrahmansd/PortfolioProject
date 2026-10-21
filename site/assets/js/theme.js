// Theme button: light ⇄ dark, remembered per browser. theme-init.js already applied it
// before the first paint; this keeps the button in sync and follows system changes
// for visitors who never chose.
export function initTheme(button, announce) {
	if (!button) return;
	const root = document.documentElement;
	const system = window.matchMedia("(prefers-color-scheme: dark)");
	const saved = () => { try { return localStorage.getItem("theme"); } catch { return null; } };
	const sync = () => button.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));

	const apply = (theme, remember) => {
		const swap = () => { root.dataset.theme = theme; sync(); };
		// A short cross-fade where the browser supports it; instant otherwise.
		if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
			document.startViewTransition(swap);
		} else swap();
		if (remember) { try { localStorage.setItem("theme", theme); } catch { /* ignore */ } }
		document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
	};

	sync();
	button.addEventListener("click", () => {
		const next = root.dataset.theme === "dark" ? "light" : "dark";
		apply(next, true);
		announce(next === "dark" ? "Dark theme" : "Light theme");
	});
	system.addEventListener("change", (e) => { if (!saved()) apply(e.matches ? "dark" : "light", false); });
}
