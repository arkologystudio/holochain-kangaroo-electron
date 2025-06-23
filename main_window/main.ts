// import { app, BrowserWindow, Event, ipcMain } from 'electron';
// import process from "node:process";
// import path from 'path';
// import initAgent, {
//   StateSignal,
//   STATUS_EVENT,
//   APP_PORT_EVENT,
//   LAIR_SOCKET_EVENT,
// } from '@lightningrodlabs/electron-holochain';
// import { ZomeCallSigner, ZomeCallUnsignedNapi } from 'holochain-lair-signer';
// import console from "console";

// const HAPP_FILE = "mewsfeed.happ"; // replace-me Enter the path to your happ
// const APP_ID = "main-app"; // replace-me
// const LAIR_PASSWORD = "password";
// const WINDOW_TITLE = "replace-me".toUpperCase(); //replace-me
// const NETWORK_SEED: string | undefined = undefined; // replace-me

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

// let APP_INTERFACE_PORT: number | undefined;
// let ZOME_CALL_SIGNER: ZomeCallSigner | undefined;

// const handleSignZomeCall = (e: Event, zomeCall: ZomeCallUnsignedNapi) => {
//   if(!ZOME_CALL_SIGNER) throw Error('Lair signer is not ready');
//   return ZOME_CALL_SIGNER.signZomeCall(zomeCall);
// };

// export function stateSignalToText(state: StateSignal): string {
//   switch (state) {
//     case StateSignal.IsFirstRun:
//       return 'Welcome to replace-me...';
//     case StateSignal.IsNotFirstRun:
//       return 'Loading...';
//     case StateSignal.CreatingKeys:
//       return 'Creating cryptographic keys...';
//     case StateSignal.RegisteringDna:
//       return 'Registering DNA to Holochain...';
//     case StateSignal.InstallingApp:
//       return 'Installing DNA bundle to Holochain...';
//     case StateSignal.EnablingApp:
//       return 'Enabling DNA...';
//     case StateSignal.AddingAppInterface:
//       return 'Attaching API network port...';
//   }
// }

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit()
// }

// process.on('uncaughtException', (e) => {
//   console.error('an unhandled error occurred:', e)
// })

// const setHcLauncherEnv = (window: BrowserWindow) => {
//   window.webContents.send('update-launcher-env', { 
//     APP_INTERFACE_PORT, 
//     INSTALLED_APP_ID: APP_ID,
//     FRAMEWORK: 'electron',
//   });
// };

// const createMainWindow = (): BrowserWindow => {
//   const options: Electron.BrowserWindowConstructorOptions = {
//     height: 1080,
//     width: 1920,
//     show: false,
//     title: WINDOW_TITLE,
//     backgroundColor: "#fbf9f7",
//     webPreferences: {
//       sandbox: true,
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   }

//   const mainWindow = new BrowserWindow(options)
//   if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
//     mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
//   } else {
//     mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
//   }

//   mainWindow.on('ready-to-show', () => {
//     setHcLauncherEnv(mainWindow);
//     mainWindow.show()
//   });
  
//   mainWindow.on("restore", () => {
//     setHcLauncherEnv(mainWindow);
//   });

//   return mainWindow;
// }

// const createSplashWindow = (): BrowserWindow => {
//   const splashWindow = new BrowserWindow({
//     height: 450,
//     width: 800,
//     center: true,
//     resizable: false,
//     frame: false,
//     show: false,
//     backgroundColor: "#fbf9f7",
//     webPreferences: {
//       sandbox: true,
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   })

//   // and load the splashscreen.html of the app.
//   if (SPLASHSCREEN_WINDOW_VITE_DEV_SERVER_URL) {
//     splashWindow.loadURL(SPLASHSCREEN_WINDOW_VITE_DEV_SERVER_URL);
//   } else {
//     splashWindow.loadFile(path.join(__dirname, `../renderer/${SPLASHSCREEN_WINDOW_VITE_NAME}/index.html`));
//   }

//   splashWindow.once('ready-to-show', () => {
//     splashWindow.show()
//   })

//   return splashWindow
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', async () => {
//   const splashWindow = createSplashWindow()
//   const opts = {
//     happPath: `pouch/${HAPP_FILE}`,
//     appId: APP_ID,
//     passphrase: LAIR_PASSWORD,
//     keystorePath: path.join(app.getPath('userData'), 'holochain-data/keystore'),
//     datastorePath: path.join(app.getPath('userData'), 'holochain-data/databases'),
//     network_seed: NETWORK_SEED,
//   };

//   // shutdown will be called automatically on application
//   // quit. It is just here in case you must control it manually
//   const { statusEmitter, shutdown } = await initAgent(app, opts)
//   statusEmitter.on(STATUS_EVENT, (state: StateSignal) => {
//     switch (state) {
//       case StateSignal.IsReady:
//         // important that this line comes before the next one
//         // otherwise this triggers the 'all-windows-closed'
//         // event
//         createMainWindow()
//         splashWindow.close()
//         break
//       default: {
//         splashWindow.webContents.send('update-status', stateSignalToText(state));
//       }
//     }
//   });

//   statusEmitter.on(APP_PORT_EVENT, (app_port: string) => {
//     APP_INTERFACE_PORT = parseInt(app_port);
//   });

//   statusEmitter.on(LAIR_SOCKET_EVENT, async (lair_socket_url: string) => {
//     ZOME_CALL_SIGNER = await ZomeCallSigner.connect(lair_socket_url, LAIR_PASSWORD);
//   });  

//   app.whenReady().then(() => {
//     ipcMain.handle('sign-zome-call', handleSignZomeCall);
//   });
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createMainWindow()
//   }
// })
