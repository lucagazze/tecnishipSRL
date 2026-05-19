(function () {
  'use strict';
  function storeES() {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.innerHTML);
    });
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      if (!el.hasAttribute('data-es-ph')) el.setAttribute('data-es-ph', el.getAttribute('placeholder') || '');
    });
  }
  function applyLang(lang) {
    storeES();
    var en = (lang === 'en');
    document.querySelectorAll('[data-en]').forEach(function (el) {
      el.innerHTML = en ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      el.setAttribute('placeholder', en ? el.getAttribute('data-en-ph') : el.getAttribute('data-es-ph'));
    });
    document.querySelectorAll('.lang-pill-es').forEach(function (el) {
      el.style.background = en ? 'transparent' : '#002a4d';
      el.style.color = en ? '#42474f' : '#fff';
    });
    document.querySelectorAll('.lang-pill-en').forEach(function (el) {
      el.style.background = en ? '#002a4d' : 'transparent';
      el.style.color = en ? '#fff' : '#42474f';
    });
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('site-lang', lang);
  }
  window.switchLang = function () {
    applyLang(localStorage.getItem('site-lang') === 'en' ? 'es' : 'en');
  };
  var saved = localStorage.getItem('site-lang');
  if (saved === 'en') applyLang('en');
})();
