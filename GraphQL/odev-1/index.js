const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./data.json"));
const users = data["users"];
const events = data["events"];
const locations = data["locations"];
const participants = data["participants "];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    location: Location!
    participants: [Participant!]!
    user: User!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!

    events: [Event!]!
    event(id: ID!): Event!

    locations: [Location!]!
    location(id: ID!): Location!

    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id == args.id),

    events: () => events,
    event: (parent, args) => events.find((event) => event.id == args.id),

    locations: () => locations,
    location: (parent, args) =>
      locations.find((location) => location.id == args.id),

    participants: () => participants,
    participant: (parent, args) =>
      participants.find((participant) => participant.id == args.id),
  },

  User: {
    events: (parent, args) => events.filter((event) => event.id == parent.id),
  },

  Event: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    location: (parent) =>
      locations.find((location) => location.id === parent.user_id),
    participants: (parent) =>
      participants.filter(
        (participant) => participant.user_id == parent.user_id
      ),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen({port:3000}).then(({ url }) => console.log(`Apollo server is up at ${url}`));
