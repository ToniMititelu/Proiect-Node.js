const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');
const models = require('../../models');

const etichetaType = new GraphQLObjectType({
  name: 'Eticheta',
  fields: {
    id: { type: GraphQLInt },
    nume: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }
});

module.exports = etichetaType;