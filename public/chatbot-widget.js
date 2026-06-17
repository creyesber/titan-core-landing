
/* ==========================================
   CONFIGURACION Y PERSONALIZACION
   ========================================== */
function getChatbotConfig() {
  return window.CHATBOT_CONFIG || {};
}

/* Mini renderizador de Markdown -> HTML (seguro) */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function mdToHtml(md) {
  if (md == null) return '';
  let src = String(md).replace(/\r\n/g, '\n');
  // Code blocks ```
  const codeBlocks = [];
  src = src.replace(/```([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(code);
    return `\u0000CB${codeBlocks.length - 1}\u0000`;
  });
  // Inline code `code`
  const inlineCodes = [];
  src = src.replace(/`([^`\n]+)`/g, (_, code) => {
    inlineCodes.push(code);
    return `\u0000IC${inlineCodes.length - 1}\u0000`;
  });
  // Escape HTML
  src = escapeHtml(src);
  // Headings
  src = src.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  src = src.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  src = src.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  // Bold **text** y *text* / _text_
  src = src.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  src = src.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  src = src.replace(/(^|[\s(])_([^_\n]+)_/g, '$1<em>$2</em>');
  // Enlaces [txt](url)
  src = src.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Listas
  src = src.replace(/(?:^|\n)((?:\s*[-*]\s+.+(?:\n|$))+)/g, (m, block) => {
    const items = block.trim().split(/\n/).map(l => l.replace(/^\s*[-*]\s+/, '')).map(t => `<li>${t}</li>`).join('');
    return `\n<ul>${items}</ul>`;
  });
  src = src.replace(/(?:^|\n)((?:\s*\d+\.\s+.+(?:\n|$))+)/g, (m, block) => {
    const items = block.trim().split(/\n/).map(l => l.replace(/^\s*\d+\.\s+/, '')).map(t => `<li>${t}</li>`).join('');
    return `\n<ol>${items}</ol>`;
  });
  // Saltos de línea -> <br> (fuera de bloques de bloque)
  src = src.split(/\n{2,}/).map(p => {
    if (/^\s*<(h\d|ul|ol|pre|blockquote)/.test(p)) return p;
    return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
  }).join('');
  // Restaurar inline code
  src = src.replace(/\u0000IC(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(inlineCodes[+i])}</code>`);
  // Restaurar code blocks
  src = src.replace(/\u0000CB(\d+)\u0000/g, (_, i) => `<pre><code>${escapeHtml(codeBlocks[+i])}</code></pre>`);
  return src;
}
window.mdToHtml = mdToHtml;

function getSessionKey() {
  const cfg = getChatbotConfig();
  const clientId = (cfg.cliente && (cfg.cliente.id || cfg.cliente.nombre)) || 'default';
  return 'chat_session_id_' + String(clientId).toLowerCase().replace(/[^a-z0-9_-]+/g, '_');
}

function setCssVar(name, value) {
  if (value) document.documentElement.style.setProperty(name, value);
}

function applyChatbotTheme() {
  const cfg = getChatbotConfig();
  const t = cfg.tema || {};
  setCssVar('--ac', t.colorPrincipal);
  setCssVar('--ac-d', t.colorPrincipalHover);
  setCssVar('--ac-l', t.colorPrincipalLight);
  setCssVar('--ac-m', t.colorPrincipalMedium);
  setCssVar('--w', t.fondoPanel);
  setCssVar('--sf', t.fondoTarjeta);
  setCssVar('--sf2', t.fondoWidget);
  setCssVar('--sf3', t.fondoElevado);
  setCssVar('--b', t.bordeSuave);
  setCssVar('--b2', t.bordeFuerte);
  setCssVar('--t1', t.textoPrincipal);
  setCssVar('--t2', t.textoSecundario);
  setCssVar('--t3', t.textoSuave);
  setCssVar('--ok', t.colorOk);
  setCssVar('--ok-l', t.colorOkLight);
  setCssVar('--ok-b', t.colorOkBorder);
  setCssVar('--warn', t.colorAviso);
  setCssVar('--red', t.colorFavorito);
  setCssVar('--red-l', t.colorFavoritoLight);
  setCssVar('--sticky-bg', t.fondoSticky);
  setCssVar('--shadow-ac', t.sombraPrincipal);
}

function escapeAttr(str) {
  return String(str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function applyChatbotTexts() {
  const cfg = getChatbotConfig();
  const c = cfg.cliente || {};
  const bot = cfg.chatbot || {};
  const wl = cfg.wishlist || {};

  const assistantName = document.querySelector('[data-chatbot-assistant-name]');
  if (assistantName) assistantName.textContent = c.asistente || 'Asistente';

  const status = document.querySelector('[data-chatbot-status]');
  if (status) status.textContent = c.estado || 'En línea';

  const placeholder = document.querySelector('[data-chatbot-placeholder]');
  if (placeholder) placeholder.setAttribute('placeholder', bot.placeholder || 'Escribe tu mensaje...');

  const fabTitle = document.querySelector('[data-chatbot-fab-title]');
  if (fabTitle) fabTitle.setAttribute('title', bot.fabTitle || 'Abrir chatbot');

  const wlTitle = document.querySelector('[data-chatbot-wishlist-title]');
  if (wlTitle) wlTitle.textContent = wl.titulo || 'Mis favoritos';

  const wlEmpty = document.querySelector('[data-chatbot-wishlist-empty]');
  if (wlEmpty) wlEmpty.textContent = wl.emptyText || 'Aún no tienes favoritos guardados';

  const explore = document.querySelector('[data-chatbot-explore-label]');
  if (explore) explore.textContent = wl.exploreText || 'Explorar productos';
}

function renderInitialMessage() {
  const cfg = getChatbotConfig();
  const bot = cfg.chatbot || {};
  const msgs = document.getElementById('msgs');
  if (!msgs) return;

  const chips = Array.isArray(bot.chips) ? bot.chips : [];
  const chipsHtml = chips.map(chip => {
    const label = chip.label || chip.message || '';
    const message = chip.message || chip.label || '';
    return `<button class="chip" onclick="sendMsg('${escapeAttr(message)}')">${label}</button>`;
  }).join('');

  msgs.innerHTML = `
    <div class="mg bot">
      <div class="bbl">${mdToHtml(bot.saludo || '¡Hola! ¿En qué puedo ayudarte?')}</div>
      <div class="mt">ahora</div>
      ${chipsHtml ? `<div class="chips">${chipsHtml}</div>` : ''}
    </div>
  `;
}

function initChatbotConfig() {
  applyChatbotTheme();
  applyChatbotTexts();
  renderInitialMessage();
}

initChatbotConfig();


  function scrollMessagesBottom() {
    const msgs = document.getElementById('msgs');
    if (!msgs) return;
    requestAnimationFrame(() => {
      msgs.scrollTop = msgs.scrollHeight;
      setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 120);
    });
  }

  let widgetOpen = false;
  function toggleWidget() {
    widgetOpen = !widgetOpen;
    const shell = document.getElementById('widget-shell');
    if (widgetOpen) {
      shell.style.display = 'block';
      document.body.classList.add('widget-open');
      setTimeout(() => shell.classList.add('show-widget'), 10);
    } else {
      shell.classList.remove('show-widget');
      document.body.classList.remove('widget-open');
      setTimeout(() => shell.style.display = 'none', 300);
    }
  }
  function openProducts() {
    const shell = document.getElementById('widget-shell');
    if (shell) shell.classList.add('expanded');
    scrollMessagesBottom();
  }
  function closeProducts() {
    const shell = document.getElementById('widget-shell');
    if (shell) shell.classList.remove('expanded');
  }

  var wlItems = {}, cmpSelected = [], globalProducts = {};
  function showTab(t) {
    document.querySelectorAll('.tab').forEach((b, i) => b.classList.toggle('active', ['chat', 'wishlist'][i] === t));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('tab-' + t);
    if (panel) panel.classList.add('active');
  }
  function addCart(id, isDetail) {
    const btn = document.getElementById(id); if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = isDetail ? 'Añadido al carrito' : '✓ Añadido';
    btn.classList.add('added');
    const t = document.getElementById('toast');
    if (t) { t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000) }
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('added') }, 3500);

    // Extraer cardId desde el id del botón (ac-XXX, dv-ac-XXX, wa-XXX, cc1/cc2)
    try {
      let cardId = null;
      if (id.startsWith('dv-ac-')) cardId = id.slice(6);
      else if (id.startsWith('ac-')) cardId = id.slice(3);
      else if (id.startsWith('wa-')) cardId = id.slice(3);
      else if (id === 'cc1') cardId = cmpSelected[0];
      else if (id === 'cc2') cardId = cmpSelected[1];

      const prod = cardId ? globalProducts[cardId] : null;
      let payload;
      if (prod) {
        const img = (prod.imagenes && prod.imagenes.length ? prod.imagenes[0] : prod.url_imagen) || '';
        payload = { name: prod.titulo, price: prod.precio_actual || prod.precio_desde || '', img };
      } else if (cardId && wlItems[cardId]) {
        const w = wlItems[cardId];
        payload = { name: w.name, price: w.price, img: w.imgUrl || '' };
      }
      if (payload && payload.name) {
        window.parent.postMessage({ type: getChatbotConfig().ecommerce.addToCartEvent, product: payload }, '*');
        // Confirmación visible en el chat
        try {
          const msgs = document.getElementById('msgs');
          if (msgs) {
            const m = document.createElement('div');
            m.className = 'mg bot';
            m.innerHTML = `<div class="bbl">✅ <strong>${payload.name}</strong> se ha añadido a tu carrito.</div><div class="mt">ahora</div>`;
            msgs.appendChild(m);
            msgs.scrollTop = msgs.scrollHeight;
          }
        } catch (e) {}
      }
    } catch (e) { /* noop */ }
  }
  function toggleWL(iid, id, name, price, imgUrl) {
    const btn = document.getElementById(id);
    if (wlItems[iid]) { delete wlItems[iid]; if (btn) btn.classList.remove('saved') }
    else { wlItems[iid] = { name, price, imgUrl }; if (btn) btn.classList.add('saved') }
    updateWLUI();
    syncWlBtn(iid);
  }
  function syncWlBtn(iid) {
    const inCard = document.getElementById('wl-' + iid); if (inCard) inCard.classList.toggle('saved', !!wlItems[iid]);
    const inDv1 = document.getElementById('dvwl'); if (inDv1 && inDv1.dataset.iid === iid) inDv1.classList.toggle('saved', !!wlItems[iid]);
    const inDv2 = document.getElementById('dvwlft'); if (inDv2 && inDv2.dataset.iid === iid) inDv2.classList.toggle('saved', !!wlItems[iid]);
  }
  function updateWLUI() {
    const count = Object.keys(wlItems).length;
    const wc = document.getElementById('wl-count'); const wd = document.getElementById('wl-dot'); const wb = document.getElementById('wl-badge');
    if (wc) { wc.textContent = count; wc.style.display = count > 0 ? 'inline' : 'none' }
    if (wd) wd.style.display = count > 0 ? 'block' : 'none';
    if (wb) wb.textContent = count + ' producto' + (count !== 1 ? 's' : '');
    const empty = document.getElementById('wl-empty'); const list = document.getElementById('wl-list');
    document.querySelectorAll('.wl-item').forEach(e => e.remove());
    if (count === 0) { if (empty) empty.style.display = 'flex'; return }
    if (empty) empty.style.display = 'none';
    Object.entries(wlItems).forEach(([iid, { name, price, imgUrl }]) => {
      const d = document.createElement('div'); d.className = 'wl-item';
      let imgBlock = imgUrl ? `<img src="${imgUrl}" style="width:100%;height:100%;object-fit:contain;border-radius:8px">` : `<svg viewBox="0 0 24 24"><path d="M3 9l1-5h16l1 5M3 9h18M3 9l2 11h14l2-11"/></svg>`;
      d.innerHTML = `<div class="wl-item-img" style="cursor:pointer" onclick="openProductDetail('${iid}')">${imgBlock}</div><div class="wl-item-info" style="cursor:pointer" onclick="openProductDetail('${iid}')"><div class="wl-item-name" style="color:var(--ac)">${name}</div><div class="wl-item-price">${price}</div></div><div class="wl-item-acts" style="display:flex;flex-direction:column;gap:6px"><button class="btn-primary wl-add" id="wa-${iid}" onclick="addCart('wa-${iid}')">Añadir al carrito</button><div style="display:flex;gap:6px"><button class="btn-secondary wl-add" style="flex:1" onclick="openProductDetail('${iid}')">Ver producto</button><button class="wl-rm" onclick="removeWL('${iid}')"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div></div>`;
      list.appendChild(d);
    });
  }
  function removeWL(iid) {
    delete wlItems[iid];
    updateWLUI();
    syncWlBtn(iid);
  }
  function toggleCmpSelect(cardId, btnId) {
    document.getElementById('cmp-bar').classList.add('show');
    const idx = cmpSelected.indexOf(cardId);
    const btn = document.getElementById(btnId);
    const card = document.getElementById(cardId);

    if (idx > -1) {
      cmpSelected.splice(idx, 1);
      if (btn) { btn.classList.remove('btn-primary'); btn.classList.add('btn-tertiary'); btn.textContent = 'Comparar' }
      if (card) card.classList.remove('sel-cmp');
    } else {
      if (cmpSelected.length >= 2) {
        const oldId = cmpSelected.shift();
        const oldCard = document.getElementById(oldId);
        const oldBtn = document.querySelector(`#${oldId} .btn-cmp`);
        if (oldBtn) { oldBtn.classList.remove('btn-primary'); oldBtn.classList.add('btn-tertiary'); oldBtn.textContent = 'Comparar' }
        if (oldCard) oldCard.classList.remove('sel-cmp');
      }
      cmpSelected.push(cardId);
      if (btn) { btn.classList.remove('btn-tertiary'); btn.classList.add('btn-primary'); btn.textContent = 'Comparar ✓' }
      if (card) card.classList.add('sel-cmp');
    }

    if (cmpSelected.length === 0) document.getElementById('cmp-bar').classList.remove('show');
    updateCmpBar();
  }
  function updateCmpBar() {
    const cnt = document.getElementById('cmp-cnt'); const go = document.getElementById('cmp-go');
    if (cnt) cnt.textContent = cmpSelected.length;
    if (go) { go.disabled = cmpSelected.length < 2; go.style.opacity = cmpSelected.length < 2 ? '.35' : '1'; go.style.cursor = cmpSelected.length < 2 ? 'not-allowed' : 'pointer' }
  }
  function showCompare() {
    openProducts();
    const cols = document.querySelector('.cmp-cols');
    if (cmpSelected.length === 2 && globalProducts[cmpSelected[0]] && globalProducts[cmpSelected[1]]) {
      const p1 = globalProducts[cmpSelected[0]];
      const p2 = globalProducts[cmpSelected[1]];
      const imgs1 = p1.imagenes && p1.imagenes.length ? p1.imagenes[0] : p1.url_imagen;
      const imgs2 = p2.imagenes && p2.imagenes.length ? p2.imagenes[0] : p2.url_imagen;

      cols.innerHTML = `
          <div class="cmp-head"></div>
          <div class="cmp-head" style="line-height:1.2;padding-bottom:5px">${p1.titulo}</div>
          <div class="cmp-head" style="line-height:1.2;padding-bottom:5px">${p2.titulo}</div>
          <div class="cmp-img-c"></div>
          <div class="cmp-img-c"><div style="height:80px"><img src="${imgs1}" style="width:100%;height:100%;object-fit:contain"></div></div>
          <div class="cmp-img-c"><div style="height:80px"><img src="${imgs2}" style="width:100%;height:100%;object-fit:contain"></div></div>
          <div class="cmp-lbl">Precio</div>
          <div class="cmp-val" style="font-weight:700">${p1.precio_desde}</div>
          <div class="cmp-val" style="font-weight:700">${p2.precio_desde}</div>
          <div class="cmp-lbl">Detalles</div>
          <div class="cmp-val" style="font-size:11px">${p1.caracteristicas_clave || '-'}</div>
          <div class="cmp-val" style="font-size:11px">${p2.caracteristicas_clave || '-'}</div>
          <div class="cmp-cart-row" style="margin-top:0">
            <div class="cmp-lbl" style="border:none"></div>
            <div class="cmp-val" style="border-bottom:none;padding:10px"><button class="btn-primary" style="width:100%;padding:10px 0;font-size:12px" onclick="addCart('cc1')">Al carrito</button></div>
            <div class="cmp-val" style="border-bottom:none;padding:10px"><button class="btn-primary" style="width:100%;padding:10px 0;font-size:12px" onclick="addCart('cc2')">Al carrito</button></div>
          </div>
      `;
    }
    document.getElementById('list-view').style.display = 'none';
    document.getElementById('cmp-view').classList.add('visible');
    document.getElementById('dv').classList.remove('visible');
  }
  function hideCompare() {
    document.getElementById('list-view').style.display = 'flex';
    document.getElementById('cmp-view').classList.remove('visible');
  }
  function clearCompare() {
    cmpSelected = [];
    document.querySelectorAll('.btn-cmp').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-tertiary'); b.textContent = 'Comparar' });
    document.querySelectorAll('.pc').forEach(c => c.classList.remove('sel-cmp'));
    document.getElementById('cmp-bar').classList.remove('show');
    updateCmpBar();
  }

  function openProductDetail(cardId) {
    const prod = globalProducts[cardId];
    if (!prod) return;
    const imgs = (prod.imagenes && prod.imagenes.length) ? prod.imagenes : [prod.url_imagen];
    const dvImg = document.querySelector('.dv-img');

    const _t = String(prod.titulo || '').replace(/'/g, "\\'");
    const _p = String(prod.precio_actual || '').replace(/'/g, "\\'");
    const _i = String(imgs[0] || '').replace(/'/g, "\\'");
    dvImg.innerHTML = `<img src="${imgs[0]}" style="width:100%;height:100%;object-fit:contain;padding:15px">
  <button class="dv-wl ${wlItems[cardId] ? 'saved' : ''}" id="dvwl" data-iid="${cardId}" onclick="toggleWL('${cardId}','dvwl','${_t}','${_p}','${_i}')">
    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  </button>`;

    let thumbsHtml = '';
    if (imgs.length > 1) {
      thumbsHtml = `<div class="thumbs">` + imgs.map((img, i) => `<div class="th ${i === 0 ? 'a' : ''}" onclick="changeDvImg(this, '${img}')"><img src="${img}" style="width:100%;height:100%;object-fit:contain;padding:4px;border-radius:8px"></div>`).join('') + `</div>`;
    }

    // NUEVO: Modo de Empleo y Objetivo Principal
    let modoEmpleoHtml = prod.modo_empleo ? `
      <div class="dv-compat-box" style="background:#3d2817; border-color:#e67e22; margin-top:15px;">
         <div class="dv-compat-title" style="color:#e67e22;">💡 Modo de Empleo</div>
         <div class="dv-compat-val" style="font-size:12px">${prod.modo_empleo}</div>
      </div>` : '';

    let objetivoHtml = prod.objetivo_principal ? `
      <div style="font-size:12px; font-weight:600; color:var(--t2); margin-bottom:10px;">
        🎯 Objetivo: <span style="color:var(--t1)">${prod.objetivo_principal}</span>
      </div>` : '';

    // NUEVO: detalles_tecnicos de Flowise
    let destacadasHtml = '';
    if (prod.detalles_tecnicos && Array.isArray(prod.detalles_tecnicos)) {
      destacadasHtml = `
        <div class="dv-section">
            <div style="font-size:11px;font-weight:800;color:var(--t3);margin-bottom:15px;text-transform:uppercase;letter-spacing:1px">Detalles Técnicos</div>
            <div class="dv-spec-grid" style="grid-template-columns: 1fr;">
                ${prod.detalles_tecnicos.map(d => `
                  <div class="dv-spec-item" style="padding:10px;">
                    <div class="dv-spec-val" style="font-size:12px;">${d}</div>
                  </div>`).join('')}
            </div>
        </div>
        `;
    }

    const dvBody = document.querySelector('.dv-body');
    dvBody.innerHTML = `
    ${thumbsHtml}
    <div class="dv-section">
        <div class="dv-name" style="font-size:20px;margin-bottom:10px;font-weight:700;line-height:1.2;color:var(--t1);">${prod.titulo}</div>
        ${objetivoHtml}
        <div style="display:flex;align-items:baseline;margin-bottom:10px">
           <div class="dv-price" id="price-dv-${cardId}" style="font-size:32px;font-weight:900;color:var(--ac)">${prod.precio_actual}</div>
           ${prod.precio_original ? `<div class="old-price">${prod.precio_original}</div>` : ''}
        </div>
        ${modoEmpleoHtml}
    </div>
    ${destacadasHtml}

    <div style="padding:16px;position:sticky;bottom:0;background:var(--sticky-bg);backdrop-filter:blur(10px);border-top:1px solid var(--b);display:flex;gap:10px;z-index:20">
        <button class="btn-tertiary" style="flex:1;border-radius:10px;padding:12px;font-size:13px;font-weight:700" onclick="window.open('${prod.url_producto}', '_blank')">Ver en tienda</button>
        <button class="btn-primary" style="flex:1.5;border-radius:10px;padding:12px;font-size:14px;font-weight:800" id="dv-ac-${cardId}" onclick="addCart('dv-ac-${cardId}',true)">Añadir al Carrito</button>
    </div>
  `;
    showDetail();
  }

  function changeDvImg(th, src) {
    th.closest('.dv-body').querySelectorAll('.th').forEach(x => x.classList.remove('a'));
    th.classList.add('a');
    document.querySelector('.dv-img img').src = src;
  }
  function showDetail() {
    showTab('chat');
    openProducts();
    document.getElementById('list-view').style.display = 'none';
    document.getElementById('cmp-view').classList.remove('visible');
    document.getElementById('dv').classList.add('visible');
  }
  function hideDetail() {
    document.getElementById('list-view').style.display = 'flex';
    document.getElementById('dv').classList.remove('visible');
  }
  function updatePrice(el, price, cardId) {
    const prElement = document.getElementById(`price-${cardId}`);
    if (prElement) {
      prElement.innerText = price;
      prElement.classList.remove('price-anim');
      void prElement.offsetWidth; // Trigger reflow
      prElement.classList.add('price-anim');
    }
    const prDvElement = document.getElementById(`price-dv-${cardId}`);
    if (prDvElement) {
      prDvElement.innerText = price;
      prDvElement.classList.remove('price-anim');
      void prDvElement.offsetWidth;
      prDvElement.classList.add('price-anim');
    }
    el.parentElement.querySelectorAll('.variant-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  }
  function scrollCar(btn, dir) {
    const wrap = btn.closest('.car-wrap');
    const scroll = wrap.querySelector('.car-scroll');
    const w = scroll.clientWidth;
    scroll.scrollBy({ left: dir * w, behavior: 'smooth' });
  }
  function syncCarDots(scroll) {
    const dots = scroll.closest('.car-wrap').querySelectorAll('.car-dot');
    const w = scroll.clientWidth;
    const idx = Math.round(scroll.scrollLeft / w);
    dots.forEach((d, i) => d.classList.toggle('a', i === idx));
  }
  function selVar(el) {
    el.closest('.pc-vars').querySelectorAll('.vd').forEach(v => v.classList.remove('a')); el.classList.add('a');
  }
  function selPill(el, lid, type) {
    if (el.classList.contains('out')) return;
    el.closest('.pills').querySelectorAll('.pill').forEach(p => p.classList.remove('a')); el.classList.add('a');
    const lbl = document.getElementById(lid); if (lbl) lbl.textContent = el.textContent + (type === 't' ? ' seleccionada' : '');
  }
  document.querySelectorAll('.th').forEach(t => {
    t.onclick = function () { this.closest('.thumbs').querySelectorAll('.th').forEach(x => x.classList.remove('a')); this.classList.add('a') };
  });
  /* ==========================================
     NUEVA CONEXIÓN A N8N Y FLOWISE
     ========================================== */

  // 1. Generar ID de Sesión para Flowise
  let sessionId = localStorage.getItem(getSessionKey());
  if (!sessionId) {
    sessionId = 'sesion_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(getSessionKey(), sessionId);
  }

  // ⚠️ IMPORTANTE: Pon aquí la URL del Webhook de tu n8n
  const N8N_WEBHOOK_URL = getChatbotConfig().n8n.webhookUrl;

  // 2. Función Principal de Envío
  async function sendMsg(text) {
    const msgs = document.getElementById('msgs');

    // A. Mostrar mensaje del usuario
    const u = document.createElement('div');
    u.className = 'mg user';
    u.innerHTML = `<div class="bbl">${text}</div><div class="mt">ahora</div>`;
    msgs.appendChild(u);

    // B. Mostrar animación de "escribiendo"
    const ty = document.createElement('div');
    ty.className = 'mg bot';
    ty.id = 'indicador-escribiendo';
    ty.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    msgs.appendChild(ty);
    msgs.scrollTop = msgs.scrollHeight;

    try {
      // C. Hacer la llamada a n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: text,
          sessionId: sessionId
        })
      });

      if (!response.ok) throw new Error("Error en la conexión con n8n");

      let rawData = await response.json();
      let parsedData = rawData;

      // Limpieza mágica para n8n / Flowise si devuelven Markdown
      if (Array.isArray(rawData) && rawData.length > 0) {
        if (rawData[0].text) {
          let textContent = rawData[0].text;
          if (textContent.includes('\`\`\`json')) {
            textContent = textContent.replace(/^[\s\S]*?\`\`\`json\s*/, '').replace(/\s*\`\`\`[\s\S]*?$/, '');
          }
          try {
            parsedData = JSON.parse(textContent);
          } catch (e) {
            console.error("Error parseando el JSON oculto:", e);
            parsedData = rawData[0]; // fallback
          }
        } else {
          parsedData = rawData[0];
        }
      }

      // D. Quitar el "escribiendo"
      document.getElementById('indicador-escribiendo').remove();

      // E. Procesar la respuesta
      renderizarRespuesta(parsedData);

    } catch (error) {
      console.error(error);
      document.getElementById('indicador-escribiendo').remove();
      const err = document.createElement('div');
      err.className = 'mg bot';
      err.innerHTML = `<div class="bbl" style="background:var(--red-l);border-color:var(--red)">${mdToHtml(getChatbotConfig().chatbot.error || 'Ha ocurrido un error.')}</div>`;
      msgs.appendChild(err);
      msgs.scrollTop = msgs.scrollHeight;
    }
  }

  // 3. Función que interpreta el JSON de Flowise
  function renderizarRespuesta(data) {
    const msgs = document.getElementById('msgs');

    // Dibujar el mensaje de texto del bot
    const b = document.createElement('div');
    b.className = 'mg bot';
    b.innerHTML = `<div class="bbl">${mdToHtml(data.mensaje_chat || data.respuesta || data.text || "Te muestro algunas opciones.")}</div><div class="mt">ahora</div>`;
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;

    if (data.accion === "mostrar_productos" && data.productos && data.productos.length > 0) {
      const panelLista = document.querySelector('.pl');
      panelLista.innerHTML = '<div class="toast" id="toast"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Añadido al carrito correctamente</div>';

      data.productos.forEach((prod, index) => {
        const cardId = `card-ia-${index}`;
        globalProducts[cardId] = prod;

        const imgsArr = (prod.imagenes && prod.imagenes.length > 0) ? prod.imagenes : [prod.url_imagen];
        const safeTitulo = String(prod.titulo || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const safePrecio = String(prod.precio_actual || '').replace(/'/g, "\\'");
        const safeImg = String(imgsArr[0] || '').replace(/'/g, "\\'");
        const extLink = `<a href="${prod.url_producto}" target="_blank" class="pc-link-ext" title="Ver en tienda" onclick="event.stopPropagation()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg></a>`;

        let imgOrCarHtml = `
              <div class="pc-img" style="height:140px; position:relative">
                ${extLink}
                <img src="${imgsArr[0]}" alt="${prod.titulo}" style="width:100%; height:100%; object-fit:contain; padding:10px;">
                <button class="wl-btn" id="wl-${cardId}" onclick="event.stopPropagation();toggleWL('${cardId}','wl-${cardId}','${safeTitulo}','${safePrecio}','${safeImg}')">
                  <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>`;

        const featuresHtml = prod.caracteristicas_clave
          ? `<div style="font-size:10px; color:var(--ac-d); font-weight:600; background:var(--ac-l); padding:4px 8px; border-radius:6px; display:inline-block; margin-bottom:8px;">✨ ${prod.caracteristicas_clave.substring(0, 60)}...</div>`
          : '';

        const tarjetaHtml = `
            <div class="pc sel" id="${cardId}" style="border:1px solid var(--b); border-radius:14px; overflow:hidden; background:var(--w)">
              ${imgOrCarHtml}
              <div class="pc-bd" style="padding:14px">
                ${featuresHtml}
                <div class="pc-name" style="font-size:15px; margin-bottom:4px; font-weight:700; color:var(--t1)">${prod.titulo}</div>
                <div class="pc-pr" style="margin-bottom:12px; display:flex; align-items:baseline; gap:8px">
                    <span class="pc-price" id="price-${cardId}" style="color:var(--ac)">${prod.precio_actual}</span>
                    ${prod.precio_original ? `<span class="old-price" style="font-size:0.9rem">${prod.precio_original}</span>` : ''}
                </div>

                <div class="pc-acts" style="margin-top:14px; display:grid; grid-template-columns:1fr 1fr; gap:8px">
                  <button class="btn-secondary" style="padding:8px; font-size:12px; border-radius:8px; grid-column:span 2" onclick="event.stopPropagation(); openProductDetail('${cardId}')">Ver detalles</button>
                  <button class="btn-primary" style="padding:10px; font-size:13px; grid-column:span 2; font-weight:700; border-radius:8px" id="ac-${cardId}" onclick="event.stopPropagation();addCart('ac-${cardId}')">Añadir al carrito</button>
                </div>
              </div>
            </div>`;

        panelLista.insertAdjacentHTML('beforeend', tarjetaHtml);
      });

      document.querySelector('.cnt-badge').innerText = `${data.productos.length} resultados`;

      if (document.documentElement.classList.contains('mobile')) {
        // En móvil no abrimos automáticamente el panel: insertamos un aviso clicable en el chat
        const n = data.productos.length;
        const card = document.createElement('div');
        card.className = 'mg bot';
        card.innerHTML = `
          <div class="product-recommend-card">
            <div style="font-size:12.5px;color:var(--t1);font-weight:600;line-height:1.4">
              ✨ Tengo ${n} producto${n !== 1 ? 's' : ''} recomendado${n !== 1 ? 's' : ''} para ti.
            </div>
            <button class="prc-btn" onclick="openProducts()">Ver producto${n !== 1 ? 's' : ''} (${n})</button>
          </div>
          <div class="mt">ahora</div>`;
        msgs.appendChild(card);
        msgs.scrollTop = msgs.scrollHeight;
      } else {
        openProducts();
      }
    }
  }

  function sendFromInput() {
    closeProducts();
    const input = document.getElementById('chat-input');
    const txt = input.value.trim();
    if (!txt) return;
    sendMsg(txt);
    input.value = '';
  }



(function(){
  function applyMobileClass(){
    var isMobile = false;
    try { isMobile = (window.top && window.top.innerWidth ? window.top.innerWidth : window.innerWidth) < 640; }
    catch(e){ isMobile = window.innerWidth < 640; }
    document.documentElement.classList.toggle('mobile', isMobile);
  }
  applyMobileClass();
  window.addEventListener('resize', applyMobileClass);
  window.addEventListener('message', function(e){
    if (e.data && e.data.type === 'titan-chat-viewport') {
      document.documentElement.classList.toggle('mobile', !!e.data.isMobile);
    }
  });

  function postSize(){
    var shell = document.getElementById('widget-shell');
    var open = shell && shell.classList.contains('show-widget');
    var expanded = shell && shell.classList.contains('expanded');
    parent.postMessage({type:getChatbotConfig().ecommerce.resizeEvent, open: !!open, expanded: !!expanded}, '*');
  }
  var orig = window.toggleWidget;
  window.toggleWidget = function(){ orig && orig(); setTimeout(postSize, 50); setTimeout(postSize, 450); };
  var origOpen = window.openProducts;
  window.openProducts = function(){ origOpen && origOpen(); setTimeout(postSize, 50); setTimeout(postSize, 450); };
  var origClose = window.closeProducts;
  window.closeProducts = function(){ origClose && origClose(); setTimeout(postSize, 50); setTimeout(postSize, 450); };
  window.addEventListener('load', postSize);
  window.addEventListener('message', function(e){
    if (e.data && e.data.type === getChatbotConfig().ecommerce.openChatEvent) {
      var shell = document.getElementById('widget-shell');
      var isOpen = shell && shell.classList.contains('show-widget');
      if (!isOpen) window.toggleWidget();
    }
  });
})();
