/* ====================================================
   Michael Echebi — Portfolio JS
   Nav, scroll-spy, reveal, form, mobile menu
   ==================================================== */

(function () {
  'use strict';

  /* ----- Year ----- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Nav scroll style ----- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Mobile menu ----- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Scroll-spy: highlight active nav link ----- */
  var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  var sectionMap = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var sec = document.getElementById(id);
    if (sec) sectionMap[id] = { link: link, section: sec };
  });

  function setActive(id) {
    Object.keys(sectionMap).forEach(function (key) {
      sectionMap[key].link.classList.toggle('is-active', key === id);
    });
  }

  if ('IntersectionObserver' in window && Object.keys(sectionMap).length) {
    var spy = new IntersectionObserver(
      function (entries) {
        // pick the entry most prominently in view
        var best = null;
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
          }
        });
        if (best) setActive(best.target.id);
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    Object.keys(sectionMap).forEach(function (k) { spy.observe(sectionMap[k].section); });
  }

  /* ----- Reveal on scroll ----- */
  var revealTargets = [
    '.section__heading',
    '.about',
    '.skills',
    '.two-col',
    '.project',
    '.contact__lede',
    '.contact__channels',
    '.contact-form',
  ];
  var revealEls = [];
  revealTargets.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('reveal');
      revealEls.push(el);
    });
  });

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            revealObs.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----- Form submission handler ----- */
  window.handleFormSubmit = function(e) {
    var btn = e.target.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending...';
    }
    return true;
  };

  /* ----- Show success note if Netlify redirected back ----- */
  var params = new URLSearchParams(window.location.search);
  if (params.get('submitted') === 'true') {
    var note = document.getElementById('form-status');
    if (note) {
      note.hidden = false;
      var contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  }
})();
