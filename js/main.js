import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(ScrollTrigger,TextPlugin);

function animate_text() 
{
  let delay = 100, 
      delay_start = 0,
      paragraph_delay = 500; // Délai entre chaque paragraphe

  document.querySelectorAll("p.animated-text").forEach(function (elem, index) {
    let contents = elem.textContent.trim();
    let letters = contents.split("");
    elem.textContent = "";
    elem.style.visibility = 'visible';

    letters.forEach(function (letter, letter_index) {
      setTimeout(function () {
        elem.textContent += letter;
      }, delay_start + delay * letter_index);
    });    

    delay_start += delay * letters.length + paragraph_delay;
  });
}
animate_text();

// Gsap pour l'arrivé des text 

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.text1', {
    scrollTrigger: '.text1',
    x: 100,
    rotation: 360,
    duration: 5,
  });
});

