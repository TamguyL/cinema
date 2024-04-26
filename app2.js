const express = require('express')
const app = express() 

const server = app.listen(8090,() => { console.log('serveur ecoute le port 8090') })
const mio = require('socket.io')
const io = mio(server)

app.use(express.json());



const json = 
{
"proverbe": [
    {"phr": "Toutes les jeunes filles doutent de leur foy.",},
    {"phr": "Pierre qui moule n'amasse pas rousse.",},
    {"phr": "Goûtez-moi cette farce ",},
    {"phr": "C'est au pied du mur qu'on voit le mur.",},
    {"phr": "Quand le tchat n'est pas là, la souris dansent.",},
    {"phr": "Cette femme est une lieuse de chardons.",},
    {"phr": "Le vaincu de son cœur.",},
    {"phr": "Je n’ai pas de rebord à mes épaulettes",},
    {"phr": "J'ai du tracas jusqu'au cou",},
    {"phr": "Les nouilles cuisent au jus de canne",}
  ]
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get('/', function(req, res) {
        res.sendFile('client.html',{root: __dirname})
})

io.on('connection',(socket) => {
    console.log("client connecté:" + socket.id)

    socket.on('message',(data) => {
        console.log("reçu de client:"+data)
        io.sockets.emit('repmessage',data.toUpperCase())

    })

    socket.on('proverbe',() => {
      let provRandom = getRandomInt(10)
      let proverbe = json.proverbe[provRandom].phr;
      io.sockets.emit('repmessage',proverbe)

  })
})


