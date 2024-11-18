// Generate dummy data that changes over time
const generateDummyData = () => {
    const data = [];
    for (let t = 0; t < 20; t++) {
        const timeStep = {};
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 6; j++) {
                timeStep[`${i}_${j}`] = Math.sin(t * 0.1 + i * 0.5 + j * 0.3) * 50 + 50; // Oscillating values
            }
        }
        data.push(timeStep);
    }
    return data;
};

const data = generateDummyData();
let currentStep = 0;
let isPlaying = false;
let interval;

const gridElement = document.getElementById('grid');
const playPauseButton = document.getElementById('playPause');
const stepButton = document.getElementById('step');
const stepCounter = document.getElementById('stepCounter');

const updateGrid = () => {
    const currentData = data[currentStep];
    gridElement.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            const value = currentData[`${i}_${j}`];
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = `rgb(0, 0, ${Math.floor(value * 2.55)})`;
            cell.textContent = value.toFixed(2);
            gridElement.appendChild(cell);
        }
    }
    stepCounter.textContent = `Time Step: ${currentStep} / 19`;
};

const nextStep = () => {
    currentStep = (currentStep + 1) % 20;
    updateGrid();
};

const togglePlay = () => {
    isPlaying = !isPlaying;
    playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
    if (isPlaying) {
        interval = setInterval(nextStep, 500);
    } else {
        clearInterval(interval);
    }
};

playPauseButton.addEventListener('click', togglePlay);
stepButton.addEventListener('click', () => {
    if (isPlaying) {
        togglePlay(); // Pause if playing
    }
    nextStep();
});

updateGrid(); // Initial render
