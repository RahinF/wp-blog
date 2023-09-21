import getAllPosts from '@lib/getAllPosts';
import getPost from '@lib/getPost';
import { Metadata } from 'next';
import Post from '../components/Post';

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  const { data } = await getPost(slug);

  return {
    title: data.post.title,
    // description: posts.excerpt.rendered,
  };
}

const PostPage = async ({ params: { slug } }: Params) => {
  const { data } = await getPost(slug);

  return <Post post={data.post} />;
};

export async function generateStaticParams() {
  const { data } = await getAllPosts();

  return data.posts.nodes.map((post: any) => ({
    slug: post.slug,
  }));
}

export default PostPage;
