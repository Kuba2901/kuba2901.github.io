/* Jakub Nenczak — site behaviour.
   Progressive enhancement only: everything below is optional polish.
   The page is fully readable and navigable with this file blocked. */

(function () {
	'use strict';

	var root = document.documentElement;
	var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

	root.dataset.siteReady = '1';

	/* ── theme ────────────────────────────────────────────────────────── */

	var toggle = document.getElementById('theme-toggle');
	var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

	function currentTheme() {
		return root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
	}

	function syncToggleLabel() {
		if (!toggle) return;
		var next = currentTheme() === 'dark' ? 'light' : 'dark';
		toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
	}

	if (toggle) {
		toggle.addEventListener('click', function () {
			var next = currentTheme() === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try { localStorage.setItem('theme', next); } catch (e) { }
			syncToggleLabel();
		});
		syncToggleLabel();
	}
	systemDark.addEventListener('change', syncToggleLabel);

	/* ── masthead + scroll progress ───────────────────────────────────── */

	var masthead = document.getElementById('masthead');
	var progress = document.getElementById('progress');
	var ticking = false;

	function onScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(function () {
			var y = window.scrollY || 0;
			if (masthead) masthead.setAttribute('data-stuck', y > 12 ? 'true' : 'false');
			if (progress) {
				var max = document.documentElement.scrollHeight - window.innerHeight;
				progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
			}
			ticking = false;
		});
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	onScroll();

	/* ── mobile drawer ────────────────────────────────────────────────── */

	var menuBtn = document.getElementById('menu-btn');
	var drawer = document.getElementById('drawer');

	function setDrawer(open) {
		if (!drawer || !menuBtn) return;
		drawer.setAttribute('data-open', open ? 'true' : 'false');
		menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
		menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
		document.body.style.overflow = open ? 'hidden' : '';
		if (open) {
			var first = drawer.querySelector('a');
			if (first) first.focus();
		} else {
			menuBtn.focus();
		}
	}

	if (menuBtn && drawer) {
		menuBtn.addEventListener('click', function () {
			setDrawer(drawer.getAttribute('data-open') !== 'true');
		});
		drawer.addEventListener('click', function (e) {
			if (e.target.closest('a')) setDrawer(false);
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') setDrawer(false);
		});
		window.addEventListener('resize', function () {
			if (window.innerWidth > 860 && drawer.getAttribute('data-open') === 'true') setDrawer(false);
		});
	}

	/* ── reveal on scroll ─────────────────────────────────────────────── */

	var revealables = Array.prototype.slice.call(document.querySelectorAll('[data-reveal], [data-line]'));

	function showAll() {
		revealables.forEach(function (el) { el.classList.add('is-in'); });
	}

	if (reduced.matches || !('IntersectionObserver' in window)) {
		showAll();
	} else {
		document.querySelectorAll('[data-line]').forEach(function (el, i) {
			el.style.setProperty('--delay', (80 + i * 90) + 'ms');
		});

		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				var el = entry.target;
				io.unobserve(el);

				/* stagger direct children that opt in, capped so late items
				   never wait longer than ~400ms — see design-system MASTER.md */
				var kids = el.querySelectorAll(':scope > [data-reveal]');
				kids.forEach(function (kid, i) {
					kid.style.setProperty('--delay', Math.min(i * 70, 420) + 'ms');
				});
				el.classList.add('is-in');
			});
		}, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

		revealables.forEach(function (el) { io.observe(el); });
	}

	reduced.addEventListener('change', function (e) { if (e.matches) showAll(); });

	/* ── active section in nav ────────────────────────────────────────── */

	var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
	var sections = navLinks
		.map(function (link) { return document.querySelector(link.getAttribute('href')); })
		.filter(Boolean);

	if (sections.length && 'IntersectionObserver' in window) {
		var visible = new Map();
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) { visible.set(e.target.id, e.intersectionRatio); });
			var best = '';
			var bestRatio = 0;
			visible.forEach(function (ratio, id) {
				if (ratio > bestRatio) { bestRatio = ratio; best = id; }
			});
			navLinks.forEach(function (link) {
				var on = bestRatio > 0 && link.getAttribute('href') === '#' + best;
				if (on) link.setAttribute('aria-current', 'true');
				else link.removeAttribute('aria-current');
			});
		}, { rootMargin: '-68px 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75] });
		sections.forEach(function (s) { spy.observe(s); });
	}

	/* ── project index filters (projects.html) ────────────────────────── */

	var filters = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
	var entries = Array.prototype.slice.call(document.querySelectorAll('[data-cat]'));
	var empty = document.getElementById('empty-state');
	var counter = document.getElementById('result-count');

	if (filters.length && entries.length) {
		var apply = function (key) {
			var shown = 0;
			entries.forEach(function (entry) {
				var match = key === 'all' || entry.getAttribute('data-cat').split(' ').indexOf(key) !== -1;
				entry.hidden = !match;
				if (match) shown++;
			});
			filters.forEach(function (f) {
				f.setAttribute('aria-pressed', f.getAttribute('data-filter') === key ? 'true' : 'false');
			});
			document.querySelectorAll('[data-group]').forEach(function (group) {
				var live = group.querySelectorAll('[data-cat]:not([hidden])').length;
				group.hidden = live === 0;
			});
			if (empty) empty.hidden = shown !== 0;
			if (counter) counter.textContent = String(shown).padStart(2, '0') + (shown === 1 ? ' entry' : ' entries');
		};

		filters.forEach(function (f) {
			f.addEventListener('click', function () { apply(f.getAttribute('data-filter')); });
		});
		apply('all');
	}

	/* ── colophon year ────────────────────────────────────────────────── */

	var year = document.getElementById('year');
	if (year) year.textContent = new Date().getFullYear();
})();
