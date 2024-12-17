const http = require('http');
const { spawn } = require('child_process');
const { WebSocketServer } = require('ws');
const { toSocket } = require('vscode-ws-jsonrpc');
const { createConnection, forward } = require('vscode-ws-jsonrpc/server');
const { StreamMessageReader, StreamMessageWriter } = require('vscode-jsonrpc/node');

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  const wsSocket = toSocket(socket);

  const child = spawn('/usr/local/bin/verse-lsp');
  
  const reader = new StreamMessageReader(child.stdout);
  const writer = new StreamMessageWriter(child.stdin);

  const socketConnection = createConnection(wsSocket);
  forward(socketConnection, reader, writer, socketConnection);
});

server.listen(3000, () => {
  console.log('LSP server is listening on port 3000');
});
