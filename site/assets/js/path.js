// About page: the path as a tree. Each .chap button shows its chapter panel
// (aria-controls) and hides the others. Without JS, all chapters are listed in order.
export function initPath(root) {
	if (!root) return;
	const buttons = [...root.querySelectorAll(".chap")];
	const show = (btn, focusPanel) => {
		buttons.forEach((b) => {
			const on = b === btn;
			b.setAttribute("aria-expanded", String(on));
			const panel = document.getElementById(b.getAttribute("aria-controls"));
			if (panel) panel.hidden = !on;
			if (on && focusPanel && panel && matchMedia("(max-width: 1000px)").matches) {
				panel.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
			}
		});
	};
	buttons.forEach((b, i) => {
		b.addEventListener("click", () => show(b, true));
		b.addEventListener("keydown", (e) => {
			const next = e.key === "ArrowDown" ? buttons[i + 1] : e.key === "ArrowUp" ? buttons[i - 1] : null;
			if (next) { e.preventDefault(); next.focus(); show(next, false); }
		});
	});
	show(buttons.find((b) => b.getAttribute("aria-expanded") === "true") || buttons[0], false);
}
