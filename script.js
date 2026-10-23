/* TRIP Travel — global search experience. Static site using external provider searches. */
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const waNumber = document.body.dataset.wa || '51954021718';
  let language = 'es';

  // Mobile navigation
  const navToggle = $('.nav-toggle');
  const nav = $('.main-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(opened));
      navToggle.setAttribute('aria-label', opened ? 'Cerrar menú' : 'Abrir menú');
    });
    $$('a', nav).forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Small bilingual interface (ES / EN) across every page.
  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'es';
    document.documentElement.lang = language;
    $$('[data-es][data-en]').forEach(el => {
      const value = el.dataset[language];
      if (value !== undefined) el.innerHTML = value;
    });
    const toggle = $('#languageToggle');
    if (toggle) toggle.setAttribute('aria-label', language === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish');
    try { sessionStorage.setItem('trip-language', language); } catch (_) { /* Optional persistence */ }
  }
  try { language = sessionStorage.getItem('trip-language') || 'es'; } catch (_) { language = 'es'; }
  setLanguage(language);
  $('#languageToggle')?.addEventListener('click', () => { setLanguage(language === 'es' ? 'en' : 'es'); refreshVisibleResults(); });

  // Active navigation link
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  const slug = (s) => String(s || '').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const enc = s => encodeURIComponent(String(s || '').trim());
  const compactDate = s => String(s || '').replaceAll('-', '');
  const addIf = (params, key, val) => { if (val !== undefined && val !== null && String(val).trim() !== '') params.set(key, String(val).trim()); };

  function providerUrl(id, q) {
    const dest = q.destination;
    const origin = q.origin;
    const depart = q.depart;
    const ret = q.returnDate;
    const guests = q.guests === '6+' ? 6 : Math.max(1, Number(q.guests) || 2);
    const dateText = depart ? ` on ${depart}` : '';
    const returnText = ret ? ` returning ${ret}` : '';
    const routeText = `${origin} to ${dest}`;
    const activityText = `things to do, tours and activities in ${dest}`;
    const placeText = `${dest}`;
    let url = '', note = '';

    if (id === 'booking') {
      const p = new URLSearchParams({ ss: dest, group_adults: String(guests), no_rooms: '1' });
      addIf(p, 'checkin', depart); addIf(p, 'checkout', ret);
      url = `https://www.booking.com/searchresults.html?${p.toString()}`;
      note = 'Hotels, apartments and stays';
    } else if (id === 'airbnb') {
      const p = new URLSearchParams({ adults: String(guests) });
      addIf(p, 'checkin', depart); addIf(p, 'checkout', ret);
      url = `https://www.airbnb.com/s/${enc(dest)}/homes?${p.toString()}`;
      note = 'Homes and unique stays';
    } else if (id === 'google-hotels') {
      const p = new URLSearchParams({ q: `hotels in ${dest}` });
      addIf(p, 'checkin', depart); addIf(p, 'checkout', ret);
      url = `https://www.google.com/travel/search?${p.toString()}`;
      note = 'Explore hotels on Google';
    } else if (id === 'expedia') {
      const p = new URLSearchParams({ destination: dest, adults: String(guests) });
      addIf(p, 'startDate', depart); addIf(p, 'endDate', ret);
      url = `https://www.expedia.com/Hotel-Search?${p.toString()}`;
      note = 'Explore stays and trip options';
    } else if (id === 'google-flights') {
      const query = `Flights from ${origin} to ${dest}${dateText}${returnText}, ${guests} traveler${guests === 1 ? '' : 's'}`;
      url = `https://www.google.com/travel/flights?q=${enc(query)}`;
      note = 'Compare routes and dates';
    } else if (id === 'kayak-flights') {
      const p = new URLSearchParams({ origin, destination: dest, adults: String(guests) });
      addIf(p, 'depart', depart); addIf(p, 'return', ret);
      url = `https://www.kayak.com/flights?${p.toString()}`;
      note = 'Search flights on KAYAK';
    } else if (id === 'skyscanner') {
      url = 'https://www.skyscanner.com/';
      note = 'Enter your route on Skyscanner';
    } else if (id === 'getyourguide') {
      url = `https://www.getyourguide.com/s/?q=${enc(dest)}`;
      note = 'Guided tours and tickets';
    } else if (id === 'viator') {
      url = `https://www.viator.com/searchResults/all?text=${enc(dest)}`;
      note = 'Tours and local experiences';
    } else if (id === 'tripadvisor') {
      url = `https://www.tripadvisor.com/Search?q=${enc(`${activityText}`)}`;
      note = 'Things to do and reviews';
    } else if (id === 'maps') {
      url = `https://www.google.com/maps/search/?api=1&query=${enc(dest)}`;
      note = 'Places, attractions and services';
    } else if (id === 'rome2rio') {
      url = `https://www.rome2rio.com/s/${slug(origin)}/${slug(dest)}`;
      note = 'Compare multimodal transport';
    } else if (id === 'directions') {
      const p = new URLSearchParams({ api: '1', origin, destination: dest, travelmode: 'transit' });
      url = `https://www.google.com/maps/dir/?${p.toString()}`;
      note = 'Transit directions and routes';
    } else if (id === 'cars') {
      url = `https://www.google.com/search?q=${enc(`car rental ${dest}`)}`;
      note = 'Compare rental car options';
    } else if (id === 'local-mobility') {
      url = `https://www.google.com/maps/search/?api=1&query=${enc(`airport transfer taxi transport in ${dest}`)}`;
      note = 'Find local transport providers';
    }
    return { url, note };
  }

  const providerSets = {
    all: [
      ['booking','B','Booking.com','Alojamientos y estancias','Stays and accommodation'],
      ['google-flights','G','Google Flights','Búsqueda de vuelos','Flight search'],
      ['getyourguide','GY','GetYourGuide','Tours y entradas','Tours and tickets'],
      ['rome2rio','R2','Rome2Rio','Conexiones entre lugares','Connections between places'],
      ['maps','M','Google Maps','Atracciones y servicios locales','Attractions and local services'],
      ['viator','V','Viator','Actividades y excursiones','Activities and excursions']
    ],
    stays: [
      ['booking','B','Booking.com','Hoteles, apartamentos y alojamientos','Hotels, apartments and accommodation'],
      ['airbnb','A','Airbnb','Casas, apartamentos y estancias singulares','Homes, apartments and unique stays'],
      ['google-hotels','G','Google Hotels','Comparación de alojamientos por zona','Accommodation search by area'],
      ['expedia','E','Expedia','Hoteles y opciones de viaje','Hotels and trip options']
    ],
    flights: [
      ['google-flights','G','Google Flights','Compara rutas y fechas','Compare routes and dates'],
      ['kayak-flights','K','KAYAK','Búsqueda de vuelos en un comparador','Search flights in a comparison tool'],
      ['skyscanner','S','Skyscanner','Busca más opciones para la ruta','Find more route options']
    ],
    experiences: [
      ['getyourguide','GY','GetYourGuide','Tours, entradas y experiencias','Tours, tickets and experiences'],
      ['viator','V','Viator','Excursiones y actividades','Excursions and activities'],
      ['tripadvisor','T','Tripadvisor','Lugares, opiniones y actividades','Places, reviews and activities'],
      ['maps','M','Google Maps','Atracciones, restaurantes y servicios','Attractions, restaurants and services']
    ],
    routes: [
      ['rome2rio','R2','Rome2Rio','Alternativas para ir de un punto a otro','Ways to get from A to B'],
      ['directions','M','Google Maps','Rutas y transporte público','Routes and public transportation'],
      ['cars','C','Alquiler de autos','Opciones de autos de alquiler','Car rental options'],
      ['local-mobility','↗','Movilidad local','Traslados y transportes en destino','Local transfers and transport']
    ]
  };

  function renderResults(root, q) {
    const type = providerSets[q.type] ? q.type : 'all';
    const items = providerSets[type];
    const panel = $('.search-results', root);
    const cards = $('.provider-results', root);
    if (!panel || !cards) return;
    cards.innerHTML = items.map(([id, mark, title, es, en]) => {
      const link = providerUrl(id, q);
      return `<article class="result-card"><span class="result-provider-mark">${mark}</span><div><h4>${title}</h4><p>${language === 'en' ? en : es}</p><a href="${link.url}" target="_blank" rel="noopener noreferrer">${language === 'en' ? 'Open search ↗' : 'Abrir búsqueda ↗'}</a></div></article>`;
    }).join('');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  }

  function refreshVisibleResults() {
    $$('.search-console').forEach(root => {
      const panel = $('.search-results', root);
      const form = $('.global-search-form', root);
      if (!panel || panel.hidden || !form) return;
      const q = {
        type: form.dataset.searchType || 'all',
        origin: $('[name="origin"]', form)?.value.trim() || 'Lima, Perú',
        destination: $('[name="destination"]', form)?.value.trim() || '',
        depart: $('[name="depart"]', form)?.value || '',
        returnDate: $('[name="return"]', form)?.value || '',
        guests: $('[name="guests"]', form)?.value || '2'
      };
      if (q.destination) renderResults(root, q);
    });
  }

  // Search mode tabs and provider handoffs
  $$('.search-console').forEach(consoleEl => {
    const form = $('.global-search-form', consoleEl);
    if (!form) return;
    $$('.search-tab', consoleEl).forEach(button => button.addEventListener('click', () => {
      $$('.search-tab', consoleEl).forEach(b => {
        b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected'); button.setAttribute('aria-pressed', 'true');
      form.dataset.searchType = button.dataset.searchService || 'all';
    }));
    const originInput = $('[name="origin"]', form);
    const destinationInput = $('[name="destination"]', form);
    const departInput = $('[name="depart"]', form);
    const returnInput = $('[name="return"]', form);
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    if (departInput) departInput.min = todayStr;
    if (returnInput) returnInput.min = departInput?.value || todayStr;
    departInput?.addEventListener('change', () => {
      if (returnInput) {
        returnInput.min = departInput.value || todayStr;
        if (departInput.value && returnInput.value && returnInput.value < departInput.value) returnInput.value = departInput.value;
      }
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const q = {
        type: form.dataset.searchType || 'all',
        origin: originInput?.value.trim() || 'Lima, Perú',
        destination: destinationInput?.value.trim() || '',
        depart: departInput?.value || '',
        returnDate: returnInput?.value || '',
        guests: $('[name="guests"]', form)?.value || '2'
      };
      if (!q.destination) { destinationInput?.focus(); return; }
      const params = new URLSearchParams({ destination: q.destination, type: q.type });
      if (q.origin) params.set('origin', q.origin);
      if (q.depart) params.set('depart', q.depart);
      if (q.returnDate) params.set('return', q.returnDate);
      if (q.guests) params.set('guests', q.guests);
      try { history.replaceState(null, '', `${location.pathname}?${params.toString()}#trip-connect`); } catch (_) {}
      renderResults(consoleEl, q);
    });
    $('.clear-results', consoleEl)?.addEventListener('click', () => {
      const panel = $('.search-results', consoleEl);
      if (panel) panel.hidden = true;
      destinationInput?.focus();
    });
  });

  // Deep links from destination cards prefill the search tool.
  const params = new URLSearchParams(location.search);
  const qDestination = params.get('destination');
  const qOrigin = params.get('origin');
  const qDepart = params.get('depart');
  const qReturn = params.get('return');
  const qGuests = params.get('guests');
  const qType = params.get('type');
  $$('.global-search-form').forEach(form => {
    if (qDestination && $('[name="destination"]', form)) $('[name="destination"]', form).value = qDestination;
    if (qOrigin && $('[name="origin"]', form)) $('[name="origin"]', form).value = qOrigin;
    if (qDepart && $('[name="depart"]', form)) $('[name="depart"]', form).value = qDepart;
    if (qReturn && $('[name="return"]', form)) $('[name="return"]', form).value = qReturn;
    if (qGuests && $('[name="guests"]', form)) $('[name="guests"]', form).value = qGuests;
    if (qType && providerSets[qType]) {
      form.dataset.searchType = qType;
      const root = form.closest('.search-console');
      $$('.search-tab', root || document).forEach(b => {
        const selected = b.dataset.searchService === qType;
        b.classList.toggle('selected', selected);
        b.setAttribute('aria-pressed', String(selected));
      });
    }
  });

  // Atlas filters: distinct views for world inspiration and Peru collection.
  const atlasFilters = $$('.filter-chip[data-atlas-filter]');
  atlasFilters.forEach(button => button.addEventListener('click', () => {
    atlasFilters.forEach(b => b.classList.toggle('active', b === button));
    const filter = button.dataset.atlasFilter;
    $$('.atlas-grid .world-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.region !== filter;
    });
  }));

  // Image resilience: preserve the card's own color treatment; never replace unrelated images with one generic destination.
  $$('img').forEach(img => img.addEventListener('error', () => {
    img.classList.add('asset-unavailable');
    img.setAttribute('aria-hidden', 'true');
  }));

  // Contact form prepares a clear WhatsApp handoff.
  const contactForm = $('#contactForm');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const lines = [
      `Hola TRIP Travel, soy ${data.get('nombre') || '—'}.`,
      `Servicio: ${data.get('servicio') || '—'}`,
      `Origen: ${data.get('origen') || '—'}`,
      `Destino: ${data.get('destino') || '—'}`,
      `Mensaje: ${data.get('mensaje') || '—'}`,
      `Contacto: ${data.get('contacto') || '—'}`
    ];
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
