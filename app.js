/* Hotel Acácia — comportamento do site
   Tudo que o hotel muda (preços, quartos, fotos, agenda) fica em CONFIG, ROOMS e PHOTOS. */

const CONFIG = {
  whatsapp: '5565999870069',
  hotel: 'Hotel Acácia',
  // Agenda do hotel. Enquanto for null, o site não consulta nada e a recepção
  // confirma a vaga pelo WhatsApp. Para ligar: aponte para um endpoint que responda
  // GET ?quarto=casal&checkin=2026-12-08&checkout=2026-12-10&hospedes=2
  // com JSON { "disponivel": true|false, "preco": 230 }  (preco opcional)
  // Pode ser um proxy de iCal (Airbnb/Booking), planilha publicada ou API do PMS.
  agendaUrl: null,
};

const ROOMS = [
  {
    id: 'casal',
    nome: 'Quarto Casal',
    resumo: '1 cama de casal',
    camas: '1 cama de casal',
    capacidade: 2,
    preco: 200, // "a partir de" (Google). null = sob consulta
    descricao: [
      'Aproveite o fácil acesso a lojas e restaurantes populares ficando neste espaço charmoso, ao lado do shopping e do mercado.',
      'Quarto em hotel com banheiro privativo, cama nova e ar-condicionado. Bom para casal ou para quem viaja a trabalho e quer chegar a pé em tudo.',
    ],
    fonte: 'Descrição do anúncio no Airbnb',
    comodidades: [
      ['i-snow', 'Ar-condicionado'], ['i-wifi', 'Wi-Fi'], ['i-tv', 'TV'], ['i-fridge', 'Frigobar'],
      ['i-shower', 'Banheiro privativo'], ['i-lock', 'Tranca na porta'], ['i-desk', 'Espaço de trabalho'], ['i-coffee', 'Café da manhã'],
    ],
    fotos: ['casal-1', 'casal-2', 'casal-3', 'casal-cabeceira', 'banheiro-1', 'tv-frigobar'],
  },
  {
    id: 'casal-solteiro',
    nome: 'Casal + Solteiro',
    resumo: 'até 3 pessoas',
    camas: '1 cama de casal + 1 de solteiro',
    capacidade: 3,
    preco: null,
    descricao: [
      'Aproveite o fácil acesso a lojas e restaurantes populares ficando neste espaço charmoso, ao lado do shopping e do mercado.',
      'Mais espaço para quem viaja com filho, amigo ou colega de trabalho: uma cama de casal e uma de solteiro, ar-condicionado, TV e frigobar no quarto.',
    ],
    fonte: 'Descrição do anúncio no Airbnb',
    comodidades: [
      ['i-snow', 'Ar-condicionado'], ['i-wifi', 'Wi-Fi'], ['i-tv', 'TV'], ['i-fridge', 'Frigobar'],
      ['i-shower', 'Banheiro privativo'], ['i-lock', 'Tranca na porta'], ['i-car', 'Estacionamento'], ['i-coffee', 'Café da manhã'],
    ],
    fotos: ['quarto-duas-camas', 'duplo-1', 'duplo-2', 'duplo-3', 'quarto-vermelho', 'banheiro-2'],
  },
  {
    id: 'triplo',
    nome: 'Quarto Família',
    resumo: 'até 4 pessoas',
    camas: '1 cama de casal + 2 de solteiro',
    capacidade: 4,
    preco: null,
    descricao: [
      'Aproveite o fácil acesso a lojas e restaurantes populares ficando neste espaço charmoso, ao lado do shopping e do mercado.',
      'O quarto maior da casa: cama de casal e duas de solteiro para a família ou a equipe ficar junta, com ar-condicionado, TV e banheiro privativo.',
    ],
    fonte: 'Descrição do anúncio no Airbnb',
    comodidades: [
      ['i-snow', 'Ar-condicionado'], ['i-wifi', 'Wi-Fi'], ['i-tv', 'TV'], ['i-fridge', 'Frigobar'],
      ['i-shower', 'Banheiro privativo'], ['i-lock', 'Tranca na porta'], ['i-car', 'Estacionamento'], ['i-coffee', 'Café da manhã'],
    ],
    fotos: ['triplo', 'quarto-tv', 'tv-frigobar', 'banheiro-3', 'pia', 'corredor-porta'],
  },
];

const PHOTOS = [
  ['quartos', 'quarto-duas-camas', 'Quarto com duas camas'],
  ['quartos', 'casal-1', 'Quarto casal'],
  ['quartos', 'duplo-1', 'Quarto casal e solteiro'],
  ['quartos', 'quarto-vermelho', 'Quarto'],
  ['quartos', 'casal-cabeceira', 'Quarto casal'],
  ['quartos', 'duplo-2', 'Quarto amplo'],
  ['quartos', 'triplo', 'Quarto família'],
  ['quartos', 'quarto-tv', 'Quarto com TV'],
  ['quartos', 'casal-2', 'Quarto casal'],
  ['banheiros', 'banheiro-1', 'Banheiro'],
  ['banheiros', 'banheiro-2', 'Banheiro'],
  ['banheiros', 'banheiro-3', 'Banheiro'],
  ['banheiros', 'pia', 'Pia'],
  ['cafe', 'cafe-mesa', 'Café da manhã'],
  ['cafe', 'cafe-bancada', 'Café da manhã'],
  ['cafe', 'cafe-detalhe', 'Café da manhã'],
  ['cafe', 'cafe-area', 'Área do café'],
  ['areas', 'hero-corredor', 'Corredor dos quartos'],
  ['areas', 'corredor-externo', 'Corredor'],
  ['areas', 'escada', 'Escada'],
  ['areas', 'area-externa', 'Área externa'],
  ['areas', 'recepcao', 'Recepção'],
  ['areas', 'entrada', 'Entrada'],
  ['areas', 'patio', 'Pátio'],
  ['areas', 'caminho', 'Caminho interno'],
  ['areas', 'corredor-interno', 'Corredor interno'],
  ['fachada', 'fachada', 'Fachada'],
  ['fachada', 'rua', 'Avenida em frente'],
];
const PHOTO_TABS = [['todas', 'Todas'], ['quartos', 'Quartos'], ['banheiros', 'Banheiros'], ['cafe', 'Café'], ['areas', 'Áreas comuns'], ['fachada', 'Fachada']];

/* ---------- utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const img = (k) => `img/${k}.jpg`;
const icon = (id, cls = 'ic') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
const addDays = (s, n) => { const d = new Date(s + 'T12:00'); d.setDate(d.getDate() + n); return iso(d); };
const br = (s) => s.split('-').reverse().join('/');
const nights = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5);
const today = iso(new Date());

function waLink(text) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}
function openWa(text) {
  const w = window.open(waLink(text), '_blank', 'noopener');
  if (!w) location.href = waLink(text);
}

/* ---------- disponibilidade (gancho da agenda) ---------- */
async function checkAvailability({ room, checkin, checkout, guests }) {
  if (!CONFIG.agendaUrl) return { status: 'consultar' };
  try {
    const q = new URLSearchParams({ quarto: room, checkin, checkout, hospedes: guests });
    const r = await fetch(`${CONFIG.agendaUrl}?${q}`, { headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error(r.status);
    const j = await r.json();
    return { status: j.disponivel ? 'livre' : 'ocupado', preco: j.preco };
  } catch (e) {
    return { status: 'consultar' };
  }
}

/* estado compartilhado de datas (barra do topo ↔ quartos) */
const state = { checkin: today, checkout: addDays(today, 1), guests: 2 };

/* ---------- quartos ---------- */
function renderRooms() {
  const tabs = $('[data-room-tabs]');
  const wrap = $('[data-rooms]');
  tabs.innerHTML = ROOMS.map((r, i) => `
    <button class="tab" role="tab" id="tab-${r.id}" aria-controls="room-${r.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
      ${r.nome}<small>${r.resumo}</small>
    </button>`).join('');

  wrap.innerHTML = ROOMS.map((r, i) => `
    <article class="room" id="room-${r.id}" role="tabpanel" aria-labelledby="tab-${r.id}" ${i ? 'hidden' : ''} data-room="${r.id}">
      <div class="gal" data-gal>
        <div class="gal__main">
          ${r.fotos.map((f, j) => `<img src="${img(f)}" alt="${r.nome}, foto ${j + 1}" ${j ? 'loading="lazy"' : ''} class="${j ? '' : 'is-on'}">`).join('')}
          <button class="gal__btn gal__btn--zoom" data-zoom aria-label="Ampliar foto">${icon('i-expand')}</button>
          <span class="gal__count"><span data-n>1</span> / ${r.fotos.length}</span>
          <div class="gal__nav">
            <button class="gal__btn" data-prev aria-label="Foto anterior">${icon('i-left')}</button>
            <button class="gal__btn" data-next aria-label="Próxima foto">${icon('i-right')}</button>
          </div>
        </div>
        <div class="gal__thumbs">
          ${r.fotos.map((f, j) => `<button class="gal__thumb" data-i="${j}" aria-label="Ver foto ${j + 1}" aria-current="${j === 0}"><img src="${img(f)}" alt="" loading="lazy"></button>`).join('')}
        </div>
      </div>

      <div class="room__info">
        <h3>${r.nome}</h3>
        <div class="room__specs">
          <span>${icon('i-bed')}${r.camas}</span>
          <span>${icon('i-users')}Até ${r.capacidade} hóspedes</span>
        </div>
        <div class="room__desc">${r.descricao.map((p) => `<p>${p}</p>`).join('')}</div>
        <span class="room__src">${r.fonte}</span>
        <ul class="amen">${r.comodidades.map(([ic, t]) => `<li>${icon(ic)}${t}</li>`).join('')}</ul>

        <div class="price">
          ${r.preco ? `<small>a partir de</small><b>${brl(r.preco)}</b><em>/ diária</em>` : `<b>Sob consulta</b><em>valor confirmado no WhatsApp</em>`}
        </div>

        <form class="rbook" data-rbook novalidate>
          <div class="rbook__row">
            <label>Check-in<input type="date" name="checkin" min="${today}" required></label>
            <label>Check-out<input type="date" name="checkout" min="${addDays(today, 1)}" required></label>
            <label>Hóspedes<select name="guests">${Array.from({ length: r.capacidade }, (_, k) => `<option value="${k + 1}">${k + 1}</option>`).join('')}</select></label>
          </div>
          <p class="rbook__sum" data-sum></p>
          <p class="rbook__status" data-status role="status" aria-live="polite"></p>
          <button class="btn btn--accent" type="submit">${icon('i-whats')}<span>Reservar pelo WhatsApp</span></button>
        </form>
      </div>
    </article>`).join('');

  // abas acessíveis (clique + setas)
  const tabBtns = $$('.tab', tabs);
  const select = (btn, focus) => {
    tabBtns.forEach((b) => { const on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    $$('.room', wrap).forEach((p) => {
      const on = p.id === btn.getAttribute('aria-controls');
      p.hidden = !on;
      p.classList.toggle('is-in', on);
    });
    if (focus) btn.focus();
    btn.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  };
  tabBtns.forEach((b, i) => {
    b.addEventListener('click', () => select(b));
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        select(tabBtns[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabBtns.length) % tabBtns.length], true);
      }
    });
  });

  $$('[data-room]', wrap).forEach((el) => {
    const room = ROOMS.find((r) => r.id === el.dataset.room);
    setupGallery(el, room);
    setupRoomForm(el, room);
  });
}

function setupGallery(el, room) {
  const imgs = $$('.gal__main img', el);
  const thumbs = $$('.gal__thumb', el);
  const n = $('[data-n]', el);
  let cur = 0;
  const go = (i) => {
    cur = (i + imgs.length) % imgs.length;
    imgs.forEach((im, j) => im.classList.toggle('is-on', j === cur));
    thumbs.forEach((t, j) => t.setAttribute('aria-current', j === cur));
    n.textContent = cur + 1;
  };
  $('[data-prev]', el).addEventListener('click', () => go(cur - 1));
  $('[data-next]', el).addEventListener('click', () => go(cur + 1));
  thumbs.forEach((t) => t.addEventListener('click', () => go(+t.dataset.i)));
  $('[data-zoom]', el).addEventListener('click', () => lightbox.open(room.fotos.map((f) => [f, room.nome]), cur));

  // deslizar no celular
  let x0 = null;
  const main = $('.gal__main', el);
  main.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  main.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}

function setupRoomForm(el, room) {
  const f = $('[data-rbook]', el);
  const sum = $('[data-sum]', f);
  const status = $('[data-status]', f);

  const sync = () => {
    f.checkin.value = state.checkin;
    f.checkout.value = state.checkout;
    f.guests.value = String(Math.min(state.guests, room.capacidade));
    update();
  };
  const update = () => {
    status.textContent = '';
    status.className = 'rbook__status';
    const a = f.checkin.value, b = f.checkout.value;
    if (!a || !b) { sum.textContent = 'Escolha as datas da estadia.'; return; }
    const n = nights(a, b);
    if (n < 1) { sum.textContent = 'O check-out precisa ser depois do check-in.'; return; }
    const g = +f.guests.value;
    let t = `${n} ${n > 1 ? 'noites' : 'noite'} · ${g} ${g > 1 ? 'hóspedes' : 'hóspede'}`;
    if (room.preco) t += ` · a partir de ${brl(room.preco * n)}`;
    sum.textContent = t;
  };

  f.checkin.addEventListener('change', () => {
    if (f.checkin.value) {
      f.checkout.min = addDays(f.checkin.value, 1);
      if (!f.checkout.value || f.checkout.value <= f.checkin.value) f.checkout.value = addDays(f.checkin.value, 1);
    }
    state.checkin = f.checkin.value; state.checkout = f.checkout.value;
    update();
  });
  f.checkout.addEventListener('change', () => { state.checkout = f.checkout.value; update(); });
  f.guests.addEventListener('change', () => { state.guests = +f.guests.value; update(); });

  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const a = f.checkin.value, b = f.checkout.value, g = +f.guests.value;
    if (!a || !b || nights(a, b) < 1) { f.classList.add('is-shake'); setTimeout(() => f.classList.remove('is-shake'), 400); (a ? f.checkout : f.checkin).focus(); return; }
    const n = nights(a, b);

    const res = await checkAvailability({ room: room.id, checkin: a, checkout: b, guests: g });
    if (res.status === 'ocupado') {
      status.className = 'rbook__status no';
      status.innerHTML = `${icon('i-x')}Sem vaga nesse quarto para essas datas. Tente outras datas ou outro quarto.`;
      return;
    }
    if (res.status === 'livre') {
      status.className = 'rbook__status ok';
      status.innerHTML = `${icon('i-check')}Disponível! Abrindo o WhatsApp para confirmar.`;
    }
    const msg = [
      `Olá! Quero reservar no ${CONFIG.hotel}.`,
      `Quarto: ${room.nome} (${room.camas})`,
      `Check-in: ${br(a)}`,
      `Check-out: ${br(b)} (${n} ${n > 1 ? 'noites' : 'noite'})`,
      `Hóspedes: ${g}`,
      res.status === 'livre' ? 'O site mostrou disponível.' : 'Tem disponibilidade?',
    ].join('\n');
    openWa(msg);
  });

  el._sync = sync;
  sync();
}

/* ---------- barra de reserva do hero ---------- */
function setupHeroBooker() {
  const f = $('[data-booker]');
  const msg = $('.booker__msg', f);
  f.checkin.min = today;
  f.checkin.value = state.checkin;
  f.checkout.min = addDays(today, 1);
  f.checkout.value = state.checkout;

  f.checkin.addEventListener('change', () => {
    if (!f.checkin.value) return;
    f.checkout.min = addDays(f.checkin.value, 1);
    if (!f.checkout.value || f.checkout.value <= f.checkin.value) f.checkout.value = addDays(f.checkin.value, 1);
  });

  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const a = f.checkin.value, b = f.checkout.value, g = +f.guests.value;
    if (!a || !b || nights(a, b) < 1) {
      msg.textContent = 'Confira as datas: o check-out precisa ser depois do check-in.';
      msg.classList.add('is-on');
      f.classList.add('is-shake'); setTimeout(() => f.classList.remove('is-shake'), 400);
      return;
    }
    Object.assign(state, { checkin: a, checkout: b, guests: g });
    $$('[data-room]').forEach((el) => el._sync && el._sync());

    // Com a agenda ligada, mostra quais quartos têm vaga; sem ela, leva para a escolha do quarto.
    const fits = ROOMS.filter((r) => r.capacidade >= g);
    const results = await Promise.all(fits.map((r) => checkAvailability({ room: r.id, checkin: a, checkout: b, guests: g }).then((x) => [r, x])));
    const livres = results.filter(([, x]) => x.status === 'livre').map(([r]) => r.nome);
    const n = nights(a, b);
    if (!CONFIG.agendaUrl) {
      msg.textContent = `${n} ${n > 1 ? 'noites' : 'noite'}, ${g} ${g > 1 ? 'hóspedes' : 'hóspede'}. Escolha o quarto abaixo: a recepção confirma a vaga pelo WhatsApp.`;
    } else if (livres.length) {
      msg.textContent = `Tem vaga em: ${livres.join(', ')}. Escolha abaixo.`;
    } else {
      msg.textContent = 'Sem vaga para essas datas nos quartos online. Fale com a recepção no WhatsApp.';
    }
    msg.classList.add('is-on');

    // abre a aba do primeiro quarto que comporta o grupo
    const target = (fits.find((r) => livres.includes(r.nome)) || fits[0] || ROOMS[ROOMS.length - 1]);
    $(`#tab-${target.id}`).click();
    setTimeout(() => $('#quartos').scrollIntoView({ behavior: 'smooth' }), 650);
  });
}

/* ---------- galeria geral ---------- */
function renderPhotos() {
  const tabs = $('[data-photo-tabs]');
  const grid = $('[data-photo-grid]');
  tabs.innerHTML = PHOTO_TABS.map(([k, t], i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-cat="${k}">${t}</button>`).join('');
  const show = (cat) => {
    const list = PHOTOS.filter(([c]) => cat === 'todas' || c === cat);
    grid.innerHTML = list.map(([, k, cap], i) => `
      <button class="grid__item" data-i="${i}" style="animation-delay:${Math.min(i, 10) * 40}ms" aria-label="Ampliar: ${cap}">
        <img src="${img(k)}" alt="${cap}" loading="lazy">${icon('i-expand')}
      </button>`).join('');
    $$('.grid__item', grid).forEach((b) => b.addEventListener('click', () => lightbox.open(list.map(([, k, c]) => [k, c]), +b.dataset.i)));
  };
  $$('.tab', tabs).forEach((b) => b.addEventListener('click', () => {
    $$('.tab', tabs).forEach((x) => x.setAttribute('aria-selected', x === b));
    show(b.dataset.cat);
  }));
  show('todas');
}

/* ---------- lightbox ---------- */
const lightbox = (() => {
  const el = $('[data-lb]');
  const im = $('[data-lb-img]', el);
  const cap = $('[data-lb-cap]', el);
  let list = [], cur = 0, last = null;
  const draw = () => {
    const [k, c] = list[cur];
    im.style.opacity = 0;
    const pre = new Image();
    pre.onload = () => { im.src = pre.src; im.alt = c; im.style.opacity = 1; };
    pre.src = img(k);
    cap.textContent = `${c} · ${cur + 1} de ${list.length}`;
  };
  const go = (d) => { cur = (cur + d + list.length) % list.length; draw(); };
  const close = () => {
    el.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { el.hidden = true; last && last.focus(); }, 250);
  };
  $('[data-lb-close]', el).addEventListener('click', close);
  $('[data-lb-prev]', el).addEventListener('click', () => go(-1));
  $('[data-lb-next]', el).addEventListener('click', () => go(1));
  el.addEventListener('click', (e) => { if (e.target === el || e.target.classList.contains('lb__fig')) close(); });
  document.addEventListener('keydown', (e) => {
    if (el.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
  let x0 = null;
  el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    x0 = null;
  });
  return {
    open(l, i) {
      list = l; cur = i; last = document.activeElement;
      el.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => el.classList.add('is-open'));
      draw();
      $('[data-lb-close]', el).focus();
    },
  };
})();

/* ---------- miudezas ---------- */
function setupMisc() {
  // links de WhatsApp com mensagem pronta
  $$('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });

  // botões "Reservar" levam para a barra de datas
  $$('[data-scroll-book]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const f = $('[data-booker]');
    f.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => f.checkin.focus({ preventScroll: true }), 500);
  }));

  // topo com borda ao rolar + barra móvel após o hero
  const top = $('.top'), mbar = $('.mbar'), booker = $('[data-booker]');
  const onScroll = () => top.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  new IntersectionObserver(([e]) => mbar.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(booker);

  // revelar ao rolar
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal]').forEach((el, i) => { el.style.transitionDelay = `${(i % 6) * 60}ms`; io.observe(el); });
}

renderRooms();
renderPhotos();
setupHeroBooker();
setupMisc();
