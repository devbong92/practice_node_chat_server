const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 클라이언트 연결시
wss.on('connection', function connection(ws) {
  console.log('A new client connected!');
  
  // 메시지 수신 시
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
    // 연결된 모든 클라이언트에게 메시지 브로드캐스트
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // 클라이언트에 환영 메시지 전송
  ws.send('Welcome to the chat!');
});

// HTTP 서버가 요청을 수신할 경우 기본 응답
app.get('/', (req, res) => {
  res.send('WebSocket chat server is running.');
});

// 서버 시작
server.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
