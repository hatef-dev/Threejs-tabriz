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
    this.arr = [];
    this.loadEnvironment();
    this.intensityLights();
    // this.addLights()
    this.showInformation()
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);
    environmentScene.traverse((obj) => {
      if (obj.type == "DirectionalLight") {
        obj.visible = true
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
          // child.scale.setScalar(0.15);
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
      if (isShadowReceiver) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            obj.receiveShadow= true
          }
        });
      }
    }
  }

  intensityLights() {
    this.arr[0].intensity = 0.13;
    this.arr[1].intensity = 0.18;
    this.arr[2].intensity = 0.28;
    this.arr[3].intensity = 0.27;
    this.arr[4].intensity = 0.2;

    // this.arr[0].intensity = 0.9;
    // this.arr[1].intensity = 1.6;
    // this.arr[2].intensity = 0.2;
    // this.arr[3].intensity = 0.8;
    // this.arr[4].intensity = 0.9;
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
    const meshInfo1= this.environment.scene.getObjectByName('Arg')
    
    const meshInfo2= this.environment.scene.getObjectByName('Behnam')
    const meshInfo3= this.environment.scene.getObjectByName('Blue_Mosque')
    const meshInfo4= this.environment.scene.getObjectByName('El_Goli')
    const meshInfo5= this.environment.scene.getObjectByName('Gajar_Muesume')
    const meshInfo6= this.environment.scene.getObjectByName('Grave_Of_Poets')
    const meshInfo7= this.environment.scene.getObjectByName('Kalantar_House')
    const meshInfo8= this.environment.scene.getObjectByName('KhalatPooshan_Tower')
    const meshInfo9= this.environment.scene.getObjectByName('Khaneh_Mashrouteh')
    const meshInfo10= this.environment.scene.getObjectByName('Meidan_Saat')
    const meshInfo11= this.environment.scene.getObjectByName('Mgabare_Einali')
    const meshInfo12= this.environment.scene.getObjectByName('Rah_Ahan')
    const meshInfo13= this.environment.scene.getObjectByName('Yangin')
    const meshInfo14= this.environment.scene.getObjectByName('Sarkis_Church')
    
    const modalContentProvider = new ModalContentProvider()
    this.info1 = new ShowInfo(meshInfo1, modalContentProvider.getModalInfo('Arg'), )
    this.info2 = new ShowInfo(meshInfo2, modalContentProvider.getModalInfo('Behnam'), )
    this.info3 = new ShowInfo(meshInfo3, modalContentProvider.getModalInfo('Blue_Mosque'), )
    this.info4 = new ShowInfo(meshInfo4, modalContentProvider.getModalInfo('El_Goli'), )
    this.info5 = new ShowInfo(meshInfo5, modalContentProvider.getModalInfo('Gajar_Muesume'), )
    this.info6 = new ShowInfo(meshInfo6, modalContentProvider.getModalInfo('Grave_Of_Poets'))
    this.info7 = new ShowInfo(meshInfo7, modalContentProvider.getModalInfo('Kalantar_House'))
    this.info8 = new ShowInfo(meshInfo8, modalContentProvider.getModalInfo('KhalatPooshan_Tower'))
    this.info9 = new ShowInfo(meshInfo9, modalContentProvider.getModalInfo('Khaneh_Mashrouteh'))
    this.info10 = new ShowInfo(meshInfo10, modalContentProvider.getModalInfo('Meidan_Saat'), )
    this.info11 = new ShowInfo(meshInfo11, modalContentProvider.getModalInfo('Mgabare_Einali'))
    this.info12 = new ShowInfo(meshInfo12, modalContentProvider.getModalInfo('Rah_Ahan'))
    this.info13 = new ShowInfo(meshInfo13, modalContentProvider.getModalInfo('Yangin'), )
    this.info14 = new ShowInfo(meshInfo14, modalContentProvider.getModalInfo('Sarkis_Church'))

  }
  loop(){
    this.info1.loop()
    this.info2.loop()
    this.info3.loop()
    this.info4.loop()
    this.info5.loop()
    this.info6.loop()
    this.info7.loop()
    this.info8.loop()
    this.info9.loop()
    this.info10.loop()
    this.info11.loop()
    this.info12.loop()
    this.info13.loop()
    this.info14.loop()
    
  }
}
