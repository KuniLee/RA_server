const { Sequelize } = require('sequelize')
const DB_NAME = 'racloud-data'
const USER_NAME = 'mssql'
const PASSWORD = 'oHGIy703yg38hg3'
require('dotenv').config()

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: process.env.DB_IP,
  dialect: 'mssql',
})

module.exports = sequelize
