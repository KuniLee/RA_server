const { Sequelize } = require('sequelize')
const DB_NAME = 'node-todo'
const USER_NAME = 'mysql'
const PASSWORD = 'oHGIy703yg38hg3'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: '212.24.50.42',
  dialect: 'mysql',
})

module.exports = sequelize
