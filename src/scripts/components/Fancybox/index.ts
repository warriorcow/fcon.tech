import { Fancybox } from "@fancyapps/ui";

export const initFancybox = (): void => {
  Fancybox.bind('[data-fancybox]', {
    Images: {
      zoom: false
    },
  })
}
