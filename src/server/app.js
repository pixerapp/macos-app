'use strict';

const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const logger = require('./logger');
const watcher = require('./watcher');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function showApp(state) {
  if (win) {
    return;
  }

  logger.info('Initial state', { state });

  const { name } = require('../../package.json');
  const browserOptions = {
    experimentalFeatures: true,
    show: false,
    title: name,
  };
  // Create the browser window.
  win = new BrowserWindow(browserOptions);

  win.once('ready-to-show', () => {
    const { webContents } = win;
    win.show();
    // Maximize the window.
    win.maximize();
    webContents.send('initialState', state);
  });

  // And load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    watcher.stop();
  });
}

module.exports = {
  showApp,
};
