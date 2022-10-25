"use strict";

let sortBtn = document.querySelector('.noteSort');
let noteSort = document.querySelector('.notes');

sortBtn.addEventListener('click', (e) => {
    for (let i = 0; i < noteSort.children.length; i++) {
        for (let j = i; j < noteSort.children.length; j++) {
            if (noteSort.children[i].getAttribute('date-hours') > noteSort.children[j].getAttribute('date-hours')) {
                let replaceNode = noteSort.replaceChild(noteSort.children[j], noteSort.children[i]);
                noteSort.appendChild(replaceNode);
            }
        }
    }
});

let sortBtn2 = document.querySelector('.noteSort2');
let noteSort2 = document.querySelector('.notes2');

sortBtn2.addEventListener('click', (e) => {
    for (let i = 0; i < noteSort2.children.length; i++) {
        for (let j = i; j < noteSort2.children.length; j++) {
            if (noteSort2.children[i].getAttribute('date-hours') > noteSort2.children[j].getAttribute('date-hours')) {
                let replaceNode = noteSort2.replaceChild(noteSort2.children[j], noteSort2.children[i]);
                noteSort2.appendChild(replaceNode);
            }
        }
    }
});

let sortBtn3 = document.querySelector('.noteSort3');
let noteSort3 = document.querySelector('.notes3');

sortBtn3.addEventListener('click', (e) => {
    for (let i = 0; i < noteSort3.children.length; i++) {
        for (let j = i; j < noteSort3.children.length; j++) {
            if (noteSort3.children[i].getAttribute('date-hours') > noteSort3.children[j].getAttribute('date-hours')) {
                let replaceNode = noteSort3.replaceChild(noteSort3.children[j], noteSort3.children[i]);
                noteSort3.appendChild(replaceNode);
            }
        }
    }
});

let sortBtn4 = document.querySelector('.noteSort4');
let noteSort4 = document.querySelector('.notes4');

sortBtn4.addEventListener('click', (e) => {
    for (let i = 0; i < noteSort4.children.length; i++) {
        for (let j = i; j < noteSort4.children.length; j++) {
            if (noteSort4.children[i].getAttribute('date-hours') > noteSort4.children[j].getAttribute('date-hours')) {
                let replaceNode = noteSort4.replaceChild(noteSort4.children[j], noteSort4.children[i]);
                noteSort4.appendChild(replaceNode);
            }
        }
    }
});

let sortBtn5 = document.querySelector('.noteSort5');
let noteSort5 = document.querySelector('.notes5');

sortBtn5.addEventListener('click', (e) => {
    for (let i = 0; i < noteSort5.children.length; i++) {
        for (let j = i; j < noteSort5.children.length; j++) {
            if (noteSort5.children[i].getAttribute('date-hours') > noteSort5.children[j].getAttribute('date-hours')) {
                let replaceNode = noteSort5.replaceChild(noteSort5.children[j], noteSort5.children[i]);
                noteSort5.appendChild(replaceNode);
            }
        }
    }
});

let sortBtn6 = document.querySelector('.noteSort6');
let noteSort6 = document.querySelector('.notes6');

sortBtn6.addEventListener('click', (e) => {
    for (let i = 0; i < noteSort6.children.length; i++) {
        for (let j = i; j < noteSort6.children.length; j++) {
            if (noteSort6.children[i].getAttribute('date-hours') > noteSort6.children[j].getAttribute('date-hours')) {
                let replaceNode = noteSort6.replaceChild(noteSort6.children[j], noteSort6.children[i]);
                noteSort6.appendChild(replaceNode);
            }
        }
    }
});

let sortBtn7 = document.querySelector('.noteSort7');
let noteSort7 = document.querySelector('.notes7');

sortBtn7.addEventListener('click', (e) => {
    for (let i = 0; i < noteSort7.children.length; i++) {
        for (let j = i; j < noteSort7.children.length; j++) {
            if (noteSort7.children[i].getAttribute('date-hours') > noteSort7.children[j].getAttribute('date-hours')) {
                let replaceNode = noteSort7.replaceChild(noteSort7.children[j], noteSort7.children[i]);
                noteSort7.appendChild(replaceNode);
            }
        }
    }
});