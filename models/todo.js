const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const todo = sequelize.define('Todo', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  done: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
})

module.exports = todo
