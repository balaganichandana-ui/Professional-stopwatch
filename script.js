const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');
const lapCount = document.getElementById('lapCount');

let timer = null;
let milliseconds = 0;
let running = false;
let lapCounter = 0;

/* Update Display */

function updateDisplay(){

    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    display.innerText =
        `${String(mins).padStart(2,'0')}:` +
        `${String(secs).padStart(2,'0')}:` +
        `${String(ms).padStart(2,'0')}`;
}

/* Start Stopwatch */

function startStopwatch(){

    timer = setInterval(() => {

        milliseconds += 10;
        updateDisplay();

    },10);
}

/* Start / Pause */

startPauseBtn.addEventListener('click', () => {

    if(!running){

        startStopwatch();
        running = true;

        startPauseBtn.innerText = 'Pause';
        startPauseBtn.style.background = '#facc15';

    }
    else{

        clearInterval(timer);
        running = false;

        startPauseBtn.innerText = 'Start';
        startPauseBtn.style.background = '#06b6d4';
    }

});

/* Reset */

resetBtn.addEventListener('click', () => {

    clearInterval(timer);

    running = false;
    milliseconds = 0;
    lapCounter = 0;

    updateDisplay();

    startPauseBtn.innerText = 'Start';
    startPauseBtn.style.background = '#06b6d4';

    lapsContainer.innerHTML = `
        <div class="empty">
            No lap records yet...
        </div>
    `;

    lapCount.innerText = '0 Laps';

});

/* Lap */

lapBtn.addEventListener('click', () => {

    if(milliseconds === 0) return;

    lapCounter++;

    if(lapCounter === 1){
        lapsContainer.innerHTML = '';
    }

    const lapItem = document.createElement('div');

    lapItem.classList.add('lap-item');

    lapItem.innerHTML = `
    
        <div class="lap-info">
            <p>Lap ${lapCounter}</p>
            <p>${display.innerText}</p>
        </div>

        <div class="lap-number">
            #${lapCounter}
        </div>
    
    `;

    lapsContainer.prepend(lapItem);

    lapCount.innerText = `${lapCounter} Laps`;

});

/* Initial Display */

updateDisplay();