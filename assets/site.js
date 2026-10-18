(function(){
  // WhatsApp number in international format, digits only (e.g. 2126XXXXXXXX)
  var WA_NUMBER = '212682163045';
  var waIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';

  // Mobile menu
  var header = document.querySelector('header');
  var nav = header && header.querySelector('nav[aria-label="Main navigation"]');
  if (nav) {
    nav.id = nav.id || 'main-nav';
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'nav-burger';
    b.setAttribute('aria-label', 'Open menu'); b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', nav.id);
    b.innerHTML = '<span></span>';
    header.insertBefore(b, nav);
    var wa = document.createElement('a');
    wa.className = 'nav-wa'; wa.target = '_blank'; wa.rel = 'noopener';
    wa.innerHTML = waIcon.replace(/28/g, '20') + 'WhatsApp';
    nav.appendChild(wa);
    var setOpen = function(o){ document.body.classList.toggle('nav-open', o); b.setAttribute('aria-expanded', o ? 'true' : 'false'); b.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
    b.addEventListener('click', function(){ setOpen(!document.body.classList.contains('nav-open')); });
    nav.addEventListener('click', function(e){ if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setOpen(false); b.focus(); } });
    addEventListener('resize', function(){ if (innerWidth > 900) setOpen(false); });
  }

  // WhatsApp popup
  var box = document.createElement('div');
  box.className = 'wa';
  box.innerHTML =
    '<div class="wa-pop" id="wa-pop" role="dialog" aria-label="Chat on WhatsApp">' +
      '<div class="wa-head"><span class="wa-av"><img src="assets/img/khadija-el-azizi.jpg" alt=""></span><span><b>Khadija El Azizi</b><small>SEO Specialist &amp; Web Designer &middot; replies within a day</small></span></div>' +
      '<div class="wa-body"><div class="wa-msg">Hi &#128075; Need a new website, more Google traffic, or both? Tell me about your project.<small>Khadija</small></div>' +
      '<div class="wa-quick"><button type="button" class="on">New website</button><button type="button">SEO audit</button><button type="button">Website + SEO</button><button type="button">Just a question</button></div></div>' +
      '<a class="wa-go" target="_blank" rel="noopener">' + waIcon.replace(/28/g, '18') + 'Start the chat</a>' +
    '</div>' +
    '<button type="button" class="wa-btn" aria-label="Chat on WhatsApp" aria-expanded="false" aria-controls="wa-pop"><span class="wa-ic">' + waIcon + '</span><svg class="wa-x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg><span class="wa-badge">1</span></button>';
  document.body.appendChild(box);
  var btn = box.querySelector('.wa-btn'), go = box.querySelector('.wa-go'), topic = 'New website';
  var link = function(){
    var msg = 'Hello Khadija, I found your portfolio and I am interested in: ' + topic + '.';
    var href = WA_NUMBER ? 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg) : 'contact.html';
    go.href = href; if (wa) wa.href = WA_NUMBER ? 'https://wa.me/' + WA_NUMBER : 'contact.html';
  };
  link();
  box.querySelectorAll('.wa-quick button').forEach(function(q){ q.addEventListener('click', function(){ box.querySelectorAll('.wa-quick button').forEach(function(x){ x.classList.remove('on'); }); q.classList.add('on'); topic = q.textContent; link(); }); });
  btn.addEventListener('click', function(){ var o = box.classList.toggle('open'); box.classList.add('seen'); btn.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  document.addEventListener('click', function(e){ if (!box.contains(e.target)) { box.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { box.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
})();
