const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const movieType = require('./types/movieType');
const etichetaType = require('./types/etichetaType');
const etichetaInputType = require('./inputTypes/etichetaInputType');
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
    deleteFilm: {
      type: movieType,
      args: {
        movieId: {
          type: GraphQLInt
        },
      },
      resolve: async(_, {movieId}) => {
        return models.Film.destroy({where: {id: movieId}, force: true});
      }
    },
    createEticheta: {
      type: etichetaType,
      args: {
        etichetaInput: {
          type: GraphQLNonNull(etichetaInputType)
        },
      },
      resolve: async (_, {etichetaInput}) => {
        return models.Eticheta.create(etichetaInput);
      }
    },
    deleteEticheta: {
      type: etichetaType,
      args: {
        etichetaId: {
          type: GraphQLInt
        },
      },
      resolve: async(_, {etichetaId}) => {
        return models.Eticheta.destroy({where: {id: etichetaId}, force: true});
      }
    },
    createActor: {
      type: GraphQLString,
      args: {

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