const { Server } = require('hapi')

const server = new Server()
const { view } = require('./lib')

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

  server.route(
    {
      method: 'GET',
      path: '/movies',
      handler: (req, reply) => {
        reply.view('movies', {
          title: 'Movies',
          movies: [
            {
              title: 'Inception',
              title_description: 'Inception - Folan',
              year: '2010'
            }
          ]
        });
      }
    })
  server.route(
    {
      method: 'POST',
      path: '/movie/search',
      handler: (req, reply) => {
        let movie = req.payload.movie;
        reply(movie)
      }
    })
  server.start((err) => {
    console.log('Server started at: ' + server.info.uri);
  });

})
