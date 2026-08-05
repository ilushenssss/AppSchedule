"use strict";

const STORAGE_PREFIX = 'floater-notes-';
const CLASS_SUFFIXES = ['', '2', '3', '4', '5', '6', '7'];
const ORDINAL_SUFFIXES = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PRIORITY_CLASSES = { '1': 'urgently', '2': 'undesirable', '3': 'delay' };

function pad(value) {
    return String(value).padStart(2, '0');
}

function getWeekdayName(date) {
    return WEEKDAY_NAMES[date.getDay()];
}

function formatDateKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function currentTime() {
    const time = new Date();
    return `${pad(time.getHours())}:${pad(time.getMinutes())}`;
}

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

function getWeekDates(offset) {
    return Array.from({ length: 7 }, (_, i) =>
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset * 7 + i)
    );
}

function formatWeekLabel(weekDates) {
    const start = weekDates[0];
    const end = weekDates[6];
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    const startLabel = `${MONTH_NAMES[start.getMonth()]} ${start.getDate()}`;
    const endLabel = sameMonth ? `${end.getDate()}` : `${MONTH_NAMES[end.getMonth()]} ${end.getDate()}`;
    const yearLabel = start.getFullYear() === end.getFullYear()
        ? `${end.getFullYear()}`
        : `${start.getFullYear()}/${end.getFullYear()}`;
    return `${startLabel} – ${endLabel}, ${yearLabel}`;
}

function sortTime(notesContainer) {
    const sortedNotes = Array.from(notesContainer.children).sort((a, b) =>
        a.getAttribute('date-hours').localeCompare(b.getAttribute('date-hours'))
    );
    sortedNotes.forEach((noteEl) => notesContainer.appendChild(noteEl));
}

function loadNotes(dateKey) {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_PREFIX + dateKey)) || [];
    } catch (error) {
        return [];
    }
}

function saveNotes(dateKey, notesContainer) {
    const notes = Array.from(notesContainer.children).map((noteEl) => ({
        title: noteEl.querySelector('#noteTitleInput').value,
        text: noteEl.querySelector('#noteTextInput').value,
        time: noteEl.getAttribute('date-hours'),
        priority: noteEl.querySelector('#priorityInput').value,
        done: noteEl.classList.contains('noteDone'),
    }));
    localStorage.setItem(STORAGE_PREFIX + dateKey, JSON.stringify(notes));
}

function createNote(dateKey, notesContainer, savedNote) {
    const time = savedNote ? savedNote.time : currentTime();

    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.setAttribute('date-hours', time);
    noteEl.innerHTML = `
    <div class="noteHeader">
        <div class="noteTitleWrap">
            <p id="noteTitle" class="hidden"></p>
            <textarea required id="noteTitleInput" maxlength="20" placeholder="Task"></textarea>
        </div>
        <div class="noteActions">
            <button class="noteEdit hidden" type="button" title="Edit task"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="noteDelete" type="button" title="Delete task"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>

    <div class="noteMainText">
        <p id="noteDate" class="hidden">${time}</p>
        <input id="dateInput" type="time" value="${time}">
        <p id="noteText" class="hidden"></p>
        <textarea id="noteTextInput" placeholder="Materials/location"></textarea>
        <select id="priorityInput">
            <option value="1">Urgent</option>
            <option value="2">Should not be delayed</option>
            <option value="3">Can be postponed</option>
        </select>
    </div>
    <button class="noteSave" type="button" disabled title="Save this task">
        <i class="fa-regular fa-floppy-disk"></i><span>Save Task</span>
    </button>
    <button id="inputMade" class="noteMarkMade hidden" type="button" disabled title="Mark task as done">
        <i class="fa-solid fa-check"></i><span>Mark as Done</span>
    </button>
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

    const persist = () => saveNotes(dateKey, notesContainer);

    function refreshSaveState() {
        const titleValid = titleInput.value.trim().length > 0;
        const textValid = textInput.value.split('\n').length <= 5;
        noteSave.disabled = !(titleValid && textValid);
    }

    function enterEditMode() {
        titleEl.classList.add('hidden');
        textEl.classList.add('hidden');
        titleInput.classList.remove('hidden');
        textInput.classList.remove('hidden');
        dateInput.classList.remove('hidden');
        noteDate.classList.add('hidden');
        priorityInput.classList.remove('hidden');

        editBtn.classList.add('hidden');
        inputMade.classList.add('hidden');
        noteSave.classList.remove('hidden');
        refreshSaveState();

        noteEl.removeAttribute('style');
    }

    function commitNote() {
        noteEl.classList.remove('urgently', 'undesirable', 'delay');
        noteEl.classList.add(PRIORITY_CLASSES[priorityInput.value]);

        titleEl.classList.remove('hidden');
        textEl.classList.remove('hidden');
        titleInput.classList.add('hidden');
        textInput.classList.add('hidden');
        dateInput.classList.add('hidden');
        noteDate.classList.remove('hidden');
        priorityInput.classList.add('hidden');

        editBtn.classList.remove('hidden');
        noteSave.classList.add('hidden');
        inputMade.classList.remove('hidden');
        inputMade.disabled = false;

        sortTime(notesContainer);

        const targetHeight = textEl.offsetHeight;
        noteEl.style.height = targetHeight + 150 + 'px';
    }

    function markDone() {
        noteEl.classList.add('noteDone');
        editBtn.disabled = true;
        inputMade.disabled = true;
    }

    editBtn.addEventListener('click', enterEditMode);

    deleteBtn.addEventListener('click', () => {
        noteEl.remove();
        persist();
    });

    titleInput.addEventListener('input', (e) => {
        titleEl.innerText = e.target.value;
        refreshSaveState();
    });

    let descriptionWithinLimit = true;
    textInput.addEventListener('input', (e) => {
        textEl.innerText = e.target.value;
        const withinLimit = e.target.value.split('\n').length <= 5;
        if (!withinLimit && descriptionWithinLimit) {
            alert('Description is too long (max 5 lines)');
        }
        descriptionWithinLimit = withinLimit;
        refreshSaveState();
    });

    dateInput.addEventListener('input', (e) => {
        noteDate.innerText = e.target.value;
        noteEl.setAttribute('date-hours', e.target.value);
    });

    inputMade.addEventListener('click', () => {
        markDone();
        persist();
    });

    noteSave.addEventListener('click', () => {
        commitNote();
        persist();
    });

    notesContainer.appendChild(noteEl);

    if (savedNote) {
        titleInput.value = savedNote.title;
        textInput.value = savedNote.text;
        titleEl.innerText = savedNote.title;
        textEl.innerText = savedNote.text;
        priorityInput.value = savedNote.priority;
        dateInput.value = savedNote.time;
        noteDate.innerText = savedNote.time;

        commitNote();
        if (savedNote.done) {
            markDone();
        }
    }

    return noteEl;
}

const columns = CLASS_SUFFIXES.map((suffix, index) => ({
    nameEl: document.querySelector(`.day${ORDINAL_SUFFIXES[index]}Name`),
    notesContainer: document.querySelector(`.notes${suffix}`),
    addBtn: document.querySelector(`.noteAdd${suffix}`),
    dateKey: '',
}));

const weekLabelEl = document.querySelector('#weekLabel');
const prevWeekBtn = document.querySelector('#prevWeek');
const nextWeekBtn = document.querySelector('#nextWeek');
const todayWeekBtn = document.querySelector('#todayWeek');

let weekOffset = 0;

function renderWeek() {
    const weekDates = getWeekDates(weekOffset);

    columns.forEach((column, index) => {
        const date = weekDates[index];
        column.dateKey = formatDateKey(date);
        column.nameEl.innerHTML = `${getWeekdayName(date)} ${date.getDate()}.${date.getMonth() + 1}`;
        column.notesContainer.innerHTML = '';
        loadNotes(column.dateKey).forEach((savedNote) => {
            createNote(column.dateKey, column.notesContainer, savedNote);
        });
    });

    weekLabelEl.textContent = formatWeekLabel(weekDates);
    todayWeekBtn.disabled = weekOffset === 0;
}

columns.forEach((column) => {
    column.addBtn.addEventListener('click', () => {
        createNote(column.dateKey, column.notesContainer);
    });
});

prevWeekBtn.addEventListener('click', () => {
    weekOffset -= 1;
    renderWeek();
});

nextWeekBtn.addEventListener('click', () => {
    weekOffset += 1;
    renderWeek();
});

todayWeekBtn.addEventListener('click', () => {
    weekOffset = 0;
    renderWeek();
});

renderWeek();
