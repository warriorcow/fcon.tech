import '../../modernizr.js'

import AOS from "aos";

import { initHeaderMenu } from '@/components/Header'
import { marqueeLine } from '@/components/Marquee-line'
import { sliderInit } from '@/components/Slider'
import { initCallbackForm } from '@/components/Callback'
import { initInputs } from '@/components/Input'
import { initScrollUp } from '@/components/ScrollUp'
import { initCardSlider } from '@/components/CardSlider'
import { initFancybox } from '@/components/Fancybox'

initHeaderMenu();
marqueeLine();
sliderInit();
initCallbackForm();
initInputs();
initScrollUp();
initCardSlider();
initFancybox();

AOS.init({
  once: true
});

