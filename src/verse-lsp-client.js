import { MonacoLanguageClient } from 'monaco-languageclient';
import { WebSocketMessageReader, WebSocketMessageWriter, toSocket } from 'vscode-ws-jsonrpc';
import { createMessageConnection } from 'vscode-jsonrpc/browser.js';

const url = 'ws://localhost:3001';
const webSocket = new WebSocket(url);

webSocket.onopen = () => {
    const socket = toSocket(webSocket);
    const reader = new WebSocketMessageReader(socket);
    const writer = new WebSocketMessageWriter(socket);

    const connection = createMessageConnection(reader, writer);
    connection.listen();

    const languageClient = new MonacoLanguageClient({
        name: 'Verse Language Client',
        clientOptions: {
            documentSelector: ['verse'],
            synchronize: {
                configurationSection: 'verse',
                fileEvents: []
            }
        },
        connectionProvider: {
        get: () => Promise.resolve(connection)
        }
    });

    languageClient.start();
};
