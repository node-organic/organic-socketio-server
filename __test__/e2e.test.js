const SocketIOServer = require('../index')
const Plasma = require('organic-plasma')
const ioclient = require('socket.io-client')

test('as standalone server', (done) => {
  let DNA = {
    port: 8787,
    emit: {
      ready: 'ready'
    }
  }
  let plasma = new Plasma()
  plasma.on('ready', () => {
    plasma.emit('kill', done)
  })
  let instance = new SocketIOServer(plasma, DNA)
  expect(instance.io).toBeDefined()
  expect(instance.plasma).toBeDefined()
  expect(instance.dna).toBeDefined()
})

test('attached to chemical', (done) => {
  let DNA = {
    attachToChemical: {
      type: 'http',
      propertyName: 'server'
    },
    emit: {
      ready: 'ready'
    }
  }
  let plasma = new Plasma()
  plasma.on('ready', () => {
    plasma.emit('kill', done)
  })
  let instance = new SocketIOServer(plasma, DNA)
  plasma.emit({
    type: 'http',
    server: require('http').createServer()
  })
  expect(instance.io).toBeDefined()
  expect(instance.plasma).toBeDefined()
  expect(instance.dna).toBeDefined()
  instance.io.httpServer.listen(8787)
})

test('emits connection', (done) => {
  let DNA = {
    port: 8787,
    emit: {
      ready: 'ready',
      connection: 'connection'
    }
  }
  let plasma = new Plasma()
  plasma.on('connection', () => {
    plasma.emit('kill', done)
  })
  let instance = new SocketIOServer(plasma, DNA)
  expect(instance.io).toBeDefined()
  expect(instance.plasma).toBeDefined()
  expect(instance.dna).toBeDefined()
  ioclient('http://localhost:13371', {
    transports: ['websocket']
  })
})
