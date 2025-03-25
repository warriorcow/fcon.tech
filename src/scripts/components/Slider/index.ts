import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules'

export const sliderInit = (): void => {
  const swiperEls = document.querySelectorAll('.swiper');
  swiperEls.forEach((swiperEl) => {
    if (!(swiperEl instanceof HTMLElement)) return;

    let swiper: Swiper | null = null;
    const hasDisableClass = swiperEl.classList.contains('swiper--disable-desktop');
    const showMoreEnabled = swiperEl.classList.contains('swiper--disable-desktop');
    const slides = swiperEl.querySelectorAll('.swiper-slide');
    let visibleSlides = 3;
    let totalSlides = 0;
    let showMoreButton: HTMLElement | null = null;

    slides.forEach((slide, index) => {
      const slideElement = slide as HTMLElement;
      const firstChild = slideElement.firstElementChild;

      if (firstChild) {
        firstChild.setAttribute('data-aos', 'fade-up');
        firstChild.setAttribute('data-aos-delay', `${index * 200}`);
      }
    });

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
              slideEl.style.opacity = '0'; // Сначала делаем элемент невидимым

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
        // Reset show more state if was active
        if (showMoreEnabled) {
          resetShowMore();
        }

        if (!swiper) {
          const slidesPerView = Number(swiperEl.dataset.slidesPerView) || 3;

          swiper = new Swiper(swiperEl, {
            modules: [Pagination, Navigation],
            slidesPerView: 1.2,
            speed: 400,
            spaceBetween: 20,
            pagination: {
              el: swiperEl.querySelector('.swiper-pagination') as HTMLElement,
            },
            navigation: {
              nextEl: `.${Array.from(swiperEl.classList).find(className => className.startsWith('swiper-element'))}__next`,
              prevEl: `.${Array.from(swiperEl.classList).find(className => className.startsWith('swiper-element'))}__prev`
            },
            breakpoints: {
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1100: {
                slidesPerView,
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
        // Initialize show more functionality
        if (showMoreEnabled) {
          initShowMore();
        }
      }
    };

    initSwiper();
    window.addEventListener('resize', initSwiper);
  });
};
