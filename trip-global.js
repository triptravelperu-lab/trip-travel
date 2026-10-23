/* TRIP Travel · interacción ligera y accesible */
(() => {
  'use strict';
  const WA_NUMBER = '51954021718';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Close the mobile menu after choosing a route and support escape.
  const toggle = $('.menu-toggle');
  const nav = $('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    $$('.primary-nav a', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Determine the active top-level navigation page.
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('.primary-nav a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active'); link.setAttribute('aria-current', 'page');
    }
  });

  // The page's request form opens WhatsApp with a reviewed, pre-filled message; nothing is booked automatically.
  $$('[data-quote-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const fields = [...form.querySelectorAll('input, select, textarea')];
      const lines = ['Hola TRIP Travel, quisiera hacer una consulta.'];
      fields.forEach(field => {
        const label = field.name || field.getAttribute('aria-label') || 'Detalle';
        const value = String(field.value || '').trim();
        if (value) lines.push(`${label}: ${value}`);
      });
      lines.push('', 'Por favor, indíquenme los siguientes pasos y las condiciones aplicables.');
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      const win = window.open(url, '_blank');
      if (win) { win.opener = null; } else { location.href = url; }
      const status = $('.form-feedback', form);
      if (status) status.textContent = 'Se preparó tu mensaje en WhatsApp. Revisa los datos y envíalo para iniciar la coordinación.';
    });
  });

  // Current year in the footer.
  $$('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
})();
