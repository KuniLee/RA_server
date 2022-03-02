const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type User {
    name: String!
    age: Int!
    email: String!
}

type TestType {
    count: Int!
    users: [User!]!
}

type Todo {
            id: ID!
        done: Boolean!
        title: String!
        createdAt: String
        updatedAt: String
}



type Query {
    test: TestType!
    random(min:Int!, max:Int!, count:Int!):[Float!]!
    getTodos: [Todo!]!
}

input UserInput {
    name: String!
    email: String!
}
input TodoInput{
    title: String!
}

type Mutation {
    addTestUser(user: UserInput!):
    User!
    createTodo(todo:TodoInput!): Todo!
    completeTodo(id:ID!):Todo!
    removeTodo(id:ID!):Boolean!

}


`)
