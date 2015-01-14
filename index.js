module.exports = function(plasma, dna) {
  plasma.on(dna.attachToChemical.type, function(c){
    var io = require("socket.io")(c[dna.attachToChemical.propertyName])
    io.on('connection', function (socket) {
      plasma.emit({type: dna.emit.connection, socket: socket})
    })
    plasma.emit({type: dna.emit.ready, data: io})
  })
}