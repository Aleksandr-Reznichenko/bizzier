import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const swiper = new Swiper('.testimonials__swiper', {
  modules: [Navigation],
  speed: 800,
  grabCursor: true,
  resistanceRatio: 0.7,
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: '.testimonials__next',
    prevEl: '.testimonials__prev',
  },
  on: {
    init: function () {
      const currentLabel = document.querySelectorAll(
        '.testimonials__counter-current'
      );
      const totalLabel = document.querySelectorAll(
        '.testimonials__counter-total'
      );

      const current = (this.realIndex + 1).toString().padStart(2, '0');
      const total = this.slides.length.toString().padStart(2, '0');

      currentLabel.forEach(el => (el.textContent = current));
      totalLabel.forEach(el => (el.textContent = total));
    },
    slideChange: function () {
      const currentLabel = document.querySelectorAll(
        '.testimonials__counter-current'
      );
      const activeIndex = (this.realIndex + 1).toString().padStart(2, '0');
      currentLabel.forEach(el => (el.textContent = activeIndex));
    },
  },
});
