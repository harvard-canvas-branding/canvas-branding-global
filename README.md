# canvas-branding
Top-level Canvas branding

## Building js files:

### prerequisites:
1. Make sure you have node installed (e.g. via homebrew)
2. Install uglify-js: `sudo npm install uglify-js --global`

### process:
1. Remove old global.js / global.min.js
2. `cat *.js > global.js`
3. `uglifyjs global.js > global.min.js`
