const { Sequelize } = require('sequelize')
const DB_NAME = 'racloud-data'
const USER_NAME = 'ra-server'
const PASSWORD = 'Yuio9876'
require('dotenv').config()

const sequelize = new Sequelize(DB_NAME, null, null, {
  dialect: 'mssql',
  host: process.env.DB_IP,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        domain: 'WORKGROUP',
        userName: USER_NAME,
        password: PASSWORD
      }
    },
    options: {
      cryptoCredentialsDetails: {
        minVersion: 'TLSv1'
      }
    }
  }
})


module.exports = sequelize
