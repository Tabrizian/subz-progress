const { Server } = require('hapi')

const server = new Server()
const axios = require('axios')
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
      handler: async (req, reply) => {
        let movie = req.payload.movie;
        let results = {}
        try {
          results = await axios.get('https://subz.now.sh/imdb/search', {
            params: {
              query: movie
            }
          })
          reply.view('movies', {
            title: 'Movies',
            movies: results.data.results
          });
        } catch (e) {
          console.log(e)
        }
      }
    })
  server.start((err) => {
    console.log('Server started at: ' + server.info.uri);
  });

})
