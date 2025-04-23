import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { Pagination, Navigation } from 'swiper/modules';
import { modalInit } from '@/components/Modal'

let swiper: Swiper | null = null;

// Тип ответа сервера
interface EmployeeItem {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
}

interface ApiResponse {
  items: EmployeeItem[];
}

// Получение выбранных фильтров
const getSelectedFilters = (): string[] => {
  return Array.from(document.querySelectorAll('.filter-checkbox__input:checked'))
    .map(input => (input as HTMLInputElement).value)
    .filter(Boolean);
};

// Запрос на сервер
const fetchEmployees = (filters: string[]) => {
  console.log(filters)
  // try {
  //   const params = new URLSearchParams();
  //   filters.forEach(filter => params.append('filters[]', filter));
  //
  //   const response = await fetch(`/your-api-endpoint?${params.toString()}`);
  //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //
  //   const data: unknown = await response.json();
  //
  //   if (
  //     typeof data === 'object' &&
  //     data !== null &&
  //     Array.isArray((data as ApiResponse).items)
  //   ) {
  //     return (data as ApiResponse).items;
  //   }
  //
  //   throw new Error('Invalid API response format');
  // } catch (error) {
  //   console.error('Fetch employees error:', error);
  //   return [];
  // }
  const mockData = [
    {
      items: [
        {
          title: 'Иванов Пётр 0',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 0',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 0',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 0',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        }
      ],
    },
    {
      items: [
        {
          title: 'Иванов Пётр 1',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 1',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 1',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 1',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        }
      ],
    },
    {
      items: [
        {
          title: 'Иванов Пётр 2',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 2',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 2',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 2',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        }
      ],
    },
    {
      items: [
        {
          title: 'Иванов Пётр 3',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 3',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 3',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 3',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        }
      ],
    },
    {
      items: [
        {
          title: 'Иванов Пётр 4',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 4',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 4',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        },
        {
          title: 'Иванов Пётр 4',
          description: 'Стратегия цифровизации, оргдизайн, бизнес и ИТ стратегия, бизнес модель.',
          subtitle: 'Технический директор',
          tags: ['Продукт', 'Стратегия', 'Процессы'],
          image: 'img/owner.png'
        }
      ],
    }
  ]

  if (filters.length === 0) {
    // Вернуть всех
    return mockData.flatMap(group => group.items);
  }

  return filters.flatMap(index => mockData[Number(index)]?.items ?? []);
};

// Генерация HTML-карточек
const renderSlides = (items: EmployeeItem[]): void => {
  const wrapper = document.querySelector('.swiper-element-network-slider .swiper-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  items.forEach(item => {
    const { title, subtitle, description, tags, image } = item;

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a class="employee-card" data-aos="fade-up">
        <div class="employee-card__image"><img src="${image}" alt="${title}"></div>
        <div class="employee-card__header">
          <div class="employee-card__title">${title}</div>
          <div class="employee-card__subtitle">${subtitle}</div>
        </div>
        <div class="employee-card__tags">
          ${tags.map(tag => `<div class="employee-card__tag">${tag}</div>`).join('')}
        </div>
        <div class="employee-card__body">
          <div class="employee-card__description">${description}</div>
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
  }, 0);
};

// Главная функция обновления слайдера
const updateSlider = ()=> {
  const filters = getSelectedFilters();
  const items = fetchEmployees(filters);
  renderSlides(items);
  initSwiper();
  modalInit();
};

// Экспортируемая функция инициализации
export const networkSliderInit = (): void => {
  updateSlider();

  document.querySelectorAll('.filter-checkbox__input').forEach(input => {
    input.addEventListener('change', updateSlider);
  });
};
