const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

// Update play/pause icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip video forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle volume and speed sliders
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub through video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
sliders.forEach(slider => slider.addEventListener('input', handleRangeUpdate));
progress.addEventListener('click', scrub);
