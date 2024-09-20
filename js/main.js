import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function animateText() {
  return new Promise((resolve) => {
    const delay = 50;
    let delayStart = 0;
    const paragraphDelay = 350;

    document.querySelectorAll("p.animated-text").forEach((elem) => {
      const letters = elem.textContent.trim().split("");
      elem.textContent = "";
      elem.style.visibility = 'visible';

      letters.forEach((letter, index) => {
        setTimeout(() => {
          elem.textContent += letter;
        }, delayStart + delay * index);
      });    

      delayStart += delay * letters.length + paragraphDelay;
    });

    setTimeout(resolve, delayStart);
  });
}

function downGoblets() {
    return new Promise((resolve) => {
        document.querySelectorAll('.gobelet img').forEach(img => img.classList.add('DownGoblet'));
        document.querySelectorAll('.gobelet span').forEach(span => span.style.opacity = '0');
        setTimeout(resolve, 500);
    });
}

function upGoblet(event) {
    const img = event.currentTarget.querySelector('img');
    const span = event.currentTarget.querySelector('span');
    
    if (img.classList.contains('DownGoblet')) {
        img.classList.remove('DownGoblet');
        img.style.transform = 'translateY(-50px)';
        span.style.opacity = '1';
    }
}

function shakeGoblets() {
    document.querySelectorAll('.gobelet').forEach(goblet => {
        goblet.classList.add('shakeGoblets');
    });
}

function moveGoblets() {
    return new Promise((resolve) => {
        const goblets = document.querySelectorAll('.gobelet');
        goblets[0].classList.add('moveLeftGoblets');
        goblets[1].classList.add('moveRightGoblets');

        // Attendre la fin de l'animation de mouvement
        setTimeout(() => {
            shakeGoblets();
            // Supprimer les classes de mouvement après la secousse
            setTimeout(() => {
                goblets.forEach(goblet => {
                    goblet.classList.remove('moveLeftGoblets', 'moveRightGoblets');
                });
                resolve();
            }, 500); // 500ms = durée de l'animation de secousse
        }, 5000); // 5000ms = 5s, la durée de l'animation de mouvement
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.gobelet').forEach(goblet => {
    goblet.addEventListener('click', upGoblet);
  });

  ScrollTrigger.create({
    trigger: '#title',
    start: 'top 80%',
    onEnter: async () => {
      await animateText();
      await downGoblets();
      await moveGoblets(); // Maintenant, on attend que moveGoblets se termine
    },
    once: true
  });
});

