"use strict";

let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDate();
let dayWeek = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
    let min = minutes;
    minutes = `0${min}`
}

const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.noteAdd');

const notesEl2 = document.querySelector('.notes2');
const addBtn2 = document.querySelector('.noteAdd2');

const notesEl3 = document.querySelector('.notes3');
const addBtn3 = document.querySelector('.noteAdd3');

const notesEl4 = document.querySelector('.notes4');
const addBtn4 = document.querySelector('.noteAdd4');

const notesEl5 = document.querySelector('.notes5');
const addBtn5 = document.querySelector('.noteAdd5');

const notesEl6 = document.querySelector('.notes6');
const addBtn6 = document.querySelector('.noteAdd6');

const notesEl7 = document.querySelector('.notes7');
const addBtn7 = document.querySelector('.noteAdd7');

function createNote(title, text) {
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.setAttribute('date-hours', `${hours}:${minutes}`);
    noteEl.innerHTML = `
    <div class="noteHeader">
        <div>
            <p id="noteTitle">${title}</p>
            <textarea id="noteTitleInput" class="hidden">${title}</textarea>
        </div>
        <div class="noteActions">
            <div>
                <button class="noteEdit"><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
            <div>
                <button class="noteDelete"><i class="fa-regular fa-trash-can"></i></button>
            </div>
            <div>
                <button class="noteSave" type="button"><i class="fa-regular fa-floppy-disk"></i></button>
            </div>
        </div>
    </div>

    <div class="noteMainText">
        <p id="noteDate">${hours}:${minutes}</p>
        <input id="dateInput" type="time" class="hidden"></input>
        <p id="noteText">${text}</p>
        <textarea id="noteTextInput" class="hidden" placeholder="Место/материалы">${text}</textarea>
            <select id="priorityInput" class="hidden">
                <option value=1>Неотложно</option>
                <option value=2>Нежелательно откладывать</option>
                <option value=3>Можно отложить</option>
            </select>
    </div>
        <button id="inputMade" class="noteMarkMade" type="button"><i class="fa-solid fa-check"></i></button>    
    `;

    const editBtn = noteEl.querySelector('.noteEdit');
    const deleteBtn = noteEl.querySelector('.noteDelete');
    const noteSave = noteEl.querySelector('.noteSave');
    const titleEl = noteEl.querySelector('#noteTitle');
    const textEl = noteEl.querySelector('#noteText');
    const titleInput = noteEl.querySelector('#noteTitleInput');
    const textInput = noteEl.querySelector('#noteTextInput');
    const dateInput = noteEl.querySelector('#dateInput');
    const noteDate = noteEl.querySelector('#noteDate');
    const priorityInput = noteEl.querySelector('#priorityInput');
    const inputMade = noteEl.querySelector('#inputMade');

    editBtn.addEventListener('click', (e) => {
        titleEl.classList.toggle('hidden');
        textEl.classList.toggle('hidden');
        titleInput.classList.toggle('hidden');
        textInput.classList.toggle('hidden');
        dateInput.classList.toggle('hidden');
        noteDate.classList.toggle('hidden');
        priorityInput.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', (e) => {
        noteEl.remove();
    });

    titleInput.addEventListener('input', (e) => {
        titleEl.innerText = e.target.value;
    });

    textInput.addEventListener('input', (e) => {
        textEl.innerText = e.target.value;
    });

    dateInput.addEventListener('input', (e) => {
        noteDate.innerText = e.target.value;
        noteEl.setAttribute('date-hours', e.target.value);
    });

    inputMade.addEventListener('click', (e) => {
        noteEl.classList.add('noteDone');
        editBtn.disabled = true;
        deleteBtn.disabled = true;
        noteSave.disabled = true;
        inputMade.disabled = true;
    });

    noteSave.addEventListener('click', (e) => {
        if (priorityInput.value == 1) {
            noteEl.classList.remove('undesirable');
            noteEl.classList.remove('delay');
            noteEl.classList.add('urgently');
        } else if (priorityInput.value == 2) {
            noteEl.classList.remove('delay');
            noteEl.classList.remove('urgently');
            noteEl.classList.add('undesirable');
        } else if (priorityInput.value == 3) {
            noteEl.classList.remove('urgently');
            noteEl.classList.remove('undesirable');
            noteEl.classList.add('delay');
        }
        titleEl.classList.toggle('hidden');
        textEl.classList.toggle('hidden');
        titleInput.classList.toggle('hidden');
        textInput.classList.toggle('hidden');
        dateInput.classList.toggle('hidden');
        noteDate.classList.toggle('hidden');
        priorityInput.classList.toggle('hidden');
    })

    return noteEl;
}

addBtn.addEventListener('click', (e) => {
    const el = createNote('Задача', 'Материалы/место');
    notesEl.appendChild(el);
});

addBtn2.addEventListener('click', (e) => {
    const el = createNote('Задача', 'Материалы/место');
    notesEl2.appendChild(el);
});

addBtn3.addEventListener('click', (e) => {
    const el = createNote('Задача', 'Материалы/место');
    notesEl3.appendChild(el);
});

addBtn4.addEventListener('click', (e) => {
    const el = createNote('Задача', 'Материалы/место');
    notesEl4.appendChild(el);
});

addBtn5.addEventListener('click', (e) => {
    const el = createNote('Задача', 'Материалы/место');
    notesEl5.appendChild(el);
});

addBtn6.addEventListener('click', (e) => {
    const el = createNote('Задача', 'Материалы/место');
    notesEl6.appendChild(el);
});

addBtn7.addEventListener('click', (e) => {
    const el = createNote('Задача', 'Материалы/место');
    notesEl7.appendChild(el);
});