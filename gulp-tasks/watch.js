'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const watch = require('gulp-watch');

let gulpProcesses = {};
const GULP_OTHER_CHILD_PROCESS = 'other';
const WEBPACK_DEV_SERVER_PROCESS = 'webpack.client';

function getChildProcessName(task) {
  switch (task) {
    case WEBPACK_DEV_SERVER_PROCESS: return WEBPACK_DEV_SERVER_PROCESS;
    default: return GULP_OTHER_CHILD_PROCESS;
  }
}

function spawnChild(task) {
  const { ROOT_DIR } = this.opts;
  const processName = getChildProcessName(task);

  if (gulpProcesses[processName]) {
    console.log(`Going to kill ${processName}.`);
    // Kill previous spawned process.
    gulpProcesses[processName].kill();
  }

  // `spawn` a child `gulp` process linked to the parent `stdio`
  gulpProcesses[processName] = spawn('gulp', [task], {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });

  gulpProcesses[processName].on('exit', (code, signal) => {
    if (code) {
      console.log('exit', arguments);
    }
    // If the child process was killed externally, there will
    // be a signal. If it is killed, we don't have to continue.
    if (signal) {
      return;
    }

    delete gulpProcesses[processName];
  });
}

function spawnChildren(tasks) {
  tasks.forEach(spawnChild.bind(this));
}

function getAllTasks() {
  return ['webpack.client'];
}

module.exports = function WatchGulpTask() {
  const { ROOT_DIR, SRC_DIR } = this.opts;
  const GULP_TASKS_PATH = path.join(ROOT_DIR, 'gulp-tasks');

  // Restart all tasks if `gulp` or `bower` files have changed.
  watch([
    path.join(ROOT_DIR, 'gulpfile.js'),
    path.join(GULP_TASKS_PATH, 'webpack.base.config.js')
  ], {
    ignoreInitial: true,
    events: ['change'],
    name: 'gulpfile'
  }, () => {
    spawnChildren.call(this, getAllTasks());
  });

  watch([
    path.join(GULP_TASKS_PATH, `${WEBPACK_DEV_SERVER_PROCESS}.js`)
  ], () => {
    spawnChildren.call(this, [WEBPACK_DEV_SERVER_PROCESS]);
  });

  // Copy JS files to the distribution directory except for
  // React files handled by Webpack.
  watch([
    `${SRC_DIR}/*.html`,
    path.join(GULP_TASKS_PATH, 'copy.js')
  ], () => {
    spawnChildren.call(this, ['copy']);
  });

  spawnChildren.call(this, getAllTasks());
};

module.exports.dependencies = ['copy'];
