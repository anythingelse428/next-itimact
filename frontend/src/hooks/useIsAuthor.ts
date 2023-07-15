import * as jose from 'jose';
import { getAuthor } from '../lib/articles';
export default async function useIsAuthor(
  token: string,
  postId: string | number
): Promise<boolean> {
  let authorId;
  if (postId && token) {
    await getAuthor(postId).then(({ data }) => {
      authorId = data?.post?.author?.node?.databaseId;
    });
    return jose.decodeJwt(token)?.data?.user?.id == authorId;
  }
}
