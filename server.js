import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Create a simple HTTP server for health checks
const server = http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            message: 'BEANS Decider Bot is running!',
            timestamp: new Date().toISOString()
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`🌐 Health check server running on port ${PORT}`);
    console.log(`🔗 Health check URL: http://localhost:${PORT}/health`);
});

// Keep the server alive
setInterval(() => {
    console.log(`📊 Bot status check: ${new Date().toISOString()}`);
}, 300000); // Every 5 minutes

export default server;
