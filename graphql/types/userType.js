const {GraphQLObjectType, GraphQLInt, GraphQLString} = require('graphql');

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    })
});

module.exports = userType;