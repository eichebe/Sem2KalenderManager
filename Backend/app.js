const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const id = url.searchParams.get('id');
  switch (url.pathname) {
    case '/getItems':
        response.write(JSON.stringify(events));
        break;
    case '/getItem':
        if(id){
            response.write(JSON.stringify(events.find(item => item.id == id)));
        }
        break;
    case '/setItem':
        if(request.method === 'POST') {
            let jsonString = '';
            request.on('data', (data) => {
                jsonString += data;
            });
            request.on('end', () => {
                newItem = JSON.parse(jsonString);
                if(newItem.id){ // update
                    const index = items.findIndex(item => item.id == newItem.id);
                    items[index] = newItem;
                }
                else{ // add
                    newItem.id = new Date().valueOf();
                    items.push(newItem);
                }
            });
        }
    case '/removeItem':
        if(id){
            items = items.filter(item => item.id != id);
        }
        break;
    default:
        response.statusCode = 404;
  }
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});