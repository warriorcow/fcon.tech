import { createModal } from '@/components/Modal'

export interface ModalData {
  title: string;
  description: string;
  socials: {
    linkedin: string;
    x_twitter: string;
    telegram: string;
  }
  image: string;
}

export const teamSliderInit = (): void => {
  const slides = document.querySelectorAll('.team-slider .employee-card');

  slides.forEach((slide) => {
    const modalInfoRaw = (slide as HTMLElement).dataset.modal;
    if (!modalInfoRaw) return;

    const slideData: ModalData = JSON.parse(modalInfoRaw);

    console.log(slideData)

    slide.addEventListener('click', () => {
      console.log('adadad')
      createModal(slideData);
    });
  });
};

