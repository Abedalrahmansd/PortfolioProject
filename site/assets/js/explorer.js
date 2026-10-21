// Project screen explorer: pick a screen, see it in the phone, switch the APP's theme.
// Markup comes from the project's Markdown (screens:). Each .scr button carries
// data-light / data-dark image URLs, data-title, data-caption.
// The app theme starts in step with the site theme and follows it until the visitor
// picks one themselves.
export function initExplorer(root, announce) {
	if (!root) return;
	const img = root.querySelector("[data-js=screen-img]");
	const title = root.querySelector("[data-js=screen-title]");
	const caption = root.querySelector("[data-js=screen-caption]");
	const note = root.querySelector("[data-js=screen-note]");
	const btnLight = root.querySelector("[data-theme-btn=light]");
	const btnDark = root.querySelector("[data-theme-btn=dark]");
	const items = [...root.querySelectorAll(".scr")];
	if (!img || !items.length) return;

	let current = items.find((b) => b.getAttribute("aria-pressed") === "true") || items[0];
	let theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
	let pinned = false;

	const render = (speak) => {
		const has = { light: !!current.dataset.light, dark: !!current.dataset.dark };
		const t = has[theme] ? theme : has.light ? "light" : "dark";
		items.forEach((b) => b.setAttribute("aria-pressed", String(b === current)));
		btnLight.disabled = !has.light; btnDark.disabled = !has.dark;
		btnLight.setAttribute("aria-pressed", String(t === "light"));
		btnDark.setAttribute("aria-pressed", String(t === "dark"));
		const src = current.dataset[t];
		if (img.getAttribute("src") !== src) {
			img.classList.remove("swap"); void img.offsetWidth; img.classList.add("swap");
			img.src = src;
			img.alt = `${current.dataset.title} screen, ${t} theme`;
		}
		title.textContent = current.dataset.title;
		caption.textContent = current.dataset.caption || "";
		note.textContent = has.light && has.dark ? "Both themes are real captures." : `Captured in the ${t} theme only.`;
		if (speak) announce(`${current.dataset.title}, ${t} theme`);
	};

	items.forEach((b) => b.addEventListener("click", () => { current = b; render(true); }));
	btnLight.addEventListener("click", () => { theme = "light"; pinned = true; render(true); });
	btnDark.addEventListener("click", () => { theme = "dark"; pinned = true; render(true); });
	document.addEventListener("themechange", (e) => { if (!pinned) { theme = e.detail; render(false); } });
	render(false);
}
