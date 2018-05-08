# organic-socketio-server

Organelle wrapping socket.io v2.1.0

## dna

    {
      "attachToChemical": {
        "type": "ExpressServer",
        "propertyName": "server"
      },
      "emit": {
        "ready": "SocketIO",
        "connection": "SocketIOConnection"
      },
      "initializerPath": undefined,
      "log": false,
      "options": undefined
    }

### `initializerPath`

Path to a module relative to `process.cwd()` having the following implementation

    module.exports = function(options, done) {
      let plasma = options.plasma
      let dna = options.dna
      let io = options.io
      let httpServer = options.httpServer
      done() // must be called in order to emit.ready
    }

### `options`

Object having [socketio v2.1.0 options](https://socket.io/docs/server-api/#new-server-httpserver-options) structure.

## Reacts on chemicals

### `attachToChemical.type`

    {
      `attachToChemical.propertyName`: HttpServer
    }

## Emits chemicals

### `emit.ready` 

    {
      io: socketioServer
    }

### `emit.connection` 

    {
      socket: socketioSocket
    }
