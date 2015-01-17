var path = require("path")

module.exports = function(plasma, dna) {
  plasma.on(dna.attachToChemical.type, function(c){
    var httpServer = c[dna.attachToChemical.propertyName] || c[0][dna.attachToChemical.propertyName]
    var io = require("socket.io")(httpServer, dna.options)

    if(dna.emit.connection)
      io.on('connection', function (socket) {
        plasma.emit({type: dna.emit.connection, socket: socket})
      })

    if(dna.initializerPath) {
      require(path.join(process.cwd(), dna.initializerPath))(io, function(){
        if(dna.log)
          console.log("socketio server ready")
        if(dna.emit.ready)
          plasma.emit({type: dna.emit.ready, io: io})
      })
    } else
    if(dna.emit.ready) {
      if(dna.log)
        console.log("socketio server ready")
      plasma.emit({type: dna.emit.ready, data: io})
    }
  })
}