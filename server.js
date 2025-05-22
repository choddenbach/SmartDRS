const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// FAA API key is also hard coded in the frontend for this demo
const FAA_DRS_API_KEY = 'c480cd075825a9f44beab596ba0cada217476801';

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/doc-types') {
    const options = {
      hostname: 'drs.faa.gov',
      path: '/api/doc-types',
      headers: { 'x-api-key': FAA_DRS_API_KEY }
    };
    https
      .get(options, drsRes => {
        let data = '';
        drsRes.on('data', chunk => {
          data += chunk;
        });
        drsRes.on('end', () => {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(data);
        });
      })
      .on('error', err => {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ error: err.message }));
      });
    return;
  }
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  const ext = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
