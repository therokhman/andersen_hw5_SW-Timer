// Stopwatch
let stopwatchRunning = false;
let stopwatchStartTime = 0;
let elapsedTime = 0;
const stopwatchDisplay = document.querySelector("#stopwatch");
const startStopwatchButton = document.querySelector("#startStopwatch");
const resetStopwatchButton = document.querySelector("#resetStopwatch");

startStopwatchButton.addEventListener("click", function() {
    if (stopwatchRunning) {
        stopwatchRunning = false;
        startStopwatchButton.textContent = "Start";
    } else {
        if (!stopwatchRunning) {
            stopwatchStartTime = Date.now() - elapsedTime;
        }
        stopwatchRunning = true;
        startStopwatchButton.textContent = "Stop";
        updateStopwatch();
    }
});

resetStopwatchButton.addEventListener("click", function() {
    stopwatchRunning = false;
    startStopwatchButton.textContent = "Start";
    elapsedTime = 0;
    updateStopwatch();
});

function updateStopwatch() {
    if (stopwatchRunning) {
        elapsedTime = Date.now() - stopwatchStartTime;
    }
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    
    stopwatchDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    
    if (stopwatchRunning) {
        requestAnimationFrame(updateStopwatch);
    }
}

// Timer
let timerRunning = false;
let timerStartTime = 0;
let timerDuration = 0;
const minutesInput = document.querySelector("#minutesInput");
const secondsInput = document.querySelector("#secondsInput");
const startTimerButton = document.querySelector("#startTimer");
const resetTimerButton = document.querySelector("#resetTimer");

startTimerButton.addEventListener("click", function() {
    if (!timerRunning) {
        const minutes = parseInt(minutesInput.value);
        const seconds = parseInt(secondsInput.value);
        if ((!isNaN(minutes) && minutes > 0) || (!isNaN(seconds) && seconds > 0)) {
            const totalMinutes = isNaN(minutes) ? 0 : minutes;
            const totalSeconds = isNaN(seconds) ? 0 : seconds;
            timerDuration = (totalMinutes * 60 + totalSeconds) * 1000;
            timerStartTime = Date.now();
            timerRunning = true;
            startTimerButton.textContent = "Stop";
            updateTimer();
        }
    } else {
        timerRunning = false;
        startTimerButton.textContent = "Start";
        timerDuration -= (Date.now() - timerStartTime);
        if (timerDuration < 0) {
            timerDuration = 0;
        }
    }
});

resetTimerButton.addEventListener("click", function() {
    timerRunning = false;
    startTimerButton.textContent = "Start";
    minutesInput.value = "";
    secondsInput.value = "";
    timerDuration = 0;
    updateTimer();
});

function updateTimer() {
    if (timerRunning) {
        const remainingTime = timerDuration - (Date.now() - timerStartTime);
        if (remainingTime <= 0) {
            timerRunning = false;
            startTimerButton.textContent = "Start";
            timerDuration = 0;
        }
        const minutes = Math.max(Math.floor(remainingTime / 1000 / 60), 0);
        const seconds = Math.max(Math.floor((remainingTime / 1000) % 60), 0);
        minutesInput.value = minutes.toString();
        secondsInput.value = seconds.toString().padStart(2, '0');
        requestAnimationFrame(updateTimer);
    }
}