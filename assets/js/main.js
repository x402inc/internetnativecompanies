// INC site interactions - lightweight, no build tools
(function () {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const subscribeForm = document.getElementById('subscribeForm');
  const subscribeMsg = document.getElementById('subscribeMsg');
  const comingSoon = document.getElementById('comingSoon');

  // Sticky header state
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      const isOpen = links.style.display === 'flex';
      links.style.display = isOpen ? 'none' : 'flex';
    });
  }

  // Smooth anchor scroll (except for #mint which opens modal)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#mint') { // open modal instead
        e.preventDefault();
        openModal();
        return;
      }
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
      }
    });
  });

  // Reveal on scroll
  const revealGroups = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children
          const children = entry.target.children || [];
          let i = 0;
          for (const child of children) child.style.setProperty('--i', String(i++));
          entry.target.classList.add('in', 'stagger');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealGroups.forEach((g) => io.observe(g));
  } else {
    revealGroups.forEach((g) => g.classList.add('in', 'stagger'));
  }

  // Theme: always light by default; dark toggle removed

  // Subscribe form (AJAX to PHP)
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      subscribeMsg.textContent = 'Submitting…';
      const formData = new FormData(subscribeForm);
      try {
        const res = await fetch(subscribeForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();
        if (data.success) {
          subscribeMsg.textContent = 'Thanks! We\'ll be in touch.';
          subscribeForm.reset();
        } else {
          subscribeMsg.textContent = data.message || 'Something went wrong.';
        }
      } catch (err) {
        subscribeMsg.textContent = 'Network error. Try again later.';
      }
    });
  }

  // Modal helpers
  function openModal() {
    if (!comingSoon) return;
    comingSoon.classList.add('open');
    comingSoon.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!comingSoon) return;
    comingSoon.classList.remove('open');
    comingSoon.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (comingSoon) {
    comingSoon.querySelectorAll('[data-modal-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
})();


