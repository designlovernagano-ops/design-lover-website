(() => {
  'use strict';
  const header = document.getElementById('nav');
  const button = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  if (!header || !button || !links) return;
  const mobile = window.matchMedia('(max-width: 960px)');
  let open = false;

  function render() {
    button.hidden = !mobile.matches;
    links.hidden = mobile.matches && !open;
    button.setAttribute('aria-expanded', String(mobile.matches && open));
    button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }

  function closeMenu(returnFocus) {
    open = false;
    render();
    if (returnFocus) button.focus();
  }

  header.classList.add('menu-ready');
  render();

  button.addEventListener('click', () => {
    open = !open;
    render();
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (!mobile.matches) return;
      closeMenu(false);
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      closeMenu(true);
    }
  });

  document.addEventListener('click', event => {
    if (mobile.matches && open && !header.contains(event.target)) closeMenu(false);
  });

  header.addEventListener('focusout', event => {
    if (open && !header.contains(event.relatedTarget)) closeMenu(false);
  });

  mobile.addEventListener('change', () => {
    const focused = document.activeElement;
    open = false;
    render();
    if (mobile.matches && links.contains(focused)) button.focus();
    else if (!mobile.matches && focused === button) links.querySelector('a').focus();
  });
})();
