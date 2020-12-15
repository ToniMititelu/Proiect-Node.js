const { GraphQLInputObjectType, GraphQLString, GraphQLInt } = require('graphql');

const movieInputType = new GraphQLInputObjectType({
  name: 'MovieInput',
  fields: {
    nume: { type: GraphQLString },
    descriere: { type: GraphQLString },
    rating: { type: GraphQLInt },
    categorie: { type: GraphQLString },
  }
});

module.exports = movieInputType;