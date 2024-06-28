import {Slider} from './slider.js';

document.addEventListener("DOMContentLoaded", () => {
    const previousBtn = document.querySelector(".previous");
    const nextBtn = document.querySelector(".next");
    const pages = Array.from(document.querySelectorAll(".page"));
    const slide = new Slider(previousBtn, nextBtn, pages);
    slide.init();
});