const http = require('http')
const app  = require('./app')

const port  = process.env.PORT || 4000;
// const ip    = '192.168.1.106'

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log('Listening on Port: ' + port)
})