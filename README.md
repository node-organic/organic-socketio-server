# organic-socketio-server

Organelle wrapping socket.io v1.2.1

## dna

    "organic-socketio-server": {
      "source": "node_modules/organic-socketio-server",
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

    module.exports = function(io, done) {
      done() // must be called in order to emit.ready
    }

### `options`

Object having [socketio v1.2.1 options](http://socket.io/docs/server-api/#server(opts:object)) structure.

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