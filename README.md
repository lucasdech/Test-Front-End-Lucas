# Test Front Lucas

## Description

Voici mon test front pour Les mauvaises. <br>
le projet a été développé avec HTML, CSS et JavaScript.
Aucun framework Front n'a été utilisé car ce n'est pas un gros projet, le vanilla est suffisant et les frameworks sont à mon sens inutiles ici.
les animations ont été faites en custom js et lancées avec gsap.
le logo a été fait avec blender et importé sur le projet avec three.js.
chaque partie sera reprise dans une section du readme et expliquée.

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
            const delay = 50; // délai entre chaque lettre
            let delayStart = 0; // temps initial avant de lancer la première lettre
            const paragraphDelay = 350; // délai entre chaque paragraphe

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

    La fonction animateText() me permet d'afficher le texte par lettre avec un léger délai entre chaque lettre et chaque paragraphe. <br>
    Je commence par définir toutes mes constantes et mes variables. <br>
    Ensuite, je sélectionne toutes les classes "animated-text" et je supprime leur contenu. <br>
    Je mets la visibilité à visible pour pouvoir voir le résultat sans attendre la fin de l'animation. <br>
    Je split le contenu de chaque balise p en lettres.
    Je fais une boucle sur chaque lettre et affiche une à une grâce à setTimeout.
    À chaque ajout de lettre, je rajoute le délai entre chaque lettre.
    Et à chaque ajout de paragraphe, je rajoute un délai entre chaque paragraphe.
    Et enfin, je lance la fin de la promesse avec resolve.


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
    avec ce choix, je peux lancer mes animations à l'arrivée de l'utilisateur au bon endroit dans la page.

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

  GSAP est ici utilisé pour lancer toutes mes animations custom une par une et dans l'ordre,
  avec l'utilisation des promesses, je peux être sûr que l'animation précédente est terminée pour lancer la suivante.
  Toutes les animations seront donc lancées les unes après les autres au trigger de '#title'
  le once true est là pour faire en sorte que l'animation ne se relance pas comme indiqué dans la consigne, sauf au rechargement de la page  

## Three.js

1. Réalisation du logo 

le logo de la maquette Figma fourni pour le test technique a été réalisé sur blender, puis exporté en format .glb pour pouvoir l'intégrer à mon site avec THREE.js.

2. Ajout du logo sur la landing Page 

```javascript 
    const canvasPlace = document.getElementById('canvasPlace');
    const canvas = document.getElementById('canvas');
```

Je vais tout d'abord aller chercher la div qui va contenir le canvas et puis celle qui va charger et ajouter le canvas dans deux variables.


Il faut ensuite initialiser la Scene pour y placer le logo, la camera et placer cette dernière où l'on veut selon le point de vue.

```javascript
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 3.5);
```

Je charge mon fichier logo.glb et je l'ajoute a ma scène pour avoir un rendu : 

```javascript
loader.load('../assets/Smiley/logo.glb', function(gltf) {
            logoModel = gltf.scene;
            
            scene.add(logoModel);
        }, undefined, function(error) {
            console.error(error);
        });
```

pour finir j'anime le logo avec unr 'rotation.y' qui s'incremente de 0.01 et je lance ma fonction pour appeler l'animation

```javascript
    function animate() {
        requestAnimationFrame(animate);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        logoModel.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    animate();
```



