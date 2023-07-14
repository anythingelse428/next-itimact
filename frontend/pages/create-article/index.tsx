import CreatePost from '../graphql/mutation/CreatePost.graphql';
import PostForm from '../../components/PostForm/PostForm';
export default function CreateArticle() {
  return <PostForm mutation={CreatePost} action='createPost' />;
}
