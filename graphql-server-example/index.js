const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { authors, books } = require("./data");
const nanoid = require("nanoid");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    surname: String!
    age: Int
    books(filter: String): [Book!]
  }

  input CreateAuthorInput {
    name: String!
    surname: String!
    age: Int!
  }

  input UpdateAuthorInput {
    name: String
    surname: String
    age: Int
  }

  type DeleteAllOutput {
    count: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    author_id: String
    score: Float
    isPublished: Boolean
  }

  type Query {
    books: [Book!]
    book(id: ID!): Book!

    authors: [Author!]
    author(id: ID): Author
  }

  type Mutation {
    createAuthor(data: CreateAuthorInput): Author!
    updateAuthor(id: ID, data: UpdateAuthorInput!): Author!
    deleteAuthor(id: ID): Author!
    deleteAllAuthor: DeleteAllOutput!
  }
`;

const resolvers = {
  Mutation: {
    createAuthor: (parent, args) => {
      const author = {
        id: nanoid.nanoid(),
        name: args.data.name,
        surname: args.data.surname,
        age: args.data.age,
      };
      authors.push(author);
      return author;
    },
    updateAuthor: (parent, args) => {
      const author_index = authors.findIndex(
        (author) => author.id === args.data.id
      );
      if (author_index === -1) throw new Error("Author Not Found!");

      const updated_author = (authors[author_index] = {
        ...authors[author_index],
        ...args.data,
      });
      return updated_author;
    },
    deleteAuthor: (parent, args) => {
      const author_index = authors.findIndex((author) => author.id === args.id);
      if (!author_index) throw new Error("Author Not Found!");
      const deleted_author = authors[author_index];
      authors.splice(author_index, 1);
      return deleted_author;
    },
    deleteAllAuthors: () => {
      const length = authors.length;
      authors.splice(0, length);
      return {
        count: length,
      };
    },
  },
  Query: {
    books: () => books,
    book: (parent, args) => {
      const data = books.find((book) => book.id === args.id);
      return data;
    },
    authors: () => authors,
    author: (parent, args) => {
      return authors.find((author) => author.id === args.id);
    },
  },

  Book: {
    author: (parent, args) => {
      return authors.find((author) => author.id === parent.author_id);
    },
  },

  Author: {
    books: (parent, args) => {
      let filtered = books.filter((book) => book.author_id === parent.id);
      if (args.filter) {
        filtered = filtered.filter((book) =>
          book.title.toLowerCase().startsWith(args.toLowerCase().filter)
        );
      }
      return filtered;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => console.log(`Apollo server is up at ${url}`));
