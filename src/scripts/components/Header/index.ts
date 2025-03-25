export const initHeaderMenu = (): void => {
  const hamburger = document.querySelector('.header__hamburger');
  const menu = document.querySelector('.header__menu');
  const links = document.querySelectorAll('.header__link');
  const button: HTMLButtonElement | null = document.querySelector('.header__button');
  const body = document.body;

  if (!hamburger || !menu || !body) {
    console.error('One or more elements not found');
    return;
  }

  const toggleMenu = (): void => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('open');
    body.style.overflow = isOpen ? 'hidden' : '';
  };

  // Открытие/закрытие по клику на гамбургер
  hamburger.addEventListener('click', toggleMenu);

  // Отслеживание изменения размера окна
  const mediaQuery = window.matchMedia('(min-width: 1110px)');
  const checkScreenSize = (): void => {
    if (mediaQuery.matches) {
      menu.classList.remove('open');
      hamburger.classList.remove('open');
      body.style.overflow = ''; // Разрешаем скролл на десктопе
    }
  };

  // Вызов при загрузке и при изменении размера окна
  mediaQuery.addEventListener('change', checkScreenSize);
  checkScreenSize();

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  button?.addEventListener('click', () => {
    closeMenu();
  });

  function closeMenu() {
    menu?.classList.remove('open');
    hamburger?.classList.remove('open');
    body.style.overflow = '';
  }
};


