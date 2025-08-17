// src/utils/initAnimations.js
import AOS from "aos";
import "aos/dist/aos.css";

export const initAnimations = () => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });
};
