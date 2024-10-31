
const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

let clients = 0;

wss.on('connection', (ws) => {
    
    clients++
    console.log('client connected. Total clients:', clients);

    // Send all recent notifications to the new client
    const now = Date.now();
    const recentNotifications = notifications.filter(notification => (now - notification.timestamp) < 86400000); // Last 24 hours
    recentNotifications.forEach(notification => {
        ws.send(JSON.stringify(notification));
    });

    ws.on('close', () => {
        clients--;
        console.log('Client disconnected. Total clients:', clients);
    });
});

function notifyClients(message) {

    const notification = {
        message,
        timestamp: Date.now()
    };
    
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(notification));
        }
    });
}

module.exports = { wss, notifyClients };