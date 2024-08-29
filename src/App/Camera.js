import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sizesStore } from "./Utils/Store.js";

import App from "./App.js";

export default class Camera {
  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;

    this.sizesStore = sizesStore;

    this.sizes = this.sizesStore.getState();

    this.setInstance();
    this.setControls();
    this.setResizeLister();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      1,
      600
    );
    this.instance.position.z = 10;
    this.instance.position.y = 10;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;

    // this.controls.enablePan = false;
    // this.controls.enableRotate = false;
    // this.controls.enableZoom = true;
  }

  setResizeLister() {
    this.sizesStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }

  loop() {
    this.controls.update();
    this.characterController = this.app.world.characterController?.rigidBody;
    if (this.characterController) {
      const characterPosition = this.characterController.translation();
      const characterRotation = this.characterController.rotation();

      const cameraOffset = new THREE.Vector3(0, 8, 15);
    //   const cameraOffset = new THREE.Vector3(0, 28, 35);
      cameraOffset.applyQuaternion(characterRotation);
      cameraOffset.add(characterPosition);

      const targetOffset = new THREE.Vector3(0, 6, 0);
    //   const targetOffset = new THREE.Vector3(0, 8, 0);
      targetOffset.applyQuaternion(characterRotation);
      targetOffset.add(characterPosition);

      this.instance.position.lerp(cameraOffset, 0.04);
      this.controls.target.lerp(targetOffset, 0.01);
    }
  }
}
