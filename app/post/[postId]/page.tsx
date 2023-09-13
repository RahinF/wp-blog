import getAllPosts from '@lib/getAllPosts';

interface Params {
  params: {
    postId: string;
  };
}

// export async function generateMetadata({
//   params: { postId },
// }: Params): Promise<Metadata> {
//   const posts = await getPost(postId);

//   return {
//     title: posts.title.rendered,
//     description: posts.excerpt.rendered,
//   };
// }

const Post = async ({ params: { postId } }: Params) => {
  // const post = await getPost(postId);
  return (
    <div>
      post id
      {/* <h2>{post.title.rendered}</h2> */}
    </div>
  );
};

export async function generateStaticParams() {
  const { data } = await getAllPosts();

  return data.posts.nodes.map((post: any) => ({
    postId: post.slug.toString(),
  }));
}

export default Post;
