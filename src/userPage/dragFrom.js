// const dragItems = document.querySelectorAll('.dragItem');
// const dropZones = document.querySelectorAll('.dropZone');
let draggedItem = null;
let droppedItem = null;

const dropZonesNames = [1, 2, 3]
const dragItemNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let allBlocks = []

class Blocks {
    constructor(number) {

        this.number = number
        this.cardDiv = document.createElement('div')
        this.cardDiv.id = `dropZone${this.number}`
        this.cardDiv.className = 'dropZone'
        this.cardDiv.setAttribute('data-zone', this.number)

     

        this.cardDiv.addEventListener("dragenter", handlerDragEnter);
        this.cardDiv.addEventListener("dragleave", handlerDragleave);
        this.cardDiv.addEventListener("dragover", handlerDragover);
        this.cardDiv.addEventListener("drop", handlerDrop);
    }
}


class Task {
    constructor(number, name) {

        this.number = number;

        this.div = document.createElement('div')
        this.div.className = 'dragItem';
        this.div.setAttribute('draggable', true)
        this.div.setAttribute('data-item', this.number)

        this.p = document.createElement('p')
        this.p.setAttribute('draggable', true)
        // this.div.appendChild(this.p)
        
        this.div.innerText = name;

        this.div.addEventListener("dragstart", handlerDragStart);
        this.div.addEventListener("dragEnd", handlerDragEnd);
        // this.div.addEventListener("drag", handlerDrag);

        this.div.addEventListener('dragenter', () => {

            if (draggedItem !== droppedItem) {
                droppedItem = this.div;
            }

        })
        this.div.addEventListener('dragleave', () => {
            droppedItem = null;
        })
       
    }
}




// createDropZones()
// createItems(allBlocks);

function handlerDragStart(event) {

    // event.dataTransfer.setData('dragItem', this.dataset.item)
    this.classList.add('dragItem--active')
    draggedItem = this;

}

function handlerDragEnd(event) {

    this.classList.remove('dragItem--active')
    draggedItem = null;
}

// function handlerDrag(e) { //событие возникает быстро и постоянно

// }







/////////////////////////////////////////////////////////////////////////////
function handlerDragEnter(e) {

    e.preventDefault();
    this.classList.add('dropZone--active')

}

function handlerDragleave() {

    this.classList.remove('dropZone--active')

}

function handlerDragover(e) {
    e.preventDefault();

}

function handlerDrop(event) {

    if (droppedItem) {
        if (droppedItem.parentElement === draggedItem.parentElement) {
            const children = Array.from(droppedItem.parentElement.children)
            const draggedIndex = children.indexOf(draggedItem);
            const droppedIndex = children.indexOf(droppedItem);
            if (draggedIndex > droppedIndex) {
                draggedItem.parentElement.insertBefore(draggedItem, droppedItem)

            } else {

                draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling)

            }
            console.log('Общий родительский элемент')
        }
    } else {
        console.log('Разный родительский элемент')

        this.append(draggedItem);
    }


}

// function createDropZones() {


//     const content = document.querySelector('#global-content')
//     dropZonesNames.forEach((element, index) => {
//         let blocks = new Blocks(element);

//         allBlocks[index] = blocks
//         content.appendChild(blocks.cardDiv)
//     })


// }

// function createItems(allBlocks) {
//     let items = []
//     for (let i = 0; i < dragItemNames.length; i++) {
//         let item = new Task(i, dragItemNames[i])
//         items[i] = item;
//         // allBlocks[0].cardDiv.appendChild(items[i].div)

//         if (i < 5) {
//             allBlocks[0].cardDiv.appendChild(items[i].div)
//         } else if (i >= 5 && i < 8) {
//             allBlocks[1].cardDiv.appendChild(items[i].div)
//         } else {
//             allBlocks[2].cardDiv.appendChild(items[i].div)

//         }
//     }
// }