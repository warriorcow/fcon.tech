import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { Pagination, Navigation } from 'swiper/modules';

let swiper: Swiper | null = null;

// Тип ответа сервера
export interface EmployeeItem {
  title: string;
  subtitle: string;
  preview: string;
  tags: string[];
  description: string;
  socials: {
    linkedin: string;
    x_twitter: string;
    telegram: string;
  }
  image: string;
}

interface ApiResponse {
  data: {
    ITEMS: EmployeeItem[];
    SECTIONS: string[];
  }
}

// Получение выбранных фильтров
const getSelectedFilters = (): string[] => {
  return Array.from(document.querySelectorAll('.filter-checkbox__input:checked'))
    .map(input => (input as HTMLInputElement).value)
    .filter(Boolean);
};

// Запрос на сервер
const fetchEmployees = async (filters: string[]): Promise<EmployeeItem[]> => {
  try {
    const params = new URLSearchParams();
    params.append('mode', 'ajax');
    params.append('c', 'frog:slider');
    params.append('action', 'filter');
    filters.forEach(filter => {
      const number = Number(filter);
      params.append('sectionsId[]', String(number))
    });

    const response = await fetch(`https://alekseyp.ru/bitrix/services/main/ajax.php?${params.toString()}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: ApiResponse = await response.json();

    return data.data.ITEMS;

    throw new Error('Invalid API response format');
  } catch (error) {
    console.error('Fetch employees error:', error);
    return [];
  }
};

// Генерация HTML-карточек
const renderSlides = (items: EmployeeItem[]): void => {
  const wrapper = document.querySelector('.swiper-element-network-slider .swiper-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  items.forEach(item => {
    const { title, subtitle, preview, tags, image } = item;

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a class="employee-card employee-card--no-hover" data-aos="fade-left"">
        <div class="employee-card__wrapper">
          <div class="employee-card__image"><img src="${image}" alt="${title}"></div>
          <div class="employee-card__header">
            <div class="employee-card__title">${title}</div>
            <div class="employee-card__subtitle">${subtitle}</div>
          </div>
          <div class="employee-card__tags">
            ${tags.map(tag => `<div class="employee-card__tag">${tag}</div>`).join('')}
          </div>
          <div class="employee-card__body">
            <div class="employee-card__description">${preview}</div>
          </div>
        </div>
      </a>
    `;


    wrapper.appendChild(slide);
  });
};

// Инициализация Swiper
const initSwiper = (): void => {
  const swiperEl = document.querySelector('.swiper-element-network-slider');
  if (!(swiperEl instanceof HTMLElement)) return;
  const options: SwiperOptions = {
    modules: [Pagination, Navigation],
    slidesPerView: 1.2,
    speed: 400,
    spaceBetween: 20,
    // pagination: {
    //   el: '.network-slider__pagination',
    //   clickable: true,
    // },
    navigation: {
      nextEl: '.swiper-element-network-slider__next',
      prevEl: '.swiper-element-network-slider__prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 30
      },
    },
  };

  swiper?.destroy();
  swiper = null;

  setTimeout(() => {
    swiper = new Swiper(swiperEl, options);
    swiperEl.style.opacity = '1';
  }, 0);
};

// Главная функция обновления слайдера
const updateSlider = async ()=> {
  const filters = getSelectedFilters();
  const items = await fetchEmployees(filters);

  renderSlides(items);
  initSwiper();
};

// Экспортируемая функция инициализации
export const networkSliderInit = async (): Promise<void> => {
  await updateSlider();

  document.querySelectorAll('.filter-checkbox__input').forEach(input => {
    input.addEventListener('change', updateSlider);
  });
};
