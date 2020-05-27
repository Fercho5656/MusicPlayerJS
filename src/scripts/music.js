let songs = readPropertiesFile()

let songTitle = document.getElementById('songTitle');
let songSlider = document.getElementById('songSlider');
let currentTime = document.getElementById('currentTime');
let duration = document.getElementById('duration');
let volumeSlider = document.getElementById('volumeSlider');
let actualVolume = volumeSlider.value;

let isMuted = false;
let isPaused = true

let song = new Audio();
let currentSong = 0;

//Music Control
window.onload = loadSong;

function loadSong() {
  song.src = songs[currentSong];
  let songNameSplit = songs[currentSong].split('\\')
  let absoluteName = songNameSplit[songNameSplit.length - 1]
  let nextSongNameSplit = songs[currentSong + 1 % songs.length].split('\\')
  let nextSongAbsoluteName = nextSongNameSplit[nextSongNameSplit.length - 1]
  songTitle.textContent = absoluteName
  nextSongTitle.innerHTML = "<b>Next Song: </b>" + nextSongAbsoluteName
  //songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
  //nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
  song.playbackRate = 1;
  song.volume = volumeSlider.value;
  //song.play();
  if (!isPaused) {
    song.play()
  }
  setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 100);

function updateSongSlider() {
  let c = Math.round(song.currentTime);
  songSlider.value = c;
  currentTime.textContent = convertTime(c);
  if (song.ended) {
    next();
    song.play();
  }
}

function convertTime(secs) {
  let min = Math.floor(secs / 60);
  let sec = secs % 60;
  min = (min < 10) ? "0" + min : min;
  sec = (sec < 10) ? "0" + sec : sec;
  return (min + ":" + sec);
}

function showDuration() {
  let d = Math.floor(song.duration);
  songSlider.setAttribute("max", d);
  duration.textContent = convertTime(d);
}

function playOrPauseSong(img) {
  song.playbackRate = 1;
  img.src = "images/pause.png";
  if (song.paused) {
    isPaused = false
    song.play();
    img.src = "images/pause.png";
  } else {
    isPaused = true
    song.pause();
    img.src = "images/play-button.png";
  }
}

function next() {
  currentSong = currentSong + 1 % songs.length;
  loadSong();
}

function previous() {
  currentSong--;
  currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
  loadSong();
}

function seekSong() {
  song.currentTime = songSlider.value;
  currentTime.textContent = convertTime(song.currentTime);
}

function mute() {
  isMuted = !isMuted;
  if (isMuted) {
    actualVolume = volumeSlider.value;
    volumeSlider.value = 0;
    adjustVolume();
  } else {
    volumeSlider.value = actualVolume;
    adjustVolume();
  }
  console.log(actualVolume);
}

function adjustVolume() {
  song.volume = volumeSlider.value;
}

function increasePlaybackRate() {
  songs.playbackRate += 0.5;
}

function decreasePlaybackRate() {
  songs.playbackRate -= 0.5;
}
