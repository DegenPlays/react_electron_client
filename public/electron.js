const electron = require("electron");
const path = require("path");
// const url = require('url');
// const childProcess = require('child_process');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {Tray, Menu, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const Store = require('electron-store');

const store = new Store();

autoUpdater.autoDownload = false; // Disable auto download, we'll handle it manually
autoUpdater.setFeedURL({
  "provider": "github",
  "owner": "DegenPlays",
  "repo": "react_electron_client"
})

let mainWindow;
let tray;

function createWindow() {
  console.log('userData:',app.getPath('userData'));
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
   tray = new Tray(path.join(__dirname, 'logo512.png')); // Replace with the path to your icon
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
   tray.on('click', () => {
     mainWindow.show();
   });
  // Listen for the window being minimized
  mainWindow.on('minimize',  (event) => {
    event.preventDefault(); // Prevent the window from appearing in the taskbar
    // You can do something when the window is minimized
    // For example, hide the window to the system tray
    mainWindow.hide();
  });
  // Listen for the visibility change event
  // app.on('browser-window-blur', () => {
  //   // When the window loses focus (i.e., minimized or switched to another app), hide it
  //   mainWindow.hide();
  // });

  // Listen for the visibility change event
  app.on('browser-window-focus', () => {
    // When the window gains focus, show it
    mainWindow.show();
  });

  // triggerSeleniumScript();
}

// function triggerSeleniumScript() {
//   // Modify the path to your Selenium script accordingly
//   const scriptPath = path.join(__dirname, '../src/automations', 'quopi.js');

//   // Run the Selenium script as a child process
//   const seleniumProcess = childProcess.spawn('node', [scriptPath]);

//   // Handle script output
//   seleniumProcess.stdout.on('data', (data) => {
//     console.log(`Selenium Script Output: ${data}`);
//   });

//   seleniumProcess.stderr.on('data', (data) => {
//     console.error(`Selenium Script Error: ${data}`);
//   });

//   seleniumProcess.on('close', (code) => {
//     console.log(`Selenium Script exited with code ${code}`);
//   });
// }
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  // Check for updates when the app is ready
  checkForUpdates();
});

// app.on("ready", createWindow);

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
  console.log('checking for updates')
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
// Expose store to renderer process
ipcMain.handle('getStore', () => {
  return store.store;
});

// Handle the request to add an item to the store
ipcMain.handle('addItemToStore', (event, newItem) => {
  console.log('newItem:',newItem)
  // store.set(Object.keys(newItem),newItem[Object.keys(newItem)]);
  store.set(newItem);
  console.log(`${Object.keys(newItem)}:`,store.get(Object.keys(newItem)));
  console.log(`store:`,store.store);
  return store.store;
});