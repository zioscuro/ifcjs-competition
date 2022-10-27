import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { IFCLoader } from 'web-ifc-three/IFCLoader';

export const viewerHandler = (project) => {
  const scene = new Scene();

  const size = {
    width: document.querySelector('.model-container').offsetWidth,
    height: document.querySelector('.model-container').offsetHeight,
  };

  const camera = new PerspectiveCamera(75, size.width / size.height);
  camera.position.z = project.cameraPosition.z;
  camera.position.y = project.cameraPosition.y;
  camera.position.x = project.cameraPosition.x;

  const lightColor = 0xffffff;
  const ambientLight = new AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(lightColor, 0.5);
  directionalLight.position.set(0, 10, 0);
  scene.add(directionalLight);

  const threeCanvas = document.getElementById('model-viewer');
  const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  loadModel(scene, project);

  const controls = new OrbitControls(camera, threeCanvas);
  controls.enableDamping = true;
  controls.target.set(-2, 0, 0);

  // controlsCameraPosition(controls);

  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener('resize', () => {
    const canvas = document.querySelector('.model-container');

    size.width = canvas.offsetWidth;
    // size.height = canvas.offsetHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  });
};

const loadModel = async (scene, project) => {
  const ifcLoader = new IFCLoader();

  const ifcURL = project.ifcPath;
  const model = await ifcLoader.loadAsync(ifcURL);
  scene.add(model);
};

const controlsCameraPosition = (controls) => {
  setInterval(() => console.log(controls.object.position), 1000);
};
