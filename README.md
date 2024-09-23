# Test Front Lucas

## Description

Voici mon test front pour Les mauvaises. <br>
le projet a été développé avec HTML, CSS et JavaScript.
Aucun framework Front n'a été utilisé car ce n'est pas un gros projet, le vanilla est suffisant et les frawmeworks sont a mon sens inutiles ici.
les animation on été faite en custom js et lancer avec gsap.
le logo a ete fait avec blender et importé sur le projet avec three.js.
chaque partie sera reprise dans une section du readme et expliqué.

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
            const delay = 50; // delay entre chaque lettre
            let delayStart = 0; // temps initial avant de lancer la premiere lettre
            const paragraphDelay = 350; // delay entre chaque paragraphe

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

    La fonction animateText() me permet d'afficher le texte par lettre avec un léger delai entre chaque lettre et chaque paragraphe. <br>
    je Commence par definir toute mes constante et mes variable. <br>
    Ensuite je selection toute les class "animated-text" et je supprimer leurs contenu. <br>
    je met la visibilité a visible pour pouvoir voir le resultat sans attendre la fin de l'animation. <br>
    je split le contenu de chaque balise p en lettre.
    je fais une boucle sur chaque lettre et affiche une a une grace a settimeout.
    a chaque ajout de lettre je rajoute le delai entre chaque lettre.
    et a chaque ajout de paragraphe je rajoute un delai entre chaque paragraphe.
    et enfin je lance la fin de la promesse avec resolve.


2. Animation des gobelets :

    ```javascript
    function moveGoblets() {
    return new Promise((resolve) => {
        const goblets = document.querySelectorAll('.gobelet');
        goblets[0].classList.add('moveLeftGoblets');
        goblets[1].classList.add('moveRightGoblets');

        setTimeout(() => {
            shakeGoblets();
            setTimeout(() => {
                goblets.forEach(goblet => {
                    goblet.classList.remove('moveLeftGoblets', 'moveRightGoblets');
                });
                resolve();
            }, 500); // 500ms = durée de l'animation de secousse
        }, 5000); // 5000ms = la durée de l'animation de mouvement
        });
        }
    ```

    La fonction moveGoblets() me permet d'animer les gobelets. <br>
    Cette fonction utilise des promesses pour gérer les animations de manière asynchrone. <br>
    Les gobelets sont déplacés vers la gauche et la droite en ajoutant des classes spécifiques qui déclenchent des animations CSS. <br>
    Après un délai de 5000ms, une animation de secousse est déclenchée pour donner l'impression que les gobelets tremblent. <br>
    Une fois l'animation de secousse terminée, les classes d'animation sont supprimées pour réinitialiser les gobelets à leur état initial. <br>
    La fonction se termine en appelant resolve() pour indiquer que toutes les animations sont terminées.

## Gsap

1. Installer gsap

    ```bash
    npm install gsap
    ``` 

2. Utilisation dans le projet
    
    J'ai fait le choix d'utiliser GSAP avec un SCROLLTRIGGER qui va déclencher les animations en custom js.
    avec se choix je peux lancer mes animations a l'arriver de l'utilisateur au bon endroit dans la page.

3. Lancement des animations avec GSAP

    ```javascript 
    ScrollTrigger.create({
    trigger: '#title',
    start: 'top 80%',
    onEnter: async () => {
      await animateText();
      await downGoblets();
      await moveGoblets();
    },
    once: true
  });
  ```

  GSAP est ici utiliser pour lancer toute mes animations custom une par une et dans l'ordre,
  avec l'utilisation des promesses je peut etre sur que l'animaiton precedente est terminer pour lancer la suivante.
  Toute les animations seront donc lancer les unes après les autres au trigger de '#tittle'
  le once true est la pour faire en sorte que l'animation ne se relance pas comme indiquer dans la consigne sauf au rechargeletn de la page  

## Three.js

1. Réalisation du logo 

le logo de la mquette figma fourni pour le test tecnhique a été réaliser sur blender, puis exporter en format .glb pour pouvoir l'integrer a mon site avec THREE.js.

2. Ajout du logo sur la landing Page 

```javascript 
    const canvasPlace = document.getElementById('canvasPlace');
    const canvas = document.getElementById('canvas');
```

je vais tout d'abord aller chercher la div qui va contenir le canvas et puis celle qui va charger et ajouterle canvas dans deux variables.


Il faut ensuite Initialiser la Scene pour y placer le logo, la camera et placer cette dernière ou l'on veux selon le point de vue.

```javascript
    const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            camera.position.set(0, 0, 3.5);
```



