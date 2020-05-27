const youtubedl = require('youtube-dl');
const notifier = require('node-notifier');

gapi.load("client", loadClient);

function loadClient() {
  gapi.client.setApiKey("AIzaSyAI4ho-ncPBOaZlTh7dflIIOoOdEi5_ufs");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() {
      console.log("GAPI client loaded for API");
    }, function(err) {
      console.error('Error loading GAPI client for API', err);
    })
}

const musicSearchBar = document.getElementById('music-search-bar');
const keyboardInput = document.getElementById('keyboard-input')
const maxResults = 4;
const orderInput = 'viewCount';
const searchResults = document.getElementById('search-results');
let pageToken = '';

musicSearchBar.addEventListener('submit', e => {
  e.preventDefault();
  execute();
})

function paginate(e, obj) {
  e.preventDefault();
  pageToken = obj.getAttribute('data-id');
  execute();
}

function execute() {
  const searchString = keyboardInput.value;
  const maxResults = 4;
  const orderBy = orderInput;

  let arr_search = {
    "part": 'snippet',
    "type": 'video',
    "order": orderBy,
    "maxResults": maxResults,
    "q": searchString
  };

  if (pageToken != '') {
    arr_search.pageToken = pageToken;
  }

  return gapi.client.youtube.search.list(arr_search)
    .then(function(response) {
        const listItems = response.result.items;
        if (listItems) {
          let output = '<h4>Resultados de la Busqueda</h4><ul>';

          listItems.forEach(item => {
            const videoId = item.id.videoId;
            const videoTitle = item.snippet.title;
            output += `
              <li><a data-fancybox href="#"><img src="http://i3.ytimg.com/vi/${videoId}/default.jpg" onclick=downloadMusic("https://www.youtube.com/watch?v=${videoId}");></a><p>${videoTitle}</p></li>
            `;
          });
          output += '</ul>'

          if (response.result.prevPageToken) {
            output += `<br><a class="paginate" href="#" data-id="${response.result.prevPageToken}" onclick="paginate(event, this)">Anterior</a>`;
          }

          if (response.result.nextPageToken) {
            output += `<a href="#" class="paginate" data-id="${response.result.nextPageToken}" onclick="paginate(event, this)">Siguiente</a>`
          }

          searchResults.innerHTML = output;
        }
      },
      function(err) {
        console.error("Execute error", err);
      });
}

function downloadMusic(url) {
  console.log(`${url}`);

  let downloaded = 0;

  const video = youtubedl(`${url}`,
    ['-x', '--embed-thumbnail', '--audio-format', 'mp3', '--postprocessor-args', '"-id3v2_version 3"'], {
      start: downloaded,
      cwd: __dirname
    });
  try {
    video.on('info', function(info) {
      const outputName = info.title;

      notifier.notify(`Descarga Iniciada\n${outputName}`);

      if (fs.existsSync(outputName)) {
        downloaded = fs.statSync(outputName).size;
      }

      if (downloaded > 0) {
        notifier.notify(`Resumiendo desde: ${downloaded} \n Bytes Restantes ${info.size}`);
      }
      video.pipe(fs.createWriteStream(`${outputName}.mp3`, {
        flags: 'a'
      }))
    })

    video.on('complete', function complete(info) {
      'use strict'
      notifier.notify(`${info.title} descargado anteriormente`);
    })

    video.on('end', function() {
      notifier.notify('¡Descarga Finalizada!');
    })

  } catch (e) {
    console.error(e);
  }

}
