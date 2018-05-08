const path = require('path')
const http = require('http')

module.exports = class SocketIOServer {
  constructor (plasma, dna) {
    this.plasma = plasma
    this.dna = dna
    this.io = require('socket.io')(dna.options)
    if (dna.attachToChemical) {
      plasma.on(dna.attachToChemical.type, (c) => {
        let httpServer = c[dna.attachToChemical.propertyName]
        this.initialize(httpServer)
      })
    } else if (dna.port) {
      let httpServer = http.createServer(function (req, res) {
        res.writeHead(404)
        res.end()
      })
      this.initialize(httpServer)
      httpServer.listen(dna.port)
    } else {
      throw new Error('attachToChemical or port required in SocketIOServer DNA')
    }
    plasma.on(dna.killChemical || 'kill', (c, done) => {
      this.io.close(done)
    })
  }
  initialize (httpServer) {
    if (this.dna.initializerPath) {
      let initializeFn = require(path.join(process.cwd(), this.dna.initializerPath))
      let opts = {
        plasma: this.plasma,
        dna: this.dna,
        io: this.io,
        httpServer: httpServer
      }
      initializeFn(opts, () => {
        this.attach(httpServer)
      })
    } else {
      this.attach(httpServer)
    }
  }
  attach (httpServer) {
    if (this.emit && this.emit.connection) {
      this.io.on('connection', (socket) => {
        this.plasma.emit({
          type: this.emit.connection,
          socket: socket
        })
      })
    }
    this.io.attach(httpServer)
    if (httpServer.listening) {
      this.completeInitialization()
    } else {
      httpServer.on('listening', this.completeInitialization.bind(this))
    }
  }
  completeInitialization () {
    if (this.dna.log) {
      console.log('socket.io ready')
    }
    if (this.dna.emit && this.dna.emit.ready) {
      this.plasma.emit({
        type: this.dna.emit.ready,
        io: this.io
      })
    }
  }
}
