"use strict";
const electron = require("electron");
const handler = {
  send(channel, value) {
    electron.ipcRenderer.send(channel, value);
  },
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    electron.ipcRenderer.on(channel, subscription);
    return () => {
      electron.ipcRenderer.removeListener(channel, subscription);
    };
  }
};
electron.contextBridge.exposeInMainWorld("ipc", handler);
