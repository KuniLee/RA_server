const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type Value {
            id: ID!
            deviceId: ID!
            value: Float!
            timestamp: Int!
            parameter: String!
        createdAt: String
        updatedAt: String
}

type Query {
    getValues: [Value!]!
    downloadByTime(timeStart:String!, timeEnd:String!):[Value!]!
}


input ValueInput {
    deviceId: ID!
    value: Float!
    parameter: String!
    timestamp: Int!
}


type Mutation {
    createValue(value:ValueInput!): Value!

}


`)
