import Swal from 'sweetalert2'
import { EmployeeItem } from '@/components/NetworkSlider/index.js'

export const createModal = (data: EmployeeItem): void => {
  const { linkedin, x_twitter, telegram } = data.socials

  const socialsHTML = `
    ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener noreferrer">
      <svg class="icon icon-linkedin" width="24" height="24" aria-hidden="true">
        <use xlink:href="#icon-linkedin"></use>
      </svg>
    </a>` : ''}
    ${x_twitter ? `<a href="${x_twitter}" target="_blank" rel="noopener noreferrer">
      <svg class="icon icon-x-twitter" width="24" height="24" aria-hidden="true">
        <use xlink:href="#icon-x-twitter"></use>
      </svg>
    </a>` : ''}
    ${telegram ? `<a href="${telegram}" target="_blank" rel="noopener noreferrer">
      <svg class="icon icon-telegram" width="24" height="24" aria-hidden="true">
        <use xlink:href="#icon-telegram"></use>
      </svg>
    </a>` : ''}
  `

  Swal.fire({
    showConfirmButton: false,
    customClass: {
      container: 'modal__overlay',
      popup: 'modal',
      htmlContainer: 'modal__container'
    },
    html: `
          <div class="modal__wrapper">
            <div class="modal__close">
              <svg class="icon icon-close" width="26" height="26" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
            <div class="modal__image">
              <img src="${data.image}" alt="${data.title}">
            </div>
            <div class="modal__content">
              <h3 class="modal__title">${data.title}</h3>
              <div class="modal__description">${data.description}</div>
              <div class="modal__socials">
                ${socialsHTML}
              </div>
            </div>
          </div>
        `
  });

  document.querySelector('.modal__close')?.addEventListener('click', () => {
    Swal.close();
  });
}


