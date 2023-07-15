import { getApolloClient } from './apollo-client';
import GetArtles from '../apollo/graphql/query/Articles.graphql';
import GetArtlesByTag from '../apollo/graphql/query/ArticlesByTag.graphql';
import CreatePost from '../apollo/graphql/mutation/CreatePost.graphql';
import { Post, PostFormatToPostConnection } from '../__generated__/graphql';
import { gql } from '@apollo/client';
import axios from 'axios';

type Posts = {
  data: {
    posts: PostFormatToPostConnection;
  };
};
type SinglePost = {
  data: {
    post: Post;
  };
};
export async function getAllArticles(options = {}): Promise<Posts> {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: GetArtles,
  });

  return data;
}

export async function getArticlesByTag(tag: string | string[]): Promise<Posts> {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: GetArtlesByTag,
    variables: { tagIn: tag },
  });

  return data;
}
export async function getAuthor(id: string | number): Promise<SinglePost> {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    query: gql`
      query GetAuthor($id: ID!) {
        post(id: $id, idType: DATABASE_ID) {
          author {
            node {
              databaseId
            }
          }
        }
      }
    `,
    variables: { id: id },
  });
  return data;
}
export async function createPost(variables: {
  description: string;
  title: string;
  content: string;
  categories: [];
  tags: [];
  status: 'DRAFT' | 'PUBLISH';
  featuredImg: File | any;
  id?: string | number;
}) {
  console.log('api', variables);
  const apolloClient = getApolloClient();
  async function setImg() {
    if (typeof variables.featuredImg?.name === 'string') {
      let url = '';
      await axios
        .post(
          process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-json/wp/v2/load-feature',
          {
            selectedFile: variables.featuredImg,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then(({ data }) => {
          if (typeof data === 'string') {
            console.log(data);
            url = data;
            return data;
          }
        });
      return url;
    } else if (variables.featuredImg?.length > 1) {
      return variables.featuredImg;
    }
    return '';
  }
  const url = await setImg();
  const data = await apolloClient.mutate({
    mutation: CreatePost,
    variables: {
      id: variables.id,
      status: variables.status,
      title: variables.title,
      content: variables.content,
      tags: { nodes: variables.tags },
      categories: { nodes: variables.categories },
      featuredImageUrl: url,
      description: variables.description,
    },
  });
  return data;
}
