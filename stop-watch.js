const times = document.getElementById('time');
const lapsContainer = document.getElementById('laps'); // Corrected to target laps container
let count =0;

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

let hrs, mins, secs, mils;

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10); // Adjusted interval to 10ms for better accuracy
        isRunning = true;
    }
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    hrs = Math.floor(elapsedTime / (1000 * 60 * 60));
    mins = Math.floor(elapsedTime / (1000 * 60) % 60);
    secs = Math.floor(elapsedTime / 1000 % 60);
    mils = Math.floor(elapsedTime % 1000 / 10);

    hrs = String(hrs).padStart(2, "0");
    mins = String(mins).padStart(2, "0");
    secs = String(secs).padStart(2, "0");
    mils = String(mils).padStart(2, "0");

    times.textContent = `${hrs}:${mins}:${secs}:${mils}`;
}

function lap() {
    if (isRunning) {
        count++;
        let lapTime = `Lap-${count} ${hrs}:${mins}:${secs}:${mils}`;
        const lapElement = document.createElement('p');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement); // Append lap time to laps container
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = Date.now() - startTime;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    count=0;
    startTime = 0;
    elapsedTime = 0;
    times.textContent = `00:00:00:00`;
    lapsContainer.innerHTML = ''; // Clear laps display
}
