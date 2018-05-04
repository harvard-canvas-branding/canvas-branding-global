# canvas-branding
Top-level Canvas branding files.

## Manually building js/css files:

### prerequisites:
1. Make sure you have node installed (e.g. via homebrew)
2. Install uglify-js: `sudo npm install uglify-js --global`
3. Install uglifycss: `sudo npm install uglifycss --global`

### process:
1. Remove old global.*
2. `cat js/*.js > global.js`
3. `uglifyjs global.js > global.min.js`
4. `cat css/*.css > global.css`
5. `uglifycss global.css > global.min.css`
