// console.log('Hellow World!')

// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('Requisição GET recebida\n');
//     } else if (req.method === 'POST') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             res.writeHead(200, { 'Content-Type': 'text/plain' });
//             res.end(`Dados recebidos: ${body}\n`);
//         });
//     } else if (req.method === 'PUT') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('Requisição PUT recebida\n');
//     }
// });

// server.listen(3000, () => {
//     console.log('Servidor rodando em http://localhost:3000/');
// });

// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const HOST = 'localhost';
// const PORT = 3000;

// const requestHandler = (request, response) => {
//     console.log(`Requested URL: ${request.url}`);

//     if (request.url === '/html/index.html' || request.url == '/') {
//         console.log('Load HTML file');
//         const pathToFile = path.join(__dirname, 'static', 'html', 'index.html');
//         fs.readFile(pathToFile, (error, data) => {
//             if (error) {
//                 console.error(error);
//                 response.writeHead(404);
//                 response.end('Error loading HTML file');
//             } else {
//                 response.setHeader('Content-Type', 'text/html');
//                 response.writeHead(200);
//                 response.end(data.toString());
//             }
//         });
//     } else if (request.url === '/css/styles.css' || request.url === '/static/css/styles.css') {
//         console.log('Load CSS file');
//         const pathToFile = path.join(__dirname, 'static', 'css', 'styles.css');
//         fs.readFile(pathToFile, (error, data) => {
//             if (error) {
//                 console.error(error);
//                 response.writeHead(404);
//                 response.end('Error loading CSS file');
//             } else {
//                 response.setHeader('Content-Type', 'text/css');
//                 response.writeHead(200);
//                 response.end(data.toString());
//             }


//         });
//     } else {
//         response.writeHead(404);
//         response.end('Error loading file');
//     }
// };

// const server = http.createServer(requestHandler);
// server.listen(PORT, HOST, () => {
//     console.log(`Web server running at http://${HOST}:${PORT}`);
// });


const express = require('express');
const path = require('path');
const PORT = 8000;
const HOST = 'localhost';
const app = express();

app.use(express.static('static'));

app.get('/', (request, response) => {
    const pathToFile = path.join(__dirname, 'static', 'html', 'index.html');
    response.sendFile(pathToFile);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor web rodando em http://${HOST}:${PORT}`);
});