const {
  dialog,
  Menu
} = require('electron').remote

const fs = require('fs')
const path = require('path')

const {
  readdirSync,
  statSync
} = fs

const {
  join
} = path


const templateMenu = [{
  label: 'File',
  submenu: [{
      label: 'Seleccionar Carpeta',
      accelerator: 'CmdOrCtrl+F',
      click() {
        searchDirectory();
      }
    },
    {
      label: 'Seleccionar Cancion',
      accelerator: 'CmdOrCtrl+M',
      click() {
        openFile();
      }
    },
    {
      role: 'reload'
    }
  ]
}]

const mainMenu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(mainMenu)
//Scan for songs
function readPropertiesFile() {
  let content
  try {
    content = fs.readFileSync('./directory.txt', 'utf8')
  } catch (error) {
    searchDirectory()
  }
  let songs = getAllFiles(content, '.mp3')
  return songs
}

function searchDirectory() {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }).then((data) => {
    let songsPath = data.filePaths
    writeDirectory(songsPath)
    console.log(songsPath)
  })
}

function writeDirectory(directory) {
  fs.writeFile('./directory.txt', directory, function(err) {
    if (err) {
      return console.log(err)
    }
    console.log('Directory saved')
  })
  //location.reload()
}

function getAllFiles(dir, extn, files, result, regex) {
  files = files || readdirSync(dir);
  result = result || [];
  regex = regex || new RegExp(`\\${extn}$`)

  for (let i = 0; i < files.length; i++) {
    let file = join(dir, files[i]);
    if (statSync(file).isDirectory()) {
      try {
        result = getAllFiles(file, extn, readdirSync(file), result, regex);
      } catch (error) {
        continue;
      }
    } else {
      if (regex.test(file)) {
        result.push(file);
      }
    }
  }
  return result;
}
