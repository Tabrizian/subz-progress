const { Server } = require('hapi')

const server = new Server()
const view = require('./lib/view')

server.connection({ port: 3000 });

server.register([
  view
], err => {

  if (err) console.log(err)

  server.route(
    {
      method: 'GET',
      path: '/',
      handler: (req, reply) => {
        reply.view('index', {
          title: 'Index'
        });
      }
    })

  server.start((err) => {
    console.log('Server started at: ' + server.info.uri);
  });

})
