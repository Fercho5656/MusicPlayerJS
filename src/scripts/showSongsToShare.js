function showSongsToShare() {
  let songListToShare = `<ul>`

  songListToShareHTML = document.getElementById('song-list-toshare');

  songsToShare.forEach((item, i) => {
    //console.log(document.getElementById(`p-song-${item}`).innerHTML);
    var s = document.getElementById(`p-song-${item}`).innerHTML;
    songListToShare += `<li> <p>${s}</p> </li>`;
  });

  songListToShare += `</ul>`

  songListToShareHTML.innerHTML = songListToShare;

}
