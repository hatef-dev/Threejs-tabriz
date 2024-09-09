import * as THREE from "three";
import assetStore from "../Utils/AssetStore.js";
import App from "../App.js";
import ShowInfo from "./ShowInfo.js";
import ModalContentProvider from "../UI/ModalContentProvider.js";
import { Pane } from "tweakpane";
export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.pane = new Pane();
    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    // this.arr = [];
    this.env = null;
    this.addLights();
    this.loadEnvironment();
    // this.intensityLights();
    this.showInformation();
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);
    environmentScene.traverse((obj) => {
      if (obj.type == "DirectionalLight") {
        obj.visible = false;
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
      "Behnam_House",
      "Ground",
      "Road",
    ];
    const envTheMap = [
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
      "Behnam_House",
    ];
    const physicalObjectsTree = ["Tree", "City_Decoration"];
    const shadowCaster = [
      "Khaneh_Mashrouteh",
      "Sarkis_Church",
      "El_Goli",
      "Rah_Ahan",
      "Rah_Ahan_Locomotive",
      "Meidan_Saat",
      "Blue_Mosque",
      "Arg",
      "Behnam_House",
      "Tree",
      "City_Decoration",
    ];

    const ShadowRecive = ["Ground", "Road"];
    for (const child of environmentScene.children) {
      const isPhysicalObject = physicalObjects.some((keyword) =>
        child.name.includes(keyword)
      );
      if (isPhysicalObject) {
        child.traverse((obj) => {
          console.log(obj)
          if (obj.isMesh) {
            this.physics.add(obj, "fixed", "trimesh");
          }
        });
      }

      const envResive = envTheMap.some((keyword) =>
        child.name.includes(keyword)
      );
      if (envResive) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            obj.material.roughness = 0.3;
            obj.material.metalness = 0.09;
            // obj.material.envMap = this.env;
            // obj.material.envMapIntensity = 0.9;
            // console.log(obj.material.envMapIntensity);
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
            // console.log(obj)
            obj.castShadow = true;
          }
        });
      }

      const isShadowReceiver = ShadowRecive.some((keyword) =>
        child.name.includes(keyword)
      );
      if (isShadowReceiver) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            if (obj.name == "Ground") {
              obj.material.roughness = 0.2;
              obj.material.metalness = 0.3;
              // obj.material.color = new THREE.Color(0xffffff);
            } 

            obj.material.envMap = this.env;
            obj.receiveShadow = true;
          }
        });
      }
    }
  }

  addLights() {
    const cubeTexture = new THREE.CubeTextureLoader();
    cubeTexture.setPath("texture/cubeMap/");
    this.env = cubeTexture.load([
      "px.png",
      "nx.png",
      "py.png",
      "ny.png",
      "pz.png",
      "nz.png",
    ]);
    this.scene.background = this.env;
    this.directionalLight1 = new THREE.DirectionalLight('#acc2df', 1.2);
    this.directionalLight2 = new THREE.DirectionalLight('#efd892', 1.1);
    this.directionalLight3 = new THREE.DirectionalLight('#efd892', 1.1);
    this.directionalLight4 = new THREE.DirectionalLight('#d2c2c2', 1.4);
    this.directionalLight5 = new THREE.DirectionalLight('#bcc8c4', 3);

    this.directionalLight1.position.set(-55, 9, -82);
    this.directionalLight2.position.set(-104, 20, 0);
    this.directionalLight3.position.set(104, 20, 0);
    this.directionalLight4.position.set(0, 26, 150);
    this.directionalLight5.position.set(0, 3, 0);
    // this.pane.addInput(this.directionalLight1.position, "x", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight1.position, "y", {
    //   min: 0,
    //   max: 50,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight1.position, "z", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight1, 'intensity', {
    //   min: 0,
    //   max: 2,
    //   step: 0.01
    // })
    // const param = {
    //   light1: "#f05",
    //   light2: "#f05",
    //   light3: "#f05",
    //   light4: "#f05",
    //   light5 :"#f05",
    // };

    // this.pane.addInput(param, "light1").on("change", (e) => {
    //   this.directionalLight1.color = new THREE.Color(e.value);
    // });

    // this.pane.addInput(this.directionalLight2.position, "x", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight2.position, "y", {
    //   min: 0,
    //   max: 50,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight2.position, "z", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight2, 'intensity', {
    //   min: 0,
    //   max: 2,
    //   step: 0.01
    // })

    // this.pane.addInput(param, "light2").on("change", (e) => {
    //   this.directionalLight2.color = new THREE.Color(e.value);
    // });

    // this.pane.addInput(this.directionalLight3.position, "x", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight3.position, "y", {
    //   min: 0,
    //   max: 50,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight3.position, "z", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });

    // this.pane.addInput(this.directionalLight3, "intensity", {
    //   min: 0,
    //   max: 2,
    //   step: 0.01,
    // });
    // this.pane.addInput(param, "light3").on("change", (e) => {
    //   this.directionalLight3.color = new THREE.Color(e.value);
    // });
    // this.pane.addInput(this.directionalLight4.position, "x", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight4.position, "y", {
    //   min: 0,
    //   max: 50,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight4.position, "z", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight4, "intensity", {
    //   min: 0,
    //   max: 2,
    //   step: 0.01,
    // });

    // this.pane.addInput(param, "light4").on("change", (e) => {
    //   this.directionalLight5.color = new THREE.Color(e.value);
    // });
    // this.pane.addInput(this.directionalLight5.position, "x", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight5.position, "y", {
    //   min: 0,
    //   max: 50,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight5.position, "z", {
    //   min: -150,
    //   max: 150,
    //   step: 1,
    // });
    // this.pane.addInput(this.directionalLight5, 'intensity', {
    //   min: 0,
    //   max: 4,
    //   step: 0.01
    // })

    // this.pane.addInput(param, "light5").on("change", (e) => {
    //   this.directionalLight5.color = new THREE.Color(e.value);
    // });
    
    // this.directionalLight.rotation.set(2)
    // this.directionalLight.scale.setScalar(2)
    // this.directionalLight1.castShadow = true;
    this.directionalLight2.castShadow = true;
    // this.directionalLight3.castShadow = true;
    // this.directionalLight4.castShadow = true;
    // this.directionalLight5.castShadow = true;
    // this.directionalLight.shadowCameraLeft = -3000;
    // this.directionalLight.shadowCameraRight = 3000;
    // this.directionalLight.shadowCameraTop = 3500;
    // this.directionalLight.shadowCameraBottom = -3000;
    // this.directionalLight.shadow.bias = 0.002;

    // this.directionalLight.shadow.normalBias = 0.072;
    // this.directionalLight.shadow.camera.top = 30;
    this.scene.add(this.directionalLight1);
    this.scene.add(this.directionalLight2);
    this.scene.add(this.directionalLight3);
    this.scene.add(this.directionalLight4);
    this.scene.add(this.directionalLight5);
    // const helper1 = new THREE.DirectionalLightHelper(this.directionalLight1, 5);
    // const helper2 = new THREE.DirectionalLightHelper(this.directionalLight2, 5);
    // const helper3 = new THREE.DirectionalLightHelper(this.directionalLight3, 5);
    // const helper4 = new THREE.DirectionalLightHelper(this.directionalLight4, 5);
    // const helper5 = new THREE.DirectionalLightHelper(this.directionalLight5, 5);
    // this.scene.add(helper1);
    // this.scene.add(helper2);
    // this.scene.add(helper3);
    // this.scene.add(helper4);
    // this.scene.add(helper5);
    // // this.scene.add(this.directionalLight);

    // this.scene.add(helper)
  }

  showInformation() {
    const meshInfo1 = this.environment.scene.getObjectByName("Arg");

    const meshInfo2 = this.environment.scene.getObjectByName("Behnam_House");
    const meshInfo3 = this.environment.scene.getObjectByName("Blue_Mosque");
    const meshInfo4 = this.environment.scene.getObjectByName("El_Goli");
    const meshInfo5 = this.environment.scene.getObjectByName("Gajar_Muesume");
    const meshInfo6 = this.environment.scene.getObjectByName("Grave_Of_Poets");
    const meshInfo7 = this.environment.scene.getObjectByName("Kalantar_House");
    const meshInfo8 = this.environment.scene.getObjectByName(
      "KhalatPooshan_Tower"
    );
    const meshInfo9 =
      this.environment.scene.getObjectByName("Khaneh_Mashrouteh");
    const meshInfo10 = this.environment.scene.getObjectByName("Meidan_Saat");
    const meshInfo11 = this.environment.scene.getObjectByName("Mgabare_Einali");
    const meshInfo12 = this.environment.scene.getObjectByName("Rah_Ahan");
    const meshInfo13 = this.environment.scene.getObjectByName("Yangin");
    const meshInfo14 = this.environment.scene.getObjectByName("Sarkis_Church");

    const modalContentProvider = new ModalContentProvider();
    this.info1 = new ShowInfo(
      meshInfo1,
      modalContentProvider.getModalInfo("Arg")
    );
    this.info2 = new ShowInfo(
      meshInfo2,
      modalContentProvider.getModalInfo("Behnam_House")
    );
    this.info3 = new ShowInfo(
      meshInfo3,
      modalContentProvider.getModalInfo("Blue_Mosque")
    );
    this.info4 = new ShowInfo(
      meshInfo4,
      modalContentProvider.getModalInfo("El_Goli")
    );
    this.info5 = new ShowInfo(
      meshInfo5,
      modalContentProvider.getModalInfo("Gajar_Muesume")
    );
    this.info6 = new ShowInfo(
      meshInfo6,
      modalContentProvider.getModalInfo("Grave_Of_Poets")
    );
    this.info7 = new ShowInfo(
      meshInfo7,
      modalContentProvider.getModalInfo("Kalantar_House")
    );
    this.info8 = new ShowInfo(
      meshInfo8,
      modalContentProvider.getModalInfo("KhalatPooshan_Tower")
    );
    this.info9 = new ShowInfo(
      meshInfo9,
      modalContentProvider.getModalInfo("Khaneh_Mashrouteh")
    );
    this.info10 = new ShowInfo(
      meshInfo10,
      modalContentProvider.getModalInfo("Meidan_Saat")
    );
    this.info11 = new ShowInfo(
      meshInfo11,
      modalContentProvider.getModalInfo("Mgabare_Einali")
    );
    this.info12 = new ShowInfo(
      meshInfo12,
      modalContentProvider.getModalInfo("Rah_Ahan")
    );
    this.info13 = new ShowInfo(
      meshInfo13,
      modalContentProvider.getModalInfo("Yangin")
    );
    this.info14 = new ShowInfo(
      meshInfo14,
      modalContentProvider.getModalInfo("Sarkis_Church")
    );
  }
  loop() {
    this.info1.loop();
    this.info2.loop();
    this.info3.loop();
    this.info4.loop();
    this.info5.loop();
    this.info6.loop();
    this.info7.loop();
    this.info8.loop();
    this.info9.loop();
    this.info10.loop();
    this.info11.loop();
    this.info12.loop();
    this.info13.loop();
    this.info14.loop();
  }
}
