'use strict';

const chokidar = require('chokidar');
const { ipcMain } = require('electron');
const path = require('path');

const db = require('./db');
let watcher;

function watch(watchDir) {
  if (watcher) {
    watcher.close();
  }

  db.put('watchDir', watchDir, err => {
    if (err) {
      throw err;
    }


    watcher = chokidar.watch(path.join(watchDir, '**', '*.JPG'));

    watcher.on('add', path => {
      console.log(`File ${path} has been added.`);
    });

    watcher.on('addDir', path => {
      console.log(`Directory ${path} has been added.`);
    });
  });
}

ipcMain.on('watchDir', (event, watchDir) => {
  watch(watchDir);
});

function stop() {
  if (watcher) {
    watcher.close();
    watcher = undefined;
  }
}

module.exports = {
  stop,
  watch,
};
