export const initCardSlider = (): void => {
  const HEADER_GAP = 140;
  const PIN_GAP = 100;
  const STICKY_TOP = HEADER_GAP + PIN_GAP * 2;

  let scrollHandler: (() => void) | null = null;

  const setupSticky = () => {
    const cards = document.querySelectorAll('.card-slider__item') as NodeListOf<HTMLElement>;
    const triggerScrolls: (number | null)[] = [];

    scrollHandler = () => {
      cards.forEach((card, i) => {
        if (i === 0) {
          card.style.top = `${HEADER_GAP}px`;
        }

        if (i === 1) {
          card.style.top = `${HEADER_GAP + PIN_GAP}px`;
        }

        if (i > 1) {
          const prevCard = cards[i - 1];
          const currentTop = card.getBoundingClientRect().top;

          const stickyReached = currentTop <= STICKY_TOP;

          if (stickyReached) {
            if (triggerScrolls[i] == null) {
              triggerScrolls[i] = window.scrollY;
            }
          } else {
            triggerScrolls[i] = null;
          }

          if (triggerScrolls[i] != null) {
            const scrollPassed = window.scrollY - triggerScrolls[i];
            const targetTop = HEADER_GAP + PIN_GAP;

            prevCard.style.top = `${Math.max(targetTop - scrollPassed, HEADER_GAP)}px`;
            card.style.top = `${Math.max(targetTop - scrollPassed, HEADER_GAP + PIN_GAP)}px`;
          }
        }
      });
    };

    document.addEventListener('scroll', scrollHandler);
  };

  const destroySticky = () => {
    if (scrollHandler) {
      document.removeEventListener('scroll', scrollHandler);
      scrollHandler = null;
    }
  };

  const handleInit = () => {
    const isDesktop = window.innerWidth >= 1024;
    const hasSlider = document.querySelector(".card-slider");

    if (!hasSlider) return;

    destroySticky();

    if (isDesktop) {
      setupSticky();
    }
  };

  // Запуск при загрузке
  window.addEventListener('DOMContentLoaded', handleInit);

  // И при ресайзе (с debounce можно при желании)
  window.addEventListener('resize', handleInit);
};
