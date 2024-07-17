let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let laps = [];

function updateTime() {
    const timeNow = Date.now();
    const timeDiff = timeNow - startTime;
    elapsedTime += timeDiff;
    startTime = timeNow;
    displayTime();
}

function displayTime() {
    const totalMilliseconds = elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(totalMilliseconds % 1000).padStart(3, '0');
    document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startStopwatch() {
    if (timerInterval) {
        return;
    }
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
}

function pauseStopwatch() {
    if (!timerInterval) {
        return;
    }
    clearInterval(timerInterval);
    timerInterval = null;
    updateTime();
}

function resetStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = null;
    elapsedTime = 0;
    laps = [];
    document.getElementById('display').textContent = '00:00:00.000';
    document.getElementById('laps').innerHTML = '';
}

function lapStopwatch() {
    if (!timerInterval) {
        return;
    }
    laps.push(elapsedTime);
    displayLaps();
}

function displayLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        const totalMilliseconds = lap;
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const milliseconds = String(totalMilliseconds % 1000).padStart(3, '0');
        lapElement.textContent = `Lap ${index + 1}: ${hours}:${minutes}:${seconds}.${milliseconds}`;
        lapsContainer.appendChild(lapElement);
    });
}
