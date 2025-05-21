# SmartDRS
AI Enhanced DRS

## Running locally in Codex

This project is a simple static site that queries the FAA DRS API. A minimal
Node server (`server.js`) is included so the app can be served in the Codex
environment without additional dependencies.

1. From the project directory, start the server. Make sure your current working
   directory is the repository root (typically `/workspace/SmartDRS` in Codex):

   ```bash
   node server.js
   ```

   If you encounter an error like `Cannot find module '/workspaces/SmartDRS/server.js'`,
   double-check that your path is `/workspace/SmartDRS` (note the missing `s`).

2. Open `http://localhost:3000` in your browser.

The app requires Internet access to reach the FAA API. If the Codex environment
is offline, the fetches in `script.js` will fail.
