import * as THREE from "three";
import assetStore from "../Utils/AssetStore.js";
import App from "../App.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.pane = this.app.gui.pane;
    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    this.arr = [];
    this.loadEnvironment();
    this.intensityLights();
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);
    environmentScene.traverse((obj) => {
      if (obj.type == "DirectionalLight") {
        this.pane.addInput(obj, 'intensity',{
          min: 0,
          max:4,
          step:0.1
        })
        this.arr.push(obj);
      }
    });
    environmentScene.scale.setScalar(40);
    const physicalObjects = [
      "Grave_Of_Poets",
      "Kalantar_House",
      "KhalatPooshan_Tower",
      "Yangin",
      "Gajar_Muesume",
      "Mgabare_Einali",
      "Khaneh_Mashrouteh",
      "Sarkis_Church",
      "El_Goli",
      "Rah_Ahan",
      "Rah_Ahan_Locomotive",
      "Meidan_Saat",
      "Blue_Mosque",
      "Arg",
      "Behnam",
      "Ground",
      "Road",
    ];
    const physicalObjectsTree = ["Tree"];

    for (const child of environmentScene.children) {
      const isPhysicalObject = physicalObjects.some((keyword) =>
        child.name.includes(keyword)
      );
      if (isPhysicalObject) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            this.physics.add(obj, "fixed", "trimesh");
          }
        });
      }

      const isPhysicalObjectTree = physicalObjectsTree.some((keyword) =>
        child.name.includes(keyword)
      );
      if (isPhysicalObjectTree) {
        child.traverse((obj) => {
          child.scale.setScalar(0.15)
          if (obj.isMesh) {

            this.physics.add(obj, "fixed", "cuboid");
          }
        });
      }
    }
  }

  intensityLights() {
    // this.arr[0].intensity = 0.13;
    // this.arr[1].intensity = 0.18;
    // this.arr[2].intensity = 0.28;
    // this.arr[3].intensity = 0.27;
    // this.arr[4].intensity = 0.2;

    this.arr[0].intensity = 0.9;
    this.arr[1].intensity = 1.6;
    this.arr[2].intensity = 0.2;
    this.arr[3].intensity = 0.8;
    this.arr[4].intensity = 0.9;

  }
  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.bias = -0.002;
    this.directionalLight.shadow.normalBias = 0.072;
    this.scene.add(this.directionalLight);
  }

  addGround() {
    const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "turquoise",
    });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.groundMesh.scale.setScalar(15);
    this.groundMesh.position.y = -6;
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh, "fixed", "cuboid");
    this.groundMesh.castShadow = true;
  }
}
