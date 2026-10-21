// Project page: highlight the section you're reading in the side index.
export function initToc(toc) {
	if (!toc || !("IntersectionObserver" in window)) return;
	const links = [...toc.querySelectorAll('a[href^="#"]')];
	const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
	const io = new IntersectionObserver((entries) => {
		entries.forEach((e) => {
			if (!e.isIntersecting) return;
			links.forEach((a) => a.removeAttribute("aria-current"));
			byId.get(e.target.id)?.setAttribute("aria-current", "true");
		});
	}, { rootMargin: "-35% 0px -60% 0px" });
	byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}
