(function(){
  // WhatsApp number in international format, digits only (e.g. 2126XXXXXXXX)
  var WA_NUMBER = '212682163045';
  var FR = /^fr/i.test(document.documentElement.lang);
  var me = document.currentScript || document.querySelector('script[src*="site.js"]');
  var ASSETS = me ? me.src.replace(/site\.js.*$/, '') : 'assets/';
  var T = FR ? {
    open: 'Ouvrir le menu', close: 'Fermer le menu', chat: 'Discuter sur WhatsApp',
    sub: 'Sp&eacute;cialiste SEO &amp; web designer &middot; r&eacute;pond sous 24 h',
    hi: 'Bonjour &#128075; Besoin d&rsquo;un nouveau site, de plus de trafic Google, ou des deux ? Parlez-moi de votre projet.',
    topics: ['Nouveau site web', 'Audit SEO', 'Site + SEO', 'Simple question'], go: 'D&eacute;marrer la discussion',
    msg: 'Bonjour Khadija, j&rsquo;ai vu votre portfolio et je suis int&eacute;ress&eacute;(e) par : '
  } : {
    open: 'Open menu', close: 'Close menu', chat: 'Chat on WhatsApp',
    sub: 'SEO Specialist &amp; Web Designer &middot; replies within a day',
    hi: 'Hi &#128075; Need a new website, more Google traffic, or both? Tell me about your project.',
    topics: ['New website', 'SEO audit', 'Website + SEO', 'Just a question'], go: 'Start the chat',
    msg: 'Hello Khadija, I found your portfolio and I am interested in: '
  };
  var plain = function(s){ var d = document.createElement('textarea'); d.innerHTML = s; return d.value; };
  var waIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';

  // Mobile menu
  var header = document.querySelector('header');
  var nav = header && header.querySelector(':scope > nav');
  if (nav) {
    nav.id = nav.id || 'main-nav';
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'nav-burger';
    b.setAttribute('aria-label', T.open); b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', nav.id);
    b.innerHTML = '<span></span>';
    header.insertBefore(b, nav);
    var wa = document.createElement('a');
    wa.className = 'nav-wa'; wa.target = '_blank'; wa.rel = 'noopener';
    wa.innerHTML = waIcon.replace(/28/g, '20') + 'WhatsApp';
    nav.appendChild(wa);
    var setOpen = function(o){ document.body.classList.toggle('nav-open', o); b.setAttribute('aria-expanded', o ? 'true' : 'false'); b.setAttribute('aria-label', o ? T.close : T.open); };
    b.addEventListener('click', function(){ setOpen(!document.body.classList.contains('nav-open')); });
    nav.addEventListener('click', function(e){ if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setOpen(false); b.focus(); } });
    addEventListener('resize', function(){ if (innerWidth > 900) setOpen(false); });
  }

  // WhatsApp popup
  var box = document.createElement('div');
  box.className = 'wa';
  box.innerHTML =
    '<div class="wa-pop" id="wa-pop" role="dialog" aria-label="' + plain(T.chat) + '">' +
      '<div class="wa-head"><span class="wa-av"><img src="' + ASSETS + 'img/khadija-el-azizi.jpg" alt=""></span><span><b>Khadija El Azizi</b><small>' + T.sub + '</small></span></div>' +
      '<div class="wa-body"><div class="wa-msg">' + T.hi + '<small>Khadija</small></div>' +
      '<div class="wa-quick">' + T.topics.map(function(x, i){ return '<button type="button"' + (i ? '' : ' class="on"') + '>' + x + '</button>'; }).join('') + '</div></div>' +
      '<a class="wa-go" target="_blank" rel="noopener">' + waIcon.replace(/28/g, '18') + T.go + '</a>' +
    '</div>' +
    '<button type="button" class="wa-btn" aria-label="' + plain(T.chat) + '" aria-expanded="false" aria-controls="wa-pop"><span class="wa-ic">' + waIcon + '</span><svg class="wa-x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg><span class="wa-badge">1</span></button>';
  document.body.appendChild(box);
  var btn = box.querySelector('.wa-btn'), go = box.querySelector('.wa-go'), topic = T.topics[0];
  var link = function(){
    var msg = plain(T.msg) + topic + '.';
    var href = WA_NUMBER ? 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg) : 'contact.html';
    go.href = href; if (wa) wa.href = WA_NUMBER ? 'https://wa.me/' + WA_NUMBER : 'contact.html';
  };
  link();
  box.querySelectorAll('.wa-quick button').forEach(function(q){ q.addEventListener('click', function(){ box.querySelectorAll('.wa-quick button').forEach(function(x){ x.classList.remove('on'); }); q.classList.add('on'); topic = q.textContent; link(); }); });
  btn.addEventListener('click', function(){ var o = box.classList.toggle('open'); box.classList.add('seen'); btn.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  document.addEventListener('click', function(e){ if (!box.contains(e.target)) { box.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { box.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  // Zoomable images: any [data-zoom] element opens a full-size viewer
  var zItems = [].slice.call(document.querySelectorAll('[data-zoom]'));
  if (zItems.length) {
    var Z = FR ? { close: 'Fermer', prev: 'Image précédente', next: 'Image suivante', dlg: 'Capture en grand' } : { close: 'Close', prev: 'Previous image', next: 'Next image', dlg: 'Full-size screenshot' };
    var ico = function(d){ return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'; };
    var zb = document.createElement('div'); zb.className = 'zoom'; zb.setAttribute('role', 'dialog'); zb.setAttribute('aria-modal', 'true'); zb.setAttribute('aria-label', Z.dlg);
    zb.innerHTML = '<div class="zoom-top"><span><b></b><small></small></span><span class="zoom-btns"><button type="button" data-z="-1" aria-label="' + Z.prev + '">' + ico('M15 6l-6 6 6 6') + '</button><button type="button" data-z="1" aria-label="' + Z.next + '">' + ico('M9 6l6 6-6 6') + '</button><button type="button" data-z="x" aria-label="' + Z.close + '">' + ico('M6 6l12 12M18 6L6 18') + '</button></span></div><div class="zoom-view"><img alt=""></div>';
    document.body.appendChild(zb);
    var zImg = zb.querySelector('img'), zView = zb.querySelector('.zoom-view'), zCur = 0, zLast = null;
    var zShow = function(i){ zCur = (i + zItems.length) % zItems.length; var el = zItems[zCur]; var ti = el.querySelector('img'); zImg.src = el.getAttribute('data-zoom') || (ti ? ti.currentSrc || ti.src : ''); zImg.alt = ti ? ti.alt : ''; var cb = el.querySelector('.zg-cap b, .lp-cap b'), cs = el.querySelector('.zg-cap small, .lp-cap small'); zb.querySelector('b').textContent = cb ? cb.textContent : ''; zb.querySelector('small').textContent = cs ? cs.textContent : ''; zView.scrollTop = 0; };
    var zOpen = function(i){ zLast = document.activeElement; zShow(i); zb.classList.add('open'); document.body.classList.add('zoom-open'); zb.querySelector('[data-z="x"]').focus(); };
    var zClose = function(){ zb.classList.remove('open'); document.body.classList.remove('zoom-open'); if (zLast) zLast.focus(); };
    zItems.forEach(function(el, i){ el.addEventListener('click', function(e){ e.preventDefault(); zOpen(i); }); });
    zb.addEventListener('click', function(e){ var b = e.target.closest('[data-z]'); if (b) { if (b.getAttribute('data-z') === 'x') zClose(); else zShow(zCur + (+b.getAttribute('data-z'))); } else if (e.target === zView) zClose(); });
    document.addEventListener('keydown', function(e){ if (!zb.classList.contains('open')) return; if (e.key === 'Escape') zClose(); else if (e.key === 'ArrowRight') zShow(zCur + 1); else if (e.key === 'ArrowLeft') zShow(zCur - 1); });
  }
})();