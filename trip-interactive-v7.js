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

  // Interactive travel search: prepare transparent external searches, never fake live inventory.
  const tabButtons = $$('[data-search-type]');
  const searchForm = $('[data-global-search]');
  let searchType = 'flights';
  const searchMeta = {
    flights: {hint:'Buscar vuelos con Google Flights', destination:'Hacia', start:'Ida', end:'Vuelta', originPlaceholder:'Ciudad de origen', destinationPlaceholder:'¿A dónde viajas?', guests:true},
    hotels: {hint:'Buscar alojamiento con Booking.com', destination:'Destino', start:'Entrada', end:'Salida', originPlaceholder:'Ciudad de origen (opcional)', destinationPlaceholder:'Ciudad, país o zona', guests:true},
    packages: {hint:'Explorar opciones de paquetes y circuitos', destination:'Destino', start:'Salida aproximada', end:'Regreso aproximado', originPlaceholder:'Lugar de partida', destinationPlaceholder:'¿Qué destino te interesa?', guests:true},
    transport: {hint:'Consultar rutas y opciones de transporte', destination:'Destino', start:'Fecha de salida', end:'Fecha de regreso', originPlaceholder:'Punto de partida', destinationPlaceholder:'¿A dónde necesitas llegar?', guests:true},
    experiences: {hint:'Descubrir actividades y visitas guiadas', destination:'Lugar o ciudad', start:'Fecha', end:'Fecha de regreso (opcional)', originPlaceholder:'Ciudad de origen (opcional)', destinationPlaceholder:'Ciudad, actividad o lugar', guests:true}
  };
  function setSearchType(type) {
    if (!searchMeta[type] || !searchForm) return;
    searchType = type;
    tabButtons.forEach(btn => {
      const active = btn.dataset.searchType === type;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    const meta = searchMeta[type];
    const origin = $('[name="origin"]', searchForm);
    const dest = $('[name="destination"]', searchForm);
    const start = $('[name="startDate"]', searchForm);
    const end = $('[name="endDate"]', searchForm);
    const dLabel = $('[data-destination-label]');
    const sLabel = $('[data-start-label]');
    const eLabel = $('[data-end-label]');
    const hint = $('[data-search-hint]');
    if (origin) origin.placeholder = meta.originPlaceholder;
    if (dest) dest.placeholder = meta.destinationPlaceholder;
    if (dLabel) dLabel.textContent = meta.destination;
    if (sLabel) sLabel.textContent = meta.start;
    if (eLabel) eLabel.textContent = meta.end;
    if (hint) hint.textContent = meta.hint;
    const oneWayOption = $('[data-oneway-option]', searchForm);
    if (oneWayOption) oneWayOption.hidden = type !== 'flights';
    if (start) start.setAttribute('aria-label', meta.start);
    if (end) end.setAttribute('aria-label', meta.end);
    searchForm.dataset.searchMode = type;
  }
  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => setSearchType(btn.dataset.searchType));
    btn.addEventListener('keydown', event => {
      const nextKeys = ['ArrowRight','ArrowLeft','Home','End'];
      if (!nextKeys.includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabButtons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabButtons.length - 1;
      tabButtons[next].focus();
      setSearchType(tabButtons[next].dataset.searchType);
    });
  });
  if (searchForm) {
    setSearchType('flights');
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const values = new FormData(searchForm);
      const origin = String(values.get('origin') || '').trim();
      const destination = String(values.get('destination') || '').trim();
      const start = String(values.get('startDate') || '').trim();
      const end = String(values.get('endDate') || '').trim();
      const guests = String(values.get('travelers') || '1');
      if (!destination) { $('[name="destination"]', searchForm)?.focus(); return; }
      let url = '';
      const q = encodeURIComponent;
      if (searchType === 'flights') {
        const route = `${origin ? origin + ' to ' : ''}${destination}`;
        const dates = start ? ` on ${start}` : '';
        const returnDate = end && !$('[name="oneWay"]', searchForm)?.checked ? ` returning ${end}` : '';
        url = `https://www.google.com/travel/flights?q=${q('Flights ' + route + dates + returnDate + ' ' + guests + ' travelers')}`;
      } else if (searchType === 'hotels') {
        const params = new URLSearchParams({ss:destination, group_adults:guests === '6+' ? '6' : guests, no_rooms:'1', group_children:'0'});
        if (start) params.set('checkin',start);
        if (end && !$('[name="oneWay"]', searchForm)?.checked) params.set('checkout',end);
        url = `https://www.booking.com/searchresults.html?${params.toString()}`;
      } else if (searchType === 'packages') {
        url = `https://www.google.com/search?q=${q('paquetes turísticos viajes organizados a ' + destination + (origin ? ' desde ' + origin : '') + (start ? ' fecha ' + start : ''))}`;
      } else if (searchType === 'transport') {
        const route = `${origin ? origin + ' a ' : ''}${destination}`;
        url = `https://www.google.com/maps/dir/?api=1&origin=${q(origin || 'Punto de partida')}&destination=${q(destination)}&travelmode=transit`;
        if (!origin) url = `https://www.google.com/search?q=${q('transporte turístico y traslados en ' + destination)}`;
      } else if (searchType === 'experiences') {
        url = `https://www.getyourguide.com/s/?q=${q(destination + (start ? ' ' + start : ''))}`;
      }
      if (url) {
        const win = window.open(url, '_blank', 'noopener,noreferrer');
        if (!win) location.href = url;
      }
    });
  }

  // Respect reduced-motion preferences and offer a visible pause/resume control for the hero video.
  const heroVideo = $('.showcase-video');
  const videoToggle = $('[data-video-toggle]');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroVideo && reduceMotion) heroVideo.pause();
  if (heroVideo) heroVideo.addEventListener('error', () => { heroVideo.style.display = 'none'; });
  if (heroVideo && videoToggle) {
    if (reduceMotion) {
      videoToggle.setAttribute('aria-pressed', 'true');
      videoToggle.innerHTML = '<span aria-hidden="true">▶</span> Activar movimiento';
    }
    videoToggle.addEventListener('click', () => {
      if (heroVideo.paused) {
        const promise = heroVideo.play();
        if (promise && promise.catch) promise.catch(() => {});
        videoToggle.setAttribute('aria-pressed', 'false');
        videoToggle.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pausar movimiento';
      } else {
        heroVideo.pause();
        videoToggle.setAttribute('aria-pressed', 'true');
        videoToggle.innerHTML = '<span aria-hidden="true">▶</span> Activar movimiento';
      }
    });
  }

})();
