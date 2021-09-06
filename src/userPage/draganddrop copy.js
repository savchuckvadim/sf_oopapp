import {
    getFromStorage
} from "../utils";
import {
    userLoader
} from "./userLoader";


export class DragAndDrop {

    constructor(userPage) {
        this.userPage = userPage
        this.content = userPage.content
        this.dragItems = this.content.querySelectorAll(`.dragItem--${this.userPage.userId}`); //искать элементы в текущем контексте
        this.dropZones = this.content.querySelectorAll(`.dropZone--${this.userPage.userId}`);

        this.draggedItem = null;
        this.droppedItem = null;
        this.object = this
    }

    startDragAndDrop() {
        this.dragItems.forEach((dragItem) => {
            dragItem.addEventListener("dragstart", (event) => {
                handlerDragStart(event, dragItem, this.draggedItem)
                // dragItem.classList.add('dragItem--active')
                // draggedItem = dragItem
            });
            dragItem.addEventListener("dragEnd", (event) => {

                handlerDragEnd(dragItem, this.draggedItem)
            });
            dragItem.addEventListener("drag", (event) => {
                handlerDrag(event)
            });

            dragItem.addEventListener('dragenter', (event, dragItem) => {

                if (this.draggedItem !== this.droppedItem) {
                    this.droppedItem = dragItem;
                }

            })
            dragItem.addEventListener('dragleave', (event) => {
                this.droppedItem = null;
            })
        });


        this.dropZones.forEach((dropZone) => {
            dropZone.addEventListener("dragenter", (e) => {
                handlerDragEnter(e, dropZone)
            });
            dropZone.addEventListener("dragleave", () => {
                handlerDragleave(dropZone)
            });
            dropZone.addEventListener("dragover", (e) => {
                handlerDragover(e)
            });
            dropZone.addEventListener("drop", (e) => {
                e.preventDefault()
                handlerDrop(e, dropZone, this.object)
            });
        });
    }




}

function handlerDragStart(event, dragItem, draggedItem) {
    // event.preventDefault()
    //  event.dataTransfer.setData('dragItem', this.dataset.item)
    dragItem.classList.add('dragItem--active')
    draggedItem = dragItem;


}

function handlerDragEnd(dragItem, draggedItem) {
   
    dragItem.classList.remove('dragItem--active')
    draggedItem = null;
    console.log(dragItem)

}

function handlerDrag(e) { //событие возникает быстро и постоянно

}

function handlerDragEnter(e, dropZone) {

    e.preventDefault();
    dropZone.classList.add('dropZone--active')

}

function handlerDragleave(dropZone) {

    dropZone.classList.remove('dropZone--active')

}

function handlerDragover(e) {
    e.preventDefault();

}


function handlerDrop(event, dropZone, obj) {

    let items = []
    if (obj.droppedItem) {
        if (obj.droppedItem.parentElement === obj.draggedItem.parentElement) {

            const children = []
            // Array.from(droppedItem.parentElement.children) //todo все drag-items данной drop-zone
            if (obj.droppedItem.parentElement.getAttribute('data-zone') == 0) {
                obj.dragItems.forEach((element) => {
                    if (element.parentElement.getAttribute('data-zone') == 0) {
                        children.push(element)
                    }
                })
            } else if (obj.droppedItem.parentElement.getAttribute('data-zone') == 1) {
                obj.dragItems.forEach((element) => {
                    if (element.parentElement.getAttribute('data-zone') == 1) {
                        children.push(element)
                    }
                })
            } else if (obj.droppedItem.parentElement.getAttribute('data-zone') == 2) {
                obj.dragItems.forEach((element) => {
                    if (element.parentElement.getAttribute('data-zone') == 2) {
                        children.push(element)
                    }
                })
            }

            const draggedIndex = children.indexOf(obj.draggedItem);
            const droppedIndex = children.indexOf(obj.droppedItem);
            if (draggedIndex > droppedIndex) {
                obj.draggedItem.parentElement.insertBefore(obj.draggedItem, obj.droppedItem)

            } else {

                obj.draggedItem.parentElement.insertBefore(obj.draggedItem, obj.droppedItem.nextElementSibling)

            }
            console.log('Общий родительский элемент')
        }
    } else {
        dropZone.append(obj.draggedItem);
    }


}
















