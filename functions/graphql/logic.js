const { gql } = require("apollo-server-lambda");
const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync(require.resolve("./data.json"), "utf8")
);

const typeDefs = gql`
  type View {
    type: String!
    width: Int
    height: Int
    href: String
    still: String
    stills: [String]
  }

  type Project {
    id: String!
    client: String!
    brand: String!
    project: String!
    type: String!
    tech: String!
    thumb: String!
    info: String!
    view: View!
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
  }
`;

const resolvers = {
  Query: {
    projects: () => {
      return data;
    },
    project: (parent, { id }) => {
      return data.find((item) => {
        return String(item.id) === String(id);
      });
    },
  },
};

module.exports = { typeDefs, resolvers };
