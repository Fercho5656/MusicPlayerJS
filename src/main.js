const electron = require('electron')
const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  Notification
} = electron

const path = require('path')
const url = require('url')
const fs = require('fs')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 1280,
    height: 1080
  })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  //const mainMenu = Menu.buildFromTemplate(templateMenu)
  //Menu.setApplicationMenu(mainMenu)

  mainWindow.on('closed', () => {
    app.quit()
  })
}

/*const templateMenu = [{
  label: 'File',
  submenu: [{
      label: 'Seleccionar Carpeta',
      accelerator: 'CmdOrCtrl+F',
      click() {
        openFolder();
      }
    },
    {
      label: 'Seleccionar Cancion',
      accelerator: 'CmdOrCtrl+M',
      click() {
        openFile();
      }
    }
  ]
}]*/

if (process.env.NODE_ENV !== 'production') {
  /*templateMenu.push({
    label: 'DevTools',
    submenu: [{
        label: 'Show/Hide Dev Tools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        },
        accelerator: 'Ctrl+D'
      },
      {
        role: 'reload'
      }
    ]
  })*/
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  })
}


app.on('ready', createWindow)

function openFile() {
  fs.readFile('./directory.txt', function read(err, data) {
    if (err) {
      console.log(err)
    }
    const content = data

    console.log(content)
  })
}
