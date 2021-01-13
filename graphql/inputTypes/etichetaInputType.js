const { GraphQLInputObjectType, GraphQLString, GraphQLInt } = require('graphql');

const etichetaInputType = new GraphQLInputObjectType({
  name: 'EtichetaInput',
  fields: {
    nume: { type: GraphQLString },
  }
});

module.exports = etichetaInputType;