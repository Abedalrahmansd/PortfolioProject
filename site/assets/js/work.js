// Work index: hovering or focusing a project row shows its cover in the preview pane
// (desktop only; on phones the list is enough). Rows carry data-cover and data-tint.
export function initWorkPreview(list, pane) {
	if (!list || !pane) return;
	const img = pane.querySelector("img");
	const show = (row) => {
		if (!row?.dataset.cover) return;
		pane.style.setProperty("--tile", row.dataset.tint || "var(--brand)");
		if (img.getAttribute("src") !== row.dataset.cover) {
			img.classList.remove("swap"); void img.offsetWidth; img.classList.add("swap");
			img.src = row.dataset.cover;
			img.alt = row.dataset.alt || "";
		}
	};
	const rows = [...list.querySelectorAll("[data-cover]")].filter((r) => r.dataset.cover);
	if (!rows.length) { pane.hidden = true; return; }
	rows.forEach((row) => {
		row.addEventListener("mouseenter", () => show(row));
		row.addEventListener("focusin", () => show(row));
	});
	show(rows[0]);
}
