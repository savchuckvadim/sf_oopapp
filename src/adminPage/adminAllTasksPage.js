import admin from "../templates/admin.html"
import { users } from "../app"
import { dragAndDrop } from "../userPage/draganddrop"
import { createTasksBlocks } from "../userPage/utilsForUsers"
import { getFromStorage } from "../utils"
import {
    loadAdminPage,
    adminUserFunction
} from "./adminPage"


const globalContent = document.getElementById('global__content')
export function allTasksLoader() {
    globalContent.innerHTML = admin;
    loadAdminPage(globalContent)
    const adminForm = document.getElementById('admin-form')
    adminForm.style.display = 'none'
    const adminWrapper = document.getElementById('admin__wrapper')
    adminWrapper.innerHTML = `
    <div id="kanban__content"
                class="row d-flex justify-content-between align-items-center align-items-md-start flex-column flex-md-row">
    `
    const kanban = document.getElementById('kanban__content')
    users.forEach(element => {
        const htmlNameOfUser = document.createElement('h2')
        htmlNameOfUser.innerText = element.login
        kanban.appendChild(htmlNameOfUser);
        createTasksBlocks(element)
        dragAndDrop()
    });
    kanban.addEventListener('change', dragAndDrop) 
}
// getFromStorage('users')

