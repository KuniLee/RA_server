const values = require('../models/values')
const { Op } = require('sequelize')

const users = [
  {
    name: 'Igor',
    age: 24,
    email: 'igor@mail.ru',
  },
  {
    name: 'Elena',
    age: 56,
    email: 'Elena@mail.ru',
  },
]

module.exports = {
  async downloadByTime(data) {
    try {
      return await values.findAll({
        where: {
          timestamp: {
            [Op.between]: [
              data.timeStart / 1000 + 18000,
              data.timeEnd / 1000 + 18000,
            ],
          },
        },
      })
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  // addTestUser({ user: { name, email } }) {
  //   const user = { name, email, age: Math.ceil(Math.random() * 30) }
  //   users.push(user)
  //   return user
  // },
  async getValues() {
    try {
      return await values.findAll()
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  async createValue({ value: { deviceId, value, parameter } }) {
    try {
      return await values.create({
        deviceId: deviceId,
        value: value,
        parameter: parameter,
      })
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  // async completeTodo({ id }) {
  //   const todo = await Todo.findByPk(+id)
  //   todo.done = true
  //   await todo.save()

  //   return todo
  // },
  // async removeTodo({ id }) {
  //   try {
  //     const todos = await Todo.findAll({
  //       where: {
  //         id: id,
  //       },
  //     })
  //     await todos[0].destroy()
  //     return true
  //   } catch (error) {
  //     throw new Error('Fetch todos is not available')
  //     return false
  //   }
  // },
  // async createNewValue({ todo: { title } }) {
  //   try {
  //     return await Todo.create({
  //       title: title,
  //       done: false,
  //     })
  //   } catch (error) {
  //     throw new Error('Fetch todos is not available')
  //   }
  // },
}
