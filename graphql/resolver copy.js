const value = require('../models/values')

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
  random({ min, max, count }) {
    const arr = []
    for (let i = 0; i < count; i++) {
      const random = Math.random() * (max - min) + min
      arr.push(random)
    }
    return arr
  },
  addTestUser({ user: { name, email } }) {
    const user = { name, email, age: Math.ceil(Math.random() * 30) }
    users.push(user)
    return user
  },
  async getTodos() {
    try {
      return await Todo.findAll()
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  async createTodo({ todo: { title } }) {
    try {
      return await Todo.create({
        title: title,
        done: false,
      })
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  async completeTodo({ id }) {
    const todo = await Todo.findByPk(+id)
    todo.done = true
    await todo.save()

    return todo
  },
  async removeTodo({ id }) {
    try {
      const todos = await Todo.findAll({
        where: {
          id: id,
        },
      })
      await todos[0].destroy()
      return true
    } catch (error) {
      throw new Error('Fetch todos is not available')
      return false
    }
  },
  async createNewValue({ todo: { title } }) {
    try {
      return await Todo.create({
        title: title,
        done: false,
      })
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
}
