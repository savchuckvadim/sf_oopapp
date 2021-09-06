import {
    getFromStorage
} from "../utils";
import {
    userLoader
} from "./userLoader";

// export let draggedItem = null;
// export let droppedItem = null;

// export function handlerDragStart(e, thisDiv) {

//     // e.dataTransfer.setData('dragItem', thisDiv.dataset.item)
//     thisDiv.classList.add('dragItem--active')
//     draggedItem = thisDiv;

// }

// export function handlerDragEnd(e, thisDiv) {
//     // e.preventDefault()
//     thisDiv.classList.remove('dragItem--active')
//     draggedItem = null;
// }

// // function handlerDrag(e) { //событие возникает быстро и постоянно

// // }







// /////////////////////////////////////////////////////////////////////////////
// export function handlerDragEnter(e, tasksCardsDiv) {

//     e.preventDefault();
//     tasksCardsDiv.classList.add('dropZone--active')
    
    
// }

// export function handlerDragleave(e, tasksCardsDiv) {

//     tasksCardsDiv.classList.remove('dropZone--active')
    
// }

// export function handlerDragover(e) {
//     e.preventDefault();

// }

// export function handlerDrop(e, tasksCardsDiv) {

//     if (droppedItem) {
//         if (droppedItem.parentElement === draggedItem.parentElement) {
//             const children = Array.from(droppedItem.parentElement.children)
//             const draggedIndex = children.indexOf(draggedItem);
//             const droppedIndex = children.indexOf(droppedItem);
//             if (draggedIndex > droppedIndex) {
//                 draggedItem.parentElement.insertBefore(draggedItem, droppedItem)

//             } else {

//                 draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling)

//             }
//             console.log('Общий родительский элемент')
//         }
//     } else {
//         console.log('Разный родительский элемент')

//         tasksCardsDiv.append(draggedItem);
//     }


// }
















