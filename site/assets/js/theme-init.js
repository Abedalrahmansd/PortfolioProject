// Runs in <head>, before the first paint, so a dark-theme visitor never sees a white flash.
// The choice is "light", "dark", or nothing (follow the system); theme.js changes it later.
(function () {
	var d = document.documentElement;
	var saved = null;
	try { saved = localStorage.getItem("theme"); } catch (e) { /* private mode: follow the system */ }
	var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
	d.setAttribute("data-theme", dark ? "dark" : "light");
	d.classList.add("js");
})();
