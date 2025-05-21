# SmartDRS
AI Enhanced DRS

## Running locally in Codex

This project is a simple static site that queries the FAA DRS API. A minimal
Node server (`server.js`) is included so the app can be served in the Codex
environment without additional dependencies.

1. From the project directory, start the server:

   ```bash
   node server.js
   ```

2. Open `http://localhost:3000` in your browser.

The app requires Internet access to reach the FAA API. If the Codex environment
is offline, the fetches in `script.js` will fail.
