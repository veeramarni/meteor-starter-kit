import { Random } from 'meteor/random';
//import { async, await } from 'meteor/meteor-promise';

//import regeneratorRuntime from 'babel-runtime/regenerator'
//if (!Object.keys(window).includes('regeneratorRuntime'))
//  window.regeneratorRuntime = regeneratorRuntime

export const schema = [`
type Email {
  address: String
  verified: Boolean
}

type User {
  emails: [Email]
  username: String
  randomString: String
}

type Query {
  user(id: String!): User
}

schema {
  query: Query
}
`];

export const resolvers = {
  Query: {
    async user(root, args, context) {
      // Only return the current user, for security
      if (context.userId === args.id) {
        return await Meteor.users.findOne(context.userId);
      }
    },
  },
  User: {
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
  }
}
