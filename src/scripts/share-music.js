const mysql = require('mysql');

/*const connection = mysql.createConnection({
  host: 'bwxurdmhorbfsloidspp-mysql.services.clever-cloud.com',
  user: 'uc8jpghznwr5pim7',
  password: 'fhcfMBVGwpFOJIlrCftT',
  database: 'bwxurdmhorbfsloidspp'
});*/

const connectionDetails = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canciones'
};


let songsToShare = [];

let btnShare = document.getElementById('btn-sharesongs');

// Almacena indice de cancion en lista
function appendSongs(chk) {
  let id = chk.id.split('-')[2];
  if (chk.checked) {
    if (!songsToShare.includes(id)) {
      songsToShare.push(id);
    }
  } else {
    if (songsToShare.includes(id)) {
      songsToShare.splice(songsToShare.indexOf(id), 1);
    }
  }
  //console.log(document.getElementById(`p-song-${id}`).innerHTML);

  if (songsToShare.length == 0) {
    btnShare.disabled = true;
  } else {
    btnShare.disabled = false;
  }

}

function showOverlay() {
  document.getElementById('submit-songs-form').style.display = "block";
}

function closeOverlay() {
  document.getElementById('submit-songs-form').style.display = 'none';
  let inputs = document.getElementsByClassName('input-submit-songs');
  inputs[0].value = "";
  inputs[1].value = "";
}

function shareSongs() {
  let playlistName = document.getElementById('playlist-name').value;
  let playlistDescription = document.getElementById('playlist-description').value;
  let idCreatedPlaylist;

  try {
    var connection = mysql.createConnection(connectionDetails);

    connection.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log(err.fatal);
        return;
      }
    });

    //Create playlist
    $queryCreatePlaylist = `INSERT INTO playlist VALUES(null, '${playlistName}', '${playlistDescription}')`;
    let queryCreatePlaylist = connection.query($queryCreatePlaylist, function(err, results, fields) {
      if (err) {
        console.log(err);
        return;
      }
      idCreatedPlaylist = results.insertId;
      console.log(`ID: ${idCreatedPlaylist}`);
      closeOverlay();
      //connection.destroy();
    });

    //Adding songs to created playlist
    //$queryInsertSongs = `INSERT INTO cancion VALUES(null, '${}', '${}', '${idCreatedPlaylist}')`;
    //let queryInsertSongs = connection.query()

  } catch (e) {
    console.log(e);
  }




  /*songsToShare.forEach((item, i) => {
    var song = document.getElementById(`p-song-${item}`);

  });*/
}
