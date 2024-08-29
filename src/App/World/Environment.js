import * as THREE from "three";
import assetStore from "../Utils/AssetStore.js";
import App from "../App.js";
import ShowInfo from "./ShowInfo.js";
import ModalContentProvider from '../UI/ModalContentProvider.js'
export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.pane = this.app.gui.pane;
    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    // this.arr = [];
    this.loadEnvironment();
    // this.intensityLights();
    this.addLights()
    this.showInformation()
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);
    environmentScene.traverse((obj) => {
      if (obj.type == "DirectionalLight") {
        obj.visible = false
        // this.arr.push(obj);
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
    const shadowCaster = [
      "Khaneh_Mashrouteh",
      "Sarkis_Church",
      "El_Goli",
      "Rah_Ahan",
      "Rah_Ahan_Locomotive",
      "Meidan_Saat",
      "Blue_Mosque",
      "Arg",
      "Behnam",
      "Tree"
    ];

    const ShadowRecive = [
      "Ground",
      "Road",
    ]
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
          child.scale.setScalar(0.15);
          if (obj.isMesh) {
            this.physics.add(obj, "fixed", "cuboid");
          }
        });
      }

      const isShadowCaster = shadowCaster.some((keyword) =>
        child.name.includes(keyword)
      );
      if (isShadowCaster) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow= true
          }
        });
      }

      const isShadowReceiver = ShadowRecive.some((keyword) =>
        child.name.includes(keyword)
      );
      if (isShadowCaster) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            obj.receiveShadow= true
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
    this.directionalLight.position.set(0, 1 , 100);
    this.directionalLight.castShadow = true;
    // this.directionalLight.shadow.camera = 30
    this.directionalLight.shadow.bias = 0.002;

    this.directionalLight.shadow.normalBias = 0.072;
    // this.directionalLight.shadow.camera.top = 30;
    this.scene.add(this.directionalLight);
    const  dirShadowHelper = new THREE.CameraHelper(
      this.directionalLight.shadow.camera
    )
    this.scene.add(this.directionalLight)
    this.scene.add(dirShadowHelper)
  }

  showInformation(){
    const meshInfo1= this.environment.scene.getObjectByName("El_Goli")
    const modalContentProvider = new ModalContentProvider()
    this.info1 = new ShowInfo(meshInfo1, modalContentProvider.getModalInfo('aboutMe'))
    // console.log(this.environment.scene)
  }
}
