import '../../modernizr.js'

import AOS from "aos";

import Button from '@/components/Button'
import { initHeaderMenu } from '@/components/Header'
import { marqueeLine } from '@/components/Marquee-line'
import { sliderInit } from '@/components/Slider'
import { initCallbackForm } from '@/components/Callback'
import { initInputs } from '@/components/Input'
import { initScrollUp } from '@/components/ScrollUp'
new Button()

initHeaderMenu();
marqueeLine();
sliderInit();
initCallbackForm();
initInputs();
initScrollUp();

AOS.init({
  once: true
});

