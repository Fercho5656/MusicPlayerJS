let songList = `<h4>Lista de Canciones</h4> <ul style="width: 450px; height: 710px; overflow: auto">`;
songListHTML = document.getElementById('song-list');

songs.forEach((item, i) => {
  const musicTitleArr = item.split('\\');
  const musicTitle = musicTitleArr[musicTitleArr.length - 1];
  songList += `<li class="song-list"> <input type="checkbox" id="chk-song-${i}" style="float: left; margin-top: 5px;" onclick="appendSongs(this);" > <a href="#"> <p id="p-song-${i}" onclick = "changeSong(${i});">${musicTitle}</p>`
});

songList += '</ul>';

songListHTML.innerHTML = songList;

function changeSong(songIdx) {
  currentSong = songIdx;
  loadSong();
}
