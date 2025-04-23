import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

export const sliderInit = (): void => {
  const swiperEls = document.querySelectorAll('.swiper-default');

  swiperEls.forEach((swiperEl) => {
    if (!(swiperEl instanceof HTMLElement)) return;

    const autoGenerate = swiperEl.dataset.autoGenerate === 'true';
    const hasDisableClass = swiperEl.classList.contains('swiper--disable-desktop');
    const showMoreEnabled = swiperEl.classList.contains('swiper--disable-desktop');

    let swiper: Swiper | null = null;
    let visibleSlides = 3;
    let totalSlides = 0;
    let showMoreButton: HTMLElement | null = null;

    // Флаг для отслеживания текущего размера группы
    let currentGroupSize = 0;

    const generateSlides = (groupSize: number) => {
      const wrapper = swiperEl.querySelector('.swiper-wrapper');
      if (!wrapper) return;

      const logos = Array.from(wrapper.querySelectorAll('.logos-slider__logo'));
      if (logos.length === 0) return;

      // Только если groupSize поменялся
      if (currentGroupSize === groupSize && wrapper.querySelector('.swiper-slide')) return;

      // Очистить wrapper
      wrapper.innerHTML = '';

      for (let i = 0; i < logos.length; i += groupSize) {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const innerSlide = document.createElement('div');
        innerSlide.classList.add('logos-slider__slide');

        logos.slice(i, i + groupSize).forEach((logo) => {
          innerSlide.appendChild(logo);
        });

        swiperSlide.appendChild(innerSlide);
        wrapper.appendChild(swiperSlide);
      }

      currentGroupSize = groupSize;
    };

    const initShowMore = () => {
      if (!showMoreEnabled) return;

      const slides = swiperEl.querySelectorAll('.swiper-slide');
      totalSlides = slides.length;

      slides.forEach((slide, index) => {
        const slideEl = slide as HTMLElement;
        slideEl.style.display = index < visibleSlides ? 'block' : 'none';
      });

      showMoreButton = swiperEl.querySelector('.swiper__show-more-button');
      if (showMoreButton) {
        showMoreButton.style.display = visibleSlides >= totalSlides ? 'none' : 'block';

        showMoreButton.addEventListener('click', () => {
          const previousVisibleSlides = visibleSlides;
          visibleSlides += 3;

          if (visibleSlides >= totalSlides) {
            visibleSlides = totalSlides;
            showMoreButton!.style.display = 'none';
          }

          slides.forEach((slide, index) => {
            const slideEl = slide as HTMLElement;
            if (index >= previousVisibleSlides && index < visibleSlides) {
              slideEl.style.display = 'block';
              slideEl.style.opacity = '0';

              setTimeout(() => {
                slideEl.classList.add('fade-in');
              }, (index - previousVisibleSlides) * 100);
            }
          });
        });
      }
    };

    const resetShowMore = () => {
      if (!showMoreEnabled) return;

      visibleSlides = 3;
      const slides = swiperEl.querySelectorAll('.swiper-slide');
      slides.forEach((slide) => {
        (slide as HTMLElement).style.display = 'block';
      });

      if (showMoreButton) {
        showMoreButton.style.display = 'none';
      }
    };

    const initSwiper = () => {
      const isDisabledAtDesktop = hasDisableClass && window.innerWidth >= 1100;

      if (!isDisabledAtDesktop) {
        if (showMoreEnabled) {
          resetShowMore();
        }

        if (!swiper) {
          const isSingle = swiperEl.dataset.isSingle === 'true' || false;
          const slidesPerView = isSingle ? 1 : Number(swiperEl.dataset.slidesPerView) || 3;

          swiper = new Swiper(swiperEl, {
            modules: [Pagination, Navigation],
            slidesPerView: isSingle ? 1 : 1.2,
            speed: 400,
            spaceBetween: 20,
            pagination: {
              el: swiperEl.querySelector('.swiper-pagination') as HTMLElement,
              clickable: true
            },
            navigation: {
              nextEl: `.${Array.from(swiperEl.classList).find(className => className.startsWith('swiper-element'))}__next`,
              prevEl: `.${Array.from(swiperEl.classList).find(className => className.startsWith('swiper-element'))}__prev`
            },
            breakpoints: {
              768: {
                slidesPerView: isSingle ? 1 : 2,
                spaceBetween: 20
              },
              1100: {
                slidesPerView: isSingle ? 1 : slidesPerView,
                spaceBetween: 30
              },
            },
          });
        }
      } else {
        if (swiper) {
          swiper.destroy(true, true);
          swiper = null;

          const wrapper = swiperEl.querySelector('.swiper-wrapper') as HTMLElement;
          if (wrapper) {
            wrapper.style.transform = '';
          }
        }

        if (showMoreEnabled) {
          initShowMore();
        }
      }
    };

    const handleResize = () => {
      if (autoGenerate) {
        const groupSize = window.innerWidth < 768 ? 9 : 10;
        generateSlides(groupSize);
      }

      // Применить анимацию к новым слайдам
      const slides = swiperEl.querySelectorAll('.swiper-slide');
      slides.forEach((slide, index) => {
        const firstChild = (slide as HTMLElement).firstElementChild;
        if (firstChild) {
          firstChild.setAttribute('data-aos', 'fade-up');
          firstChild.setAttribute('data-aos-delay', `${index * 200}`);
        }
      });

      initSwiper();
    };

    handleResize(); // первый запуск
    window.addEventListener('resize', handleResize);
  });
};
