import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.onload = () => {
    const canvasPlace = document.getElementById('canvasPlace');
    const canvas = document.getElementById('canvas');

    if (canvas && canvasPlace) {
        canvas.width = canvasPlace.clientWidth;
        canvas.height = canvasPlace.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 3.49);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);

        const loader = new GLTFLoader();

        let logoModel = null;

        loader.load('/assets/Smiley/logo.glb', function(gltf) {
            logoModel = gltf.scene;
            
            scene.add(logoModel);
        }, undefined, function(error) {
            console.error(error);
        });

        function animate() {
            requestAnimationFrame(animate);
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            logoModel.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        animate();
    } else {
        console.error("Canvas or CanvasPlace element not found");
    }
}