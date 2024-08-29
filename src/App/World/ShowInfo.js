import App from "../App"
import * as THREE from 'three'
import ModalManager from "../UI/ModalManager"
export default class ShowInfo{
    constructor(meshEhsan, modalInfo){
        this.app = new App()
        this.mesh = meshEhsan
     
        this.modalInfo = modalInfo
      
        this.modalManager =new ModalManager()
        // console.log(modalInfo)
    }
    loop(){
        this.character = this.app.world.character.instance
        if(this.character){
            let near = null
            const portalPosition = new THREE.Vector3()
            this.mesh.getWorldPosition(portalPosition)
            const distance = this.character.position.distanceTo(portalPosition)
            if(this.mesh.name == 'Arg'){
                near = distance < 30
            }
            else if(this.mesh.name == 'Meidan_Saat'){
                near = distance < 30
            }
            else if(this.mesh.name == 'Yangin'){
                near = distance< 11
            }
            else{
                near = distance< 18
            }

            // console.log(this.character.position)

            
            if(near){
                this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description)
            }
        }
    }
}