# canvas-branding
Top-level Canvas theme files.

## Build Process

Changes made to this repository trigger an automatic build process via a CodeBuild project. This process generates both minified and un-minified versions of the combined CSS and JS files.

Note: You can also manually initiate a build for a specific version of the project in CodeBuild.

The resulting files can be found in `s3://at-build-artifacts/canvas-global-branding` and include:
- theme.css
- theme.min.css
- theme.js
- theme.min.js

These files can be used to update the Canvas theme.
