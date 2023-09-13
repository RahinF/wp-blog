import getAllPosts from '@lib/getAllPosts';
import getAuthor from '@lib/getAuthor';
import Link from 'next/link';

const getData = async () => {
  let posts = await getAllPosts();

  let postsWithAuthor = await Promise.all(
    posts.map(async (post) => {
      const author = await getAuthor(post.author);
      return { ...post, author };
    }),
  );

  return postsWithAuthor;
};

export default async function Home() {
  const postsData = getData();
  const posts = await postsData;

  return (
    <main>
      Home
      <section className="flex flex-col gap-10">
        {posts &&
          posts.map((post) => (
            <Link
              key={post.id}
              href={`post/${post.id}`}
            >
              <article>
                <h1 className="font-bold text-xl">{post.title.rendered}</h1>
                <p
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  className="max-w-prose"
                />
                <span>{post.author.name}</span>
              </article>
            </Link>
          ))}
      </section>
    </main>
  );
}
