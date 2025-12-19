// navbar.js — positions the nav indicator and adds hover preview
(function(){
  'use strict';
  const nav = document.getElementById('primary-navigation');
  if (!nav) return;
  const indicator = nav.querySelector('.nav-indicator');
  const links = Array.from(nav.querySelectorAll('.nav-link'));

  function updateIndicator(target){
    if (!indicator || !target) return;
    const rect = target.getBoundingClientRect();
    const parentRect = nav.getBoundingClientRect();
    const left = rect.left - parentRect.left + nav.scrollLeft;
    indicator.style.left = left + 'px';
    indicator.style.width = rect.width + 'px';
    indicator.style.opacity = '1';
  }

  window.addEventListener('DOMContentLoaded', () => {
    const active = nav.querySelector('.nav-link[aria-current="page"]') || links[0];
    if (active && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      setTimeout(()=> updateIndicator(active), 80);
    }
  });

  links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      updateIndicator(e.currentTarget);
    });
    link.addEventListener('mouseleave', () => {
      const active = nav.querySelector('.nav-link[aria-current="page"]') || links[0];
      updateIndicator(active);
    });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=> {
      const active = nav.querySelector('.nav-link[aria-current="page"]') || links[0];
      updateIndicator(active);
    }, 120);
  });
})();
