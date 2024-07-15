let startTime = null;
let elapsedTime = 0;
let timerInterval = null;

function updateTime() {
    const timeNow = Date.now();
    const timeDiff = timeNow - startTime;
    elapsedTime += timeDiff;
    startTime = timeNow;
    displayTime();
}

function displayTime() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    if (timerInterval) {
        return;
    }
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
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
    document.getElementById('display').textContent = '00:00:00';
}
