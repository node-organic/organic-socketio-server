const SocketIOServer = require('../index')
const Plasma = require('organic-plasma')

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
