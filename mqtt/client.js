const values = require('../models/values')
const mqtt = require('mqtt')
const { io } = require('../websocket/server')
require('dotenv').config()

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  //clientId: 'emqx_test',
  username: 'selnet',
  password: 'Yuio9876',
}

function StartMQTT() {
  const client = mqtt.connect(`mqtt://${process.env.MQTT_IP}:1883`, options)

  client.on('message', async function (topic, message) {
    // message is Buffer
    //client.end()
    const data = JSON.parse(message)
    //console.log('topic: ' + topic, data.timestamp)
    if (topic.includes('rec')) {
      try {
        await values.create({
          deviceId: data.deviceId,
          value: data.value,
          timestamp: data.timestamp,
          parameter: data.parameter,
        })
      } catch (error) {
        console.log(error.message)
      }
    } else if (topic.includes('real')) {
      io.emit(`${data.parameter}:update`, data)
    }
  })

  client.on('connect', () => {
    console.log('Connected')
    client.subscribe('humid/#', (err) => {
      if (!err) {
        console.log('subsctibed humid')
        //mqttClient.publish('test', 'Hello mqtt!')
      }
    })
    client.subscribe('temp/#', (err) => {
      if (!err) {
        console.log('subsctibed temp')
        //mqttClient.publish('test', 'Hello mqtt!')
      }
    })
  })
}
module.exports = StartMQTT
