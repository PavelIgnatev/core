const http = require('http');

const server = http.createServer((req, res) => {
  const chunks = [];

  req.on('data', (chunk) => chunks.push(chunk));

  req.on('end', () => {

    console.log('\n=== НОВЫЙ ЗАПРОС ===');
    console.log('URL:', req.url);
    console.log('Заголовки:', JSON.stringify(req.headers, null, 2));
    console.log('Данные:', chunks);
    console.log('==================\n');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  });
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
