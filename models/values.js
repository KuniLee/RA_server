const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const values = sequelize.define('Values', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  deviceId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  timestamp: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  parameter: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  value: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
})

module.exports = values
