(function () {
  'use strict';

  var cur = (window.location.pathname.split('/').pop() || '');

  function inject(id, html) {
    var el = document.getElementById(id);
    if (!el) return;
    var d = document.createElement('div');
    d.innerHTML = html;
    var p = el.parentNode;
    while (d.firstChild) p.insertBefore(d.firstChild, el);
    p.removeChild(el);
  }

  var navbar = `<!-- TopBar -->

<header class="sticky top-0 z-50 bg-surface-container-lowest shadow-sm py-4">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <a class="flex-shrink-0" href="/">
      <img src="logo.webp" alt="Tecniship SRL" class="h-12 w-auto object-contain" />
    </a>
    <nav class="hidden lg:flex items-center space-x-6">
      <a class="nav-link" href="/" data-en="Home">Inicio</a>
      <a class="nav-link" href="nosotros" data-en="About Us">Nosotros</a>
      <a class="nav-link" href="servicios" data-en="Services">Servicios</a>
      <a class="nav-link" href="repuestos" data-en="Spare Parts">Repuestos</a>
      <a class="nav-link" href="calidad" data-en="Quality">Calidad</a>
      <a class="nav-link" href="contacto" data-en="Contact">Contacto</a>
    </nav>
    <div class="flex items-center gap-3">
      
      <a class="btn-cotizar hidden lg:inline-flex" href="contacto"><i class="fas fa-file-alt mr-2 text-base"></i> <span data-en="QUOTE">COTIZACIÓN</span></a>
        <button onclick="switchLang()" class="lang-toggle flex items-center rounded-full overflow-hidden cursor-pointer select-none" style="border:1.5px solid #c2c7d0;background:#e5e8ee">
        <span class="lang-pill-es flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold" style="background:#002a4d;color:#fff;border-radius:50px">
          <img src="https://flagcdn.com/w20/es.png" width="15" style="display:inline;vertical-align:middle;border-radius:2px"> ES
        </span>
        <span class="lang-pill-en flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold" style="color:#42474f;border-radius:50px">
          <img src="https://flagcdn.com/w20/us.png" width="15" style="display:inline;vertical-align:middle;border-radius:2px"> EN
        </span>
      </button>
      <button class="lg:hidden text-on-surface-variant hover:text-primary" onclick="openMobileMenu()">
        <i class="fas fa-bars text-2xl"></i>
      </button>
    </div>
  </div>
</header>
<div id="mobileDrawer" class="hidden fixed inset-0 z-[100]">
  <div class="absolute inset-0 bg-black/50" onclick="closeMobileMenu()"></div>
  <div class="absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl flex flex-col">
    <div class="flex justify-between items-center px-6 py-5 border-b border-outline-variant">
      <a href="/" class="flex-shrink-0">
        <img src="logo.webp" alt="Tecniship SRL" class="h-8 w-auto object-contain" />
      </a>
      <button onclick="closeMobileMenu()" class="text-on-surface-variant hover:text-primary text-xl w-8 h-8 flex items-center justify-center"><i class="fas fa-times"></i></button>
    </div>
    <nav class="flex-1 overflow-y-auto">
      <a href="/" onclick="closeMobileMenu()" class="flex justify-between items-center px-6 py-4 text-on-surface font-medium border-b border-outline-variant hover:text-primary transition-colors" data-en="Home">Inicio</a>
      <a href="nosotros" onclick="closeMobileMenu()" class="flex justify-between items-center px-6 py-4 text-on-surface font-medium border-b border-outline-variant hover:text-primary transition-colors" data-en="About Us">Nosotros</a>
      <a href="servicios" onclick="closeMobileMenu()" class="flex justify-between items-center px-6 py-4 text-on-surface font-medium border-b border-outline-variant hover:text-primary transition-colors" data-en="Services">Servicios</a>
      <a href="repuestos" onclick="closeMobileMenu()" class="flex justify-between items-center px-6 py-4 text-on-surface font-medium border-b border-outline-variant hover:text-primary transition-colors" data-en="Spare Parts">Repuestos</a>
      <a href="calidad" onclick="closeMobileMenu()" class="flex justify-between items-center px-6 py-4 text-on-surface font-medium border-b border-outline-variant hover:text-primary transition-colors" data-en="Quality">Calidad</a>
      <a href="contacto" onclick="closeMobileMenu()" class="flex justify-between items-center px-6 py-4 text-on-surface font-medium border-b border-outline-variant hover:text-primary transition-colors" data-en="Contact">Contacto</a>
      <div class="px-6 py-4 border-b border-outline-variant">
        <a href="contacto" onclick="closeMobileMenu()" class="btn-cotizar w-full justify-center"><i class="fas fa-file-alt mr-2"></i> <span data-en="QUOTE">COTIZACIÓN</span></a>
      </div>
    </nav>
  </div>
</div>`;

  var footerLinks = [
    { href: 'nosotros', label: 'Nosotros',      en: 'About Us',          page: '' },
    { href: 'mantenimiento.html',  label: 'Mantenimiento Naval',   en: 'Naval Maintenance', page: 'mantenimiento' },
    { href: 'reparacion.html',     label: 'Reparación de Equipos', en: 'Equipment Repair',  page: 'reparacion' },
    { href: 'repuestos.html',      label: 'Venta de Repuestos',    en: 'Spare Parts',       page: 'repuestos' },
    { href: '#contacto',           label: 'Contacto',              en: 'Contact',           page: '' },
  ];

  var linksHtml = '';
  footerLinks.forEach(function (l) {
    var a = (l.page && l.page === cur) ? ' font-semibold text-primary' : '';
    linksHtml += '<li><a class="hover:text-primary flex items-center' + a + '" href="' + l.href + '"><i class="fas fa-chevron-right text-[8px] mr-2 text-outline"></i> <span data-en="' + l.en + '">' + l.label + '</span></a></li>';
  });

  var footer = `<footer class="bg-white border-t border-outline-variant">
  <div class="container mx-auto px-4 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="space-y-4">
        <div class="mb-5">
          <a href="/"><img src="logo.webp" alt="Tecniship SRL" style="height:52px;width:auto;object-fit:contain" /></a>
        </div>
        <p class="text-xs text-on-surface-variant leading-relaxed pr-4" data-en="Comprehensive maintenance, repair and spare parts service for tugboats, oil tankers and bulk carriers in Argentina.">Servicio integral de mantenimiento, reparación y venta de repuestos navales para barcos remolcadores, petroleros y cerealeros en Argentina.</p>
        
      </div>
      <div>
        <h4 class="font-bold text-on-surface text-sm mb-4" data-en="CONTACT">CONTACTO</h4>
        <ul class="space-y-3 text-xs text-on-surface-variant">
          <li class="flex items-start"><i class="fas fa-chevron-down text-outline mt-1 mr-2 text-[10px]"></i><div><span class="block text-outline mb-1" data-en="PHONES">TELÉFONOS</span><span class="block">+54 9 341 555 1826 (técnico)<br/>+54 9 341 555 2503 (administración)<br/>+54 9 341 552 8124 (administración)</span></div></li>
          <li class="flex items-start"><i class="fas fa-chevron-down text-outline mt-1 mr-2 text-[10px]"></i><div><span class="block text-outline mb-1" data-en="EMAIL">EMAIL</span><span class="block">Tecniship@yahoo.com.ar</span></div></li>
          <li class="flex items-start"><i class="fas fa-chevron-down text-outline mt-1 mr-2 text-[10px]"></i><div><span class="block text-outline mb-1" data-en="ADDRESS">DIRECCIÓN</span><span class="block">Ruta 9 Km. 280,5, S2126<br/>Alvear, Santa Fe, Argentina</span></div></li>
          <li class="flex items-start"><i class="fas fa-chevron-down text-outline mt-1 mr-2 text-[10px]"></i><div><span class="block text-outline mb-1" data-en="BUSINESS HOURS">HORARIOS</span><span class="block" data-en="Mon–Fri 07:00–18:00 · Sat 08:00–16:00">Lun–Vie 07:00–18:00 · Sáb 08:00–16:00</span></div></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-on-surface text-sm mb-4" data-en="LINKS:">LINKS:</h4>
        <ul class="space-y-2 text-xs text-on-surface-variant">
          ${linksHtml}
        </ul>
      </div>
      <div>
        <a class="btn-cotizar text-[11px] py-2.5 px-5" href="#contacto"><i class="fas fa-file-alt mr-2"></i> <span data-en="REQUEST A QUOTE">SOLICITAR COTIZACIÓN</span></a>
      </div>
    </div>
  </div>
  <div class="border-t border-outline-variant py-4">
    <div class="container mx-auto px-4 flex justify-between items-center text-[10px] text-on-surface-variant">
      <div><p>2011 - <strong>TECNISHIP SRL</strong></p><p data-en="Naval Maintenance Service · Argentina.">Servicio de Mantenimiento Naval · Argentina.</p></div>
      <a href="https://algoritmiadesarrollos.com.ar/" target="_blank" class="hover:opacity-70 transition-opacity text-on-surface" style="text-decoration:none" data-en="Designed by Algoritmia">Diseñado por Algoritmia</a>
    </div>
  </div>
</footer>
<a href="https://wa.me/5493415551826" target="_blank" title="WhatsApp"
   style="position:fixed;bottom:24px;right:24px;width:52px;height:52px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,.4);z-index:999;transition:transform .2s"
   onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>`;

  inject('site-navbar', navbar);

  // Marcar página activa en rojo
  setTimeout(function() {
    var curPage = window.location.pathname.split('/').pop() || '';
    if (curPage === 'index.html' || curPage === '') curPage = '/';
    else curPage = curPage.replace('.html', '');

    var navLinks = document.querySelectorAll('#site-navbar .nav-link');
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === curPage || (curPage === '/' && href === 'index.html')) {
        link.classList.add('text-signal-red', 'font-bold');
        link.classList.add('border-b-2', 'border-signal-red', 'pb-1');
      }
    });

    // Marcar en móvil también
    var mobileLinks = document.querySelectorAll('#mobileDrawer nav > a');
    mobileLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === curPage || (curPage === '/' && href === 'index.html')) {
        link.classList.add('text-signal-red', 'font-bold');
      }
    });
  }, 50);
  inject('site-footer', footer);

  window.openMobileMenu = function () {
    document.getElementById('mobileDrawer').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  window.closeMobileMenu = function () {
    document.getElementById('mobileDrawer').classList.add('hidden');
    document.body.style.overflow = '';
  };
  window.toggleMobileSubmenu = function (id, iconId) {
    var el = document.getElementById(id);
    var icon = document.getElementById(iconId);
    var isHidden = el.classList.contains('hidden');
    el.classList.toggle('hidden');
    if (icon) icon.textContent = isHidden ? '−' : '+';
  };

})();
