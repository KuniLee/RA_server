const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type MyType {
   average: Float
   hour: String
   DAYOFMONTH: String
   parameter: String
   
}

type Value {
            id: ID!
            deviceId: ID!
            value: Float!
            timestamp: String!
            parameter: String!
        
        
}



type Query {
    getValues: [Value!]!
    downloadByTime(timeStart:String!, timeEnd:String!):[Value!]!
    report(reportType:String!, date:String!, offsetInHours:String!): [MyType]
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
