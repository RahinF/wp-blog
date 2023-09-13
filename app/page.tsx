import getAllPosts from '@lib/getAllPosts';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { data } = await getAllPosts();

  return (
    <main>
      Home
      <section className="flex flex-col gap-10 items-center">
        {data.posts.nodes.map((post: any) => (
          <Link
            key={post.id}
            href={`post/${post.slug}`}
            className="max-w-2xl w-full"
          >
            <article>
              {post.featuredImage && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText}
                  width={post.featuredImage.node.mediaDetails.width}
                  height={post.featuredImage.node.mediaDetails.height}
                />
              )}
              <h1 className="font-bold text-xl">{post.title}</h1>
              <p
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
                className="max-w-prose"
              />

              {post.author ? (
                <div className="flex gap-2 items-center">
                  <Image
                    src={post.author.node.avatar.url}
                    alt={`${post.author}'s avatar`}
                    width={post.author.node.avatar.width}
                    height={post.author.node.avatar.height}
                    className="rounded-full h-6 w-6"
                  />
                  <span>{post.author.node.name}</span>
                </div>
              ) : (
                <div>anonymous</div>
              )}

              <div>comments: {post.commentCount ?? 0}</div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
