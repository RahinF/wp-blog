import { timeAgo } from '@app/utils/timeAgoOrDate';
import { BookOpenText, ChatCircleDots } from '@assets/icons';
import { decode } from 'html-entities';
import humanizeDuration from 'humanize-duration';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  date: Date;
  excerpt: string;
  content: string;
  slug: string;
  featuredImage: { node: FeaturedImage } | null;
  commentCount: number;
  author: { node: Author } | null;
  categories: { nodes: Category[] };
}

const calcAvgReadingTime = (content: string) => {
  const decodedContent = decode(content);
  const removedHTMLTags = decodedContent.replace(/<[^>]*>?/gm, '');
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

const Card = ({
  author,
  categories,
  commentCount,
  content,
  date,
  excerpt,
  featuredImage,
  slug,

  title,
}: Props) => {
  const readingTime = calcAvgReadingTime(content);
  const postedBy = `${author ? author.node.name : 'anonymous'}, ${timeAgo(
    date,
  )}`;

  const TAGS_DISPLAY_COUNT: number = 3;

  return (
    <article className="break-inside-avoid py-4 mb-6 flex flex-col gap-4">
      <Link
        href={`post/${slug}`}
        className="flex flex-col gap-2"
      >
        {featuredImage && (
          <Image
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText}
            width={featuredImage.node.mediaDetails.width}
            height={featuredImage.node.mediaDetails.height}
            className="self-center"
          />
        )}
      </Link>
      <header>
        <Link
          href={`post/${slug}`}
          className="flex flex-col gap-2"
        >
          <h1 className="font-bold text-xl">{title}</h1>
        </Link>
        {categories?.nodes && (
          <div className="flex gap-4">
            {categories.nodes.slice(0, TAGS_DISPLAY_COUNT).map((category) => (
              <div
                key={category.id}
                className="bg-text-500 text-xs uppercase font-semibold"
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
        <p
          dangerouslySetInnerHTML={{ __html: excerpt }}
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
          <span>{commentCount ?? 0}</span>
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
  );
};

export default Card;
