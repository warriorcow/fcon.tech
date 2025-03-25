export const initScrollUp = (): void => {
  const el: HTMLDivElement | null = document.querySelector('.scroll-up');

  function setVisibility() {
    if (window.scrollY < 100 && el) {
      el.classList.remove('visible');
    } else if (el) {
      el.classList.add('visible');
    }
  }

  window.addEventListener('scroll', function () {
    setVisibility();
  });

  el?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  setVisibility();
}
