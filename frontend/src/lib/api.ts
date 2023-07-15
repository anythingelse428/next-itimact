import { createApolloClient } from '../apollo';
import { PostFormatToPostConnection } from '../__generated__/graphql';
import GetArticles from '../pages/graphql/query/Articles.graphql';

const client = createApolloClient();
type Posts = {
  posts: PostFormatToPostConnection;
};
const API = {
  getArticles: async () => {
    await client.query<Posts>({ query: GetArticles });
  },
};

export default API;
