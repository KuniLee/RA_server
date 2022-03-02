const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const path = require('path')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')
const sequelize = require('./utils/database')
const StartMQTT = require('./mqtt/client')
const cors = require('cors')

// для websocket

const { app, server } = require('./websocket/server')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
)

// app.use((req, res, next) => {
//   res.status(200).sendFile('index.html')
// })

async function start() {
  try {
    await sequelize.sync()
    //app.listen(3000, () => console.log(`Сервер запущен на порту ${PORT}`))
    server.listen(3000, () => {
      console.log('listening on *:3000')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
StartMQTT()
// mqttClient.on('connect', () => {
//   console.log('Connected')
//   mqttClient.subscribe('test', (err) => {
//     if (!err) {
//       console.log('subsctibed')
//       //mqttClient.publish('test', 'Hello mqtt!')
//     }
//   })
// })

// mqttClient.on('message', function (topic, message) {
//   // message is Buffer
//   console.log('On topic' + topic + ':', JSON.parse(message))
//   //client.end()
// })
