module.exports.register = function (server, options, next) {
	server.register(require('vision'), () => {
		server.root.views({
			engines: {
				html: require('handlebars'),
			},
			path: __dirname + '/../templates',
			layout: true
		})
		next()
	})
}
 module.exports.register.attributes = {
   name: 'subtitles-view'
 }
