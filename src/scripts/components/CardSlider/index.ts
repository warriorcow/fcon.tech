import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export const initCardSlider = (): void => {
  if (!document.querySelector(".card-slider")) return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const container = document.querySelector(".card-slider") as HTMLElement | null;
  const slides = gsap.utils.toArray(".card-slider__item") as HTMLElement[];
  const tl = gsap.timeline();

  if (window.innerWidth < 1100) {
    const firstSlideAccordion = slides[0].querySelector('.accordion-trigger-input');

    if (firstSlideAccordion) {
      firstSlideAccordion.setAttribute('checked', 'checked');
    }

    return;
  }

  if (!container) return;
  if (slides.length === 0) return;

  ScrollTrigger.create({
    animation: tl,
    id: "st",
    trigger: container,
    start: "-250vh top",
    end: "+=" + container.clientHeight * (slides.length - 1),
    pin: container,
    scrub: true,
    snap: {
      snapTo: 1 / (slides.length - 1),
      delay: 0.01
    },
    markers: false
  });

  gsap.set(slides, {
    yPercent: () => (window.innerWidth > 768 ? 125 : 0),
    scale: 0.5,
    opacity: 0,
  });

  slides.forEach((item, i) => {
    const previousItem = slides[i - 1];

    if (previousItem) {
      tl
        .to(item, {  }, 0.5 * (i - 1))
        .to(
          item,
          { opacity: 1, yPercent: 0, xPercent: 0, scale: 1 },
          "<"
        )
        .to(previousItem, {  }, "<")
        .to(
          previousItem,
          {
            opacity: 0,
            yPercent: () => (window.innerWidth > 768 ? -125 : 0),
            scale: 0.5,
          },
          "<"
        )
        .add("our-work-" + (i + 1));
    } else {
      gsap.to(slides[i], { yPercent: 0, xPercent: 0, opacity: 1, scale: 1, duration: 0 });
      tl.add("our-work-" + (i + 1), "+=0");
    }
  });
};
