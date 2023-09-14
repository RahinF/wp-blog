import { BookOpenText, ChatCircleDots } from '@assets/icons';
import getAllPosts from '@lib/getAllPosts';
import { timeAgo } from '@utils/timeAgoOrDate';
import { decode } from 'html-entities';
import humanizeDuration from 'humanize-duration';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { data } = await getAllPosts();

  const calcAvgReadingTime = (content: string) => {
    const contentText = decode(content);
    const removedHTMLTags = contentText.replace(/<[^>]*>?/gm, '');
    const removedLineBreak = removedHTMLTags.replace(/(\r\n|\n|\r)/gm, ' ');
    const trimmedWhiteSpace = removedLineBreak.replace(/\s+/g, ' ').trim();
    const wordCount = trimmedWhiteSpace.split(' ').length;

    const averageWordReadPerMin = 238;
    const wordsReadPerSec = averageWordReadPerMin / 60;
    const readingTime = wordsReadPerSec * wordCount * 1000;

    return humanizeDuration(readingTime, {
      units: ['h', 'm'],
      maxDecimalPoints: 0,
      conjunction: ' and ',
      largest: 1,
      round: true,
    });
  };

  return (
    <main className="max-w-screen-2xl m-auto py-20 px-4">
      Home
      <section className="columns-2 2xl:columns-3 gap-20 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
        {data.posts.nodes.map((post: any) => {
          const readingTime = calcAvgReadingTime(post.content);
          const postedBy = `${
            post.author ? post.author.node.name : 'anonymous'
          }, ${timeAgo(post.date)}`;

          return (
            <Link
              key={post.id}
              href={`post/${post.slug}`}
              className="break-inside-avoid p-8 mb-6"
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
                <header>
                  <h1 className="font-bold text-xl">{post.title}</h1>
                  <p
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    className="max-w-prose"
                  />
                </header>

                <footer className="flex divide-x gap-4 text-sm items-center text-neutral-600">
                  <div className="flex gap-2">
                    <div>{postedBy}</div>
                  </div>
                  <div className="flex gap-2 items-center pl-4">
                    <ChatCircleDots
                      size={20}
                      weight="fill"
                    />
                    <span>{post.commentCount ?? 0}</span>
                  </div>
                  <div className="flex gap-2 items-center pl-4">
                    <BookOpenText
                      size={20}
                      weight="fill"
                    />
                    <span>{readingTime}</span>
                  </div>
                </footer>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
