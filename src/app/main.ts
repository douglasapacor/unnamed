import { app, BrowserWindow, Menu } from "electron";
import started from "electron-squirrel-startup";
import path from "path";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

if (started) app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  Menu.setApplicationMenu(null);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL)
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  else
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );

  // mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
