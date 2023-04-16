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
# EVENT #
type Event {
  id: ID!
  title: String!
  desc: String!
  location_id: ID!
  user_id: ID!
  users: [User!]
  participants: [Participant!]!
  locations: [Location!]
}
input CreateEventInput {
  title: String
  desc: String
  location_id: ID
  user_id: ID
}
input UpdateEventInput {
  title: String
  location_id: ID
  user_id: ID
  desc: String
}
type DeleteAllOutput {
  count: Int!
}
# USER #
type User {
  id: ID!
  username: String!
  email: String!
  events: [Event!]
}
input CreataUserInput {
  username: String
}
input UpdateUserInput {
  username: String
  email: String
}
type DeleteAllOutput {
  count: Int!
}
# PARTİCİPANT #
type Participant {
  id: ID!
  user_id: ID!
  event_id: ID!
}
input CreateParticipantInput {
  id: ID
  user_id: ID
  event_id: ID
}
input UpdateParticipantInput {
  user_id: ID
  event_id: ID
}
type DeleteAllOutput {
  count: Int!
}
# LOCATİON #
type Location {
  id: ID!
  name: String!
  desc: String!
}
input CreateLocationInput {
  id: ID
  name: String
}
input UpdateLocationInput {
  name: String
  desc: String
}
type DeleteAllOutput {
  count: Int!
}
type Query {
  
  # USER #
  users: [User!]!
  user(id: ID!): User!

  # EVENT #
  events: [Event!]!
  event(id: ID): Event!

  # LOCATION #
  locations: [Location!]!
  location(id: ID): Location!

  # PARTICIPANT #
  participants: [Participant!]!
  participant(id: ID): Participant!
}
# MUTATİON #
type Mutation {

  # USER #
  createUser(data: CreataUserInput): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  deleteUser(id: ID!): User!
  deleteAllUsers: DeleteAllOutput!

  #EVENT #
  createEvent(data: CreateEventInput): Event!
  updateEvent(id: ID!, data: UpdateEventInput!): Event!
  deleteEvent(id: ID!): Event!
  deleteAllEvents: DeleteAllOutput!

  # LOCATİON #
  createLocation(data: CreateLocationInput): Location!
  updateLocation(id: ID!, data: UpdateLocationInput!): Location!
  deleteLocation(id: ID!): Location!
  deleteAllLocations: DeleteAllOutput!

  # PARTİCİPANT #
  createParticipant(data: CreateParticipantInput): Participant!
  updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
  deleteParticipant(id: ID!): Participant!
  deleteAllParticipants: DeleteAllOutput!
}
`;

const resolvers = {
Mutation: {
  // USER //
  createUser: (parent, { data }) => {
    const user = { id: nanoid.nanoid(), ...data };

    users.push(user);

    return user;
  },
  updateUser: (parent, { id, data }) => {
    const user_index = users.findIndex((user) => user.id === id);
    if (user_index === -1) {
      throw new Error("User not found");
    }
    const updated_user = (users[user_index] = {
      ...users[user_index],
      ...data,
    });
    return updated_user;
  },
  deleteUser: (parent, { id }) => {
    const user_index = users.findIndex((user) => user.id === id);
    if (user_index === -1) {
      throw new Error("user not found");
    }
    const deleted_user = users[user_index];
    users.splice(user_index, 1);
    return deleted_user;
  },
  deleteAllUsers: () => {
    const length = users.length;
    users.splice(0, length);
    return {
      count: length,
    };
  },

  // EVENT //
  createEvent: (parent, { data }) => {
    const event = { id: nanoid.nanoid(), ...data };

    events.push(event);

    return event;
  },
  updateEvent: (parent, { id, data }) => {
    const event_index = events.findIndex((event) => event.id === id);
    if (event_index === -1) {
      throw new Error("Event not found");
    }
    const updated_event = (events[event_index] = {
      ...events[event_index],
      ...data,
    });
    return updated_event;
  },
  deleteEvent: (parent, { id }) => {
    const event_index = events.findIndex((event) => event.id === id);
    if (event_index === -1) {
      throw new Error("event not found");
    }
    const deleted_event = events[event_index];
    events.splice(event_index, 1);
    return deleted_event;
  },
  deleteAllEvents: () => {
    const length = events.length;
    events.splice(0, length);
    return {
      count: length,
    };
  },

  // LOCATİON //
  createLocation: (parent, { data }) => {
    const location = { ...data };

    locations.push(location);

    return location;
  },
  updateLocation: (parent, { id, data }) => {
    const location_index = locations.findIndex(
      (location) => location.id === id
    );
    if (location_index === -1) {
      throw new Error("Location not found");
    }
    const updated_location = (locations[location_index] = {
      ...locations[location_index],
      ...data,
    });
    return updated_location;
  },
  deleteLocation: (parent, { id }) => {
    const location_index = locations.findIndex(
      (location) => location.id === id
    );
    if (location_index === -1) {
      throw new Error("location not found");
    }
    const deleted_location = locations[location_index];
    locations.splice(location_index, 1);
    return deleted_location;
  },
  deleteAllLocations: () => {
    const length = locations.length;
    locations.splice(0, length);
    return {
      count: length,
    };
  },
  // Participant //
  createParticipant: (parent, { data }) => {
    const participant = { ...data };

    participants.push(participant);

    return participant;
  },
  updateParticipant: (parent, { id, data }) => {
    const participant_index = participants.findIndex(
      (participant) => participant.id === id
    );
    if (participant_index === -1) {
      throw new Error("participant not found");
    }
    const updated_participant = (participants[participant_index] = {
      ...participants[participant_index],
      ...data,
    });
    return updated_participant;
  },
  deleteParticipant: (parent, { id }) => {
    const participant_index = participants.findIndex(
      (participant) => participant.id === id
    );
    if (participant_index === -1) {
      throw new Error("participnat not found");
    }
    const deleted_participant = participants[participant_index];
    participants.splice(participant_index, 1);
    return deleted_participant;
  },
  deleteAllParticipants: () => {
    const length = participants.length;
    participants.splice(0, length);
    return {
      count: length,
    };
  },
},

Query: {
  //USER
  users: () => users,
  user: (parent, args) => users.find((user) => user.id === args.id),
  //Event
  events: () => events,
  event: (parent, args) => events.find((event) => event.id === args.id),
  //Location
  locations: () => locations,
  location: (parent, args) =>
    locations.find((location) => location.id === args.id),
  //Participant
  participants: () => participants,
  participant: (parent, args) =>
    participants.find((participant) => participant.id === args.id),
},
Event: {
  users: (parent) => users.filter((user) => parent.user_id === user.id),

  participants: (parent) =>
    participants.filter((participant) => participant.id === parent.id),
  locations: (parent) =>
    locations.filter((location) => location.id === parent.id),
},
User: {
  events: (parent) => events.filter((event) => event.user_id === parent.id),
},
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen({port:3000}).then(({ url }) => console.log(`Apollo server is up at ${url}`));
