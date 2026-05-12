// Language init — runs before paint to prevent flash
(function () {
  const lang = localStorage.getItem('tektum-lang') || 'ro';
  document.documentElement.lang = lang;
})();

document.addEventListener('DOMContentLoaded', function () {

  /* ─── LANGUAGE TOGGLE ─── */
  const html = document.documentElement;

  function setLang(lang) {
    html.lang = lang;
    localStorage.setItem('tektum-lang', lang);
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.dataset.lang === lang);
    });
  }

  setLang(html.lang); // apply saved lang on load

  document.querySelectorAll('.lang-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      setLang(html.lang === 'ro' ? 'en' : 'ro');
    });
  });

  /* ─── STICKY NAV ─── */
  var nav = document.querySelector('.nav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── HAMBURGER ─── */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── ACTIVE NAV LINK ─── */
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── PROJECT FILTER ─── */
  var filterTabs = document.querySelectorAll('.filter-tab');
  var projectItems = document.querySelectorAll('.project-item');

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var filter = tab.dataset.filter;
      projectItems.forEach(function (item) {
        var show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ─── SCROLL ANIMATIONS ─── */
  if ('IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(
      '.project-card, .project-item, .service-item, .stat-item, .about-teaser-content'
    ).forEach(function (el) {
      el.classList.add('anim-fade-up');
      animObserver.observe(el);
    });
  }

  /* ─── PAGE TRANSITION ─── */
  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http')) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.style.transition = 'opacity .25s ease';
      document.body.style.opacity = '0';
      setTimeout(function () { location.href = href; }, 260);
    });
  });

  /* ─── CONTACT FORM ─── */
  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn-submit');
      var original = btn.textContent;
      btn.textContent = html.lang === 'ro' ? 'Mesaj trimis!' : 'Message sent!';
      btn.style.background = '#5a7a5a';
      setTimeout(function () {
        btn.textContent = original;
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    });
  }

});
