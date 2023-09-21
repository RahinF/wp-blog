import getAllPosts from '@lib/getAllPosts';
import Card from './components/card';

interface Post {
  id: string;
  title: string;
  date: Date;
  excerpt: string;
  content: string;
  slug: string;
  featuredImage: { node: FeaturedImage } | null;
  author: { node: Author } | null;
  commentCount: number | null;
  categories: { nodes: Category[] };
}

export default async function Home() {
  const { data } = await getAllPosts();

  const posts: Post[] = data.posts.nodes;

  return (
    <main className="max-w-screen-2xl m-auto pt-10 pb-20 px-4">
      <section className="lg:columns-2 2xl:columns-3 gap-10 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
        {posts.map((post) => {
          return (
            <Card
              key={post.id}
              {...post}
            />
          );
        })}
      </section>
    </main>
  );
}
