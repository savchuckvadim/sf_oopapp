import {
    appState,
    startApp
} from "../app"
import {
    changeState
} from "../utils"

export class BtnOut {
    constructor() {

        this.outElement = document.createElement('button')
        this.outElement.addEventListener('click', () => {
            this.outAction()
        })
    }

    currentUser() {
        if (appState.currentUser.login == 'admin' && appState.currentUser.password == 'admin') {
            return true
        } else {
            return false

        }
    }
    outElementContent() {
        let parentElement
       
        if (appState.currentUser) {
            
            if (this.currentUser()) {
                parentElement = document.getElementById('admin__navbar__account')
                this.outElement.id = 'admin__btn';
                this.outElement.className = 'btn'
                this.outElement.innerHTML = `
                <img src="../img/adminPage/logout_black_24dp1.svg"
                                    alt=""> <a href="">Выход</a>
                `
                if (parentElement) parentElement.appendChild(this.outElement)

                console.log(this.currentUser())
            } else {
                
                parentElement = document.getElementById('user__header__outElement')
                console.log(parentElement)
                this.outElement.id = 'user__btn'
                this.outElement.className = 'btn__out'
                this.outElement.textContent = 'Log Out'
                if (parentElement) parentElement.appendChild(this.outElement)

            }
           
        }
    }

    outAction() {
        window.alert('btn_out')
        localStorage.removeItem('currentUser')
        changeState()
        startApp()
    }
}