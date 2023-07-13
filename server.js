const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (request.url === "/produto") {
        response.end(JSON.stringify({
            message: "Rota de produto"
        }));
    } else {
        response.end(JSON.stringify({
            data: 'Hello World!',
        }));
    }
});

server.listen(4001, () => console.log("Servidor rodando!!!")); 