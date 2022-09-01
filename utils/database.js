const { Sequelize } = require('sequelize')
const DB_NAME = 'RaServer'
const USER_NAME = 'mysql'
const PASSWORD = 'oHGIy703yg38hg3'
require('dotenv').config()

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: process.env.DB_IP,
  dialect: 'mysql',
})

module.exports = sequelize
