const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const movieType = new GraphQLObjectType({
  name: 'Film',
  fields: {
    id: { type: GraphQLInt },
    nume: { type: GraphQLString },
    descriere: { type: GraphQLString },
    rating: { type: GraphQLInt },
    categorie: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }
});

module.exports = movieType;