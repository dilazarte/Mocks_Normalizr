const express = require("express");
const path = require('path')
const app = express();
const port = 8080


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//------------RUTAS---------------//
const prodTest = require('./src/routes/productosRoutes')
const chatsRouter = require('./src/routes/chatsRoutes')

app.use('/api/productos-test', prodTest);
app.use('/api/chat', chatsRouter);

app.get('/', (req, res)=>{
    res.sendFile('index.html')
})


//--------------------------------//


const {Server: HttpServer} = require('http');
const {Server: IOServer} = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


io.on('connection', (socket) => {
    console.log('usuario conectado.-');
    
    socket.emit('msg', '')
    socket.on('newMsg', ()=>{
        io.sockets.emit('msg', '')
    })
});

const serverON = httpServer.listen(port, ()=>{
    console.log('Server on port 8080')
})