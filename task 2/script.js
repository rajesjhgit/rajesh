let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function formatTime(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    "." +
    String(milliseconds).padStart(2, "0")
  );
}

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(updateTime, 10); // Update every 10ms
    running = true;
  }
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  display.innerHTML = formatTime(difference);
}

function pauseTimer() {
  clearInterval(tInterval);
  running = false;
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  display.innerHTML = "00:00:00.00"; // Updated format with milliseconds
  lapList.innerHTML = "";
  lapCount = 1;
}

function addLap() {
  if (running) {
    const lapTime = document.createElement("li");
    lapTime.textContent = `Lap ${lapCount++}: ${display.textContent}`;
    lapList.appendChild(lapTime);
  }
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", addLap);
