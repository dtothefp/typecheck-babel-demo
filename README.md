```json
"scripts": {
  "start": "babel-node index.js",
  "compile": "webpack",
  "serve": "browser-sync start --server --ss ./dist",
  "watch": "webpack --watch --progress",
  "dev": "run-p watch serve",
  "prod": "run-s compile serve"
}
```

On Babel `6.9.0` with `typecheck` in `.babelrc` get error

```
ERROR in ./index.js
Module build failed: SyntaxError: /typecheck-demo/index.js:Invalid assignment value for "this.hasLoadedOnce".

Expected:
false

Got:
true
  19 |
  20 |   markAsLoadedOnce: function() {
> 21 |     this.hasLoadedOnce = true;
     |     ^
  22 |   },
  23 |
  24 |   /**
```
