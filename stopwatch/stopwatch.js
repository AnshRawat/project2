// script.js
let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0);
        timer = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    lapTimes = [];
    updateTime();
}

function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        const lapList = document.getElementById("lapList");
        const lapItem = document.createElement("li");
        lapItem.textContent = formatTime(lapTime);
        lapList.appendChild(lapItem);
    }
}

function updateTime() {
    const currentTime = isRunning ? Date.now() - startTime : 0;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000).toString().slice(0, 2);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(value) {
    return value.toString().padStart(2, "0");
}
