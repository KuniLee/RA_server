const instance = axios.create({
  baseURL: 'http://212.24.50.42:3000/graphql',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: { dark: true },
  }),
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: '',
      todos: [],
    }
  },
  watch: {
    // whenever question changes, this function will run
    isDark: function (newV) {
      this.$vuetify.theme.dark = newV
    },
  },
  async created() {
    const query = `
 query {
  getTodos{
    id title done createdAt updatedAt
    
  }
}
 `

    const { data } = await instance
      .post('/', JSON.stringify({ query: query }))
      .catch(function (error) {
        // handle error
        console.log('Ошибка', error)
      })
    this.todos = data.data.getTodos
    //console.log(data.data.getTodos)
  },
  methods: {
    async addTodo() {
      const title = this.todoTitle.trim()
      if (!title) {
        return
      }
      const query = `
      mutation {
        createTodo(todo:{
              title: "${title}"
            }
          
        ){
          id title done createdAt updatedAt
        }
       }
      `
      const { data } = await instance
        .post('/', JSON.stringify({ query: query }))
        .catch(function (error) {
          // handle error
          console.log('Ошибка', error)
        })

      this.todos.push(data.data.createTodo)
      this.todoTitle = ''
    },
    async removeTodo(id) {
      const query = `
      mutation {
        removeTodo(id:${id})
      }
      `
      const { data } = await instance
        .post('/', JSON.stringify({ query: query }))
        .catch(function (error) {
          // handle error
          console.log('Ошибка', error)
        })

      if (data.data.removeTodo) {
        this.todos = this.todos.filter((t) => t.id !== id)
      }
    },
    async completeTodo(id) {
      const query = `
      mutation {
        completeTodo(id:${id}){
          id title done createdAt updatedAt
        }
      }
      `
      const { data } = await instance
        .post('/', JSON.stringify({ query: query }))
        .catch(function (error) {
          // handle error
          console.log('Ошибка', error)
        })
      console.log(data.data.completeTodo)
      const todo = this.todos.find((t) => t.id == id)
      todo.done = true
      this.todos[
        this.todos.indexOf(this.todos.find((t) => t.id == id))
      ].updatedAt = data.data.completeTodo.updatedAt
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    date(value) {
      return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(new Date(+value))
    },
  },
})
