const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const volumeSlider = document.querySelector('.volume');
const speedSlider = document.querySelector('.playbackSpeed');
const speedBar = document.querySelector('.speed-bar');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Toggle Play/Pause
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Volume and Speed Control
function handleRangeUpdate() {
  video[this.name] = this.value;
  if (this.name === 'playbackRate') {
    speedBar.textContent = `${this.value}×`;
  }
}

// Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
volumeSlider.addEventListener('input', handleRangeUpdate);
speedSlider.addEventListener('input', handleRangeUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
