// Contact page:
// - "Copy" buttons (data-copy="text") copy to the clipboard and confirm.
// - The form writes an email in the visitor's own mail app (mailto:), so nothing is
//   sent through a third party. To switch to a form service later, give the <form> an
//   action/method and delete the submit handler below (see CLAUDE.md).
// - Live clock: the owner's local time (data-tz) next to the visitor's.
export function initContact(root, announce) {
	if (!root) return;

	root.querySelectorAll("[data-copy]").forEach((btn) => {
		const label = btn.textContent;
		btn.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(btn.dataset.copy);
				btn.textContent = "Copied";
				announce("Copied to the clipboard");
				setTimeout(() => { btn.textContent = label; }, 1600);
			} catch { window.prompt("Copy this:", btn.dataset.copy); }
		});
	});

	const form = root.querySelector("form[data-mailto]");
	const status = root.querySelector("[data-js=form-status]");
	form?.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = new FormData(form);
		const name = (data.get("name") || "").toString().trim();
		const reason = (data.get("reason") || "").toString();
		const message = (data.get("message") || "").toString().trim();
		if (!name || !message) {
			status.textContent = "Please add your name and a message.";
			(name ? form.message : form.name).focus();
			return;
		}
		const subject = `${reason}: ${name}`;
		const body = `${message}\n\n— ${name}${data.get("email") ? ` (${data.get("email")})` : ""}`;
		window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		status.textContent = "Your email app should open with the message ready to send. If it didn't, copy the address above.";
	});

	const clock = root.querySelector("[data-js=clock]");
	if (clock) {
		const tz = clock.dataset.tz;
		const fmt = (zone) => new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", timeZone: zone }).format(new Date());
		const tick = () => {
			const mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
			clock.textContent = mine === tz ? `It’s ${fmt(tz)} here, same as you.` : `It’s ${fmt(tz)} here, ${fmt(mine)} where you are.`;
		};
		tick();
		setInterval(tick, 30_000);
	}
}
