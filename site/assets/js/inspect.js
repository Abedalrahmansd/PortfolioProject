// "This page is a widget tree."
// - The Layout button outlines every element marked data-w and labels it, like
//   Flutter's widget inspector (state kept for the visit).
// - A tree card (data-js="tree") lists nodes; hovering, focusing or pressing a node
//   highlights its element (data-target="#id"). Touch: tap to select.
export function initInspector(button, trees, announce) {
	const root = document.documentElement;
	if (button) {
		let on = false;
		try { on = sessionStorage.getItem("inspect") === "1"; } catch { /* ignore */ }
		const set = (value, speak) => {
			on = value;
			root.classList.toggle("inspect", on);
			button.setAttribute("aria-pressed", String(on));
			try { sessionStorage.setItem("inspect", on ? "1" : "0"); } catch { /* ignore */ }
			if (speak) announce(on ? "Layout outlines on" : "Layout outlines off");
		};
		set(on, false);
		button.addEventListener("click", () => set(!on, true));
	}

	trees.forEach((tree) => {
		const nodes = [...tree.querySelectorAll(".node[data-target]")];
		let current = null;
		const select = (node) => {
			if (current === node) return;
			if (current) {
				current.setAttribute("aria-pressed", "false");
				document.querySelector(current.dataset.target)?.classList.remove("is-hl");
			}
			current = node;
			if (!node) return;
			node.setAttribute("aria-pressed", "true");
			document.querySelector(node.dataset.target)?.classList.add("is-hl");
		};
		nodes.forEach((node) => {
			node.addEventListener("mouseenter", () => select(node));
			node.addEventListener("focus", () => select(node));
			node.addEventListener("click", () => {
				select(node);
				const el = document.querySelector(node.dataset.target);
				const r = el?.getBoundingClientRect();
				// Bring the element into view only if it's off screen (e.g. "contact").
				if (r && (r.top < 64 || r.bottom > innerHeight)) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
			});
		});
		tree.addEventListener("mouseleave", () => select(nodes.find((n) => n.dataset.default === "true") || null));
		select(nodes.find((n) => n.dataset.default === "true") || null);
	});
}
