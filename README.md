# macOS app

Source: http://electron.atom.io/docs/tutorial/quick-start/

https://github.com/electron/electron-rebuild

```
App threw an error during load
Error: Module version mismatch. Expected 50, got 48.
    at Error (native)
    at process.module.(anonymous function) [as dlopen] (ELECTRON_ASAR.js:173:20)
    at Object.Module._extensions..node (module.js:583:18)
    at Object.module.(anonymous function) [as .node] (ELECTRON_ASAR.js:173:20)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.require (module.js:483:17)
    at require (internal/module.js:20:19)
    at bindings (/Users/user/macos-app/node_modules/bindings/bindings.js:76:44)
```

Persistent Storage: https://medium.com/@ccnokes/how-to-store-user-data-in-electron-3ba6bf66bc1e#.br97bq4dy
