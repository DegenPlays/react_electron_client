const electron = require("electron");
const path = require("path");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {Tray, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.autoDownload = false; // Disable auto download, we'll handle it manually


let mainWindow;
let tray;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  // and load the index.html of the app.
  console.log(__dirname);
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));4
   // Create a tray icon
   tray = new Tray('./icon192.png'); // Replace with the path to your icon
   const contextMenu = Menu.buildFromTemplate([
     {
       label: 'Restore',
       click: () => {
         mainWindow.show();
       },
     },
     {
       label: 'Quit',
       click: () => {
         app.quit();
       },
     },
   ]);
   tray.setToolTip('Your App Name');
   tray.setContextMenu(contextMenu);
  // Listen for the window being minimized
  mainWindow.on('minimize',  (event) => {
    event.preventDefault(); // Prevent the window from appearing in the taskbar
    // You can do something when the window is minimized
    // For example, hide the window to the system tray
    mainWindow.hide();
  });
  // Listen for the visibility change event
  app.on('browser-window-blur', () => {
    // When the window loses focus (i.e., minimized or switched to another app), hide it
    mainWindow.hide();
  });

  // Listen for the visibility change event
  app.on('browser-window-focus', () => {
    // When the window gains focus, show it
    mainWindow.show();
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  // Check for updates when the app is ready
  checkForUpdates();
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function checkForUpdates() {
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version is available. Do you want to download the update?',
      buttons: ['Yes', 'No'],
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.downloadUpdate(); // Start downloading the update
      }
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'The update has been downloaded. Do you want to install it now?',
      buttons: ['Yes', 'No'],
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall(); // Quit and install the update
      }
    });
  });
}