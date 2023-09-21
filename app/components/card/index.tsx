import Categories from '@app/components/Card/Categories';
import { ChatCircleDots, Clock } from '@assets/icons';
import { calcAvgReadingTime } from '@utils/calcAvgReadingTime';
import { timeAgoOrDate } from '@utils/timeAgoOrDate';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  date: Date;
  excerpt: string;
  content: string;
  slug: string;
  featuredImage: { node: FeaturedImage } | null;
  commentCount: number | null;
  author: { node: Author } | null;
  categories: { nodes: Category[] };
}

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
  const postedDate = timeAgoOrDate(date);

  return (
    <article className="break-inside-avoid px-6 py-8 mb-8 flex flex-col gap-4 bg-neutral-100">
      {featuredImage && (
        <Link
          href={`post/${slug}`}
          className="flex flex-col gap-2"
        >
          <Image
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText}
            width={featuredImage.node.mediaDetails.width}
            height={featuredImage.node.mediaDetails.height}
            className="self-center"
          />
        </Link>
      )}
      <header className="flex flex-col gap-2">
        <Link href={`post/${slug}`}>
          <h1 className="font-bold text-xl">{title}</h1>
        </Link>
        {categories?.nodes && <Categories categories={categories.nodes} />}
        <p
          dangerouslySetInnerHTML={{ __html: excerpt }}
          className="max-w-prose"
        />
      </header>

      <footer className="flex divide-x gap-4 text-sm items-center text-neutral-600">
        <div className="flex gap-2">
          <div>
            {author ? (
              <Link href={`/author/${author.node.id}`}>{author.node.name}</Link>
            ) : (
              'anonymous'
            )}
            , {postedDate}
          </div>
        </div>
        <div className="flex gap-2 items-center pl-4">
          <ChatCircleDots
            size={20}
            weight="fill"
            data-testid="icon-comment"
          />
          <span>{commentCount ?? 0}</span>
        </div>
        <div className="flex gap-2 items-center pl-4">
          <Clock
            size={20}
            data-testid="icon-clock"
          />
          <span>{readingTime}</span>
        </div>
      </footer>
    </article>
  );
};

export default Card;
