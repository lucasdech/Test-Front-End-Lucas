# Test Front Lucas

## Description

Voici mon test front pour Les mauvaises. <br>
le projet a été développé avec HTML, CSS et JavaScript.
Aucun framework Front n'a été utilisé car ce n'est pas un gros projet, le vanilla est suffisant et les frawmeworks sont a mon sens inutiles ici.

## Installation

1. Clonez le dépôt :

    ```bash
    git@github.com:lucasdech/Test-Front-End-Lucas.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd Test-Front-Lucas
    ```

3. Installez les dépendances :

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

## Custom JS

1. Affichage Lettre par lettre :

        ```javascript
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
        ```

## Gsap

 1. Installer gsap

    ```bash
    npm install gsap
    ``` 
2. Utilisation dans le projet
    
    J'ai fait le choix d'utiliser GSAP avec un SCROLLTRIGGER qui va déclencher les animations en custom js.
    avec se choix je peux lancer mes animations a l'arriver de l'utilisateur au bon endroit dans la page.

## Three.js

