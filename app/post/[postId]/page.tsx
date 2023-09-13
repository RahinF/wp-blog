import getPost from '@lib/getPost';
import { Metadata } from 'next';

interface Params {
  params: {
    postId: string;
  };
}

export async function generateMetadata({
  params: { postId },
}: Params): Promise<Metadata> {
  const posts = await getPost(postId);

  return {
    title: posts.title.rendered,
    description: posts.excerpt.rendered,
  };
}

const Post = async ({ params: { postId } }: Params) => {
  const post = await getPost(postId);
  return (
    <div>
      post id
      <h2>{post.title.rendered}</h2>
    </div>
  );
};

export default Post;
