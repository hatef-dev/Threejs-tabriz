import App from "../App"
import * as THREE from 'three'
import ModalManager from "../UI/ModalManager"
export default class ShowInfo{
    constructor(mesh, modalInfo){
        this.app = new App()
        this.mesh = mesh
        this.modalInfo = modalInfo
        this.modalManager =new ModalManager()
        // console.log(modalInfo)
    }
    loop(){
        this.character = this.app.world.character.instance
        if(this.character){
            const portalPosition = new THREE.Vector3()
            this.mesh.getWorldPosition(portalPosition)
            const distance = this.character.position.distanceTo(portalPosition)
            console.log(distance)
            const near = distance < 30
            // console.log(this.character.position)
            if(near){
                this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description)
            }
        }
    }
}