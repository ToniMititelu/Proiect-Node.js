const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const movieType = require('./types/movieType');
const movieInputType = require('./inputTypes/movieInputType');
const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createFilm: {
      type: movieType,
      args: {
        movieInput: {
          type: GraphQLNonNull(movieInputType)
        },
      },
      resolve: async (_, {movieInput}) => {
        return models.Film.create(movieInput);
      }
    },
    login: {
      type: GraphQLString,
      args: {
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, {email, password}) => {
        const user = await models.Users.findOne({
          where: {
            email,
          }
        });

        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            // Pasam `userId` in token pentru a-l folosi la validarea tokenului (authenticationMiddleware)
            return jwt.sign({userId: user.id}, config.JWTSECRET);
          }
        }

        return null;
      },
    },
    register: {
      type: GraphQLString,
      args: {
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, { email, password }) => {
        const user = await models.Users.create({email, password: await bcrypt.hash(password, config.SALT_ROUNDS)});
        return user.password;
      }
    }

  }
});

module.exports = mutationType;