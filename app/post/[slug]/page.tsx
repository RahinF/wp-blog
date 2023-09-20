import { Clock } from '@assets/icons';
import Categories from '@components/card/categories';
import getAllPosts from '@lib/getAllPosts';
import getPost from '@lib/getPost';
import { calcAvgReadingTime } from '@utils/calcAvgReadingTime';
import { format } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';

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

interface Comment {
  date: string;
  content: string;
  author: {
    node: {
      id: string;
      name: string;
    };
  };
}

interface Post {
  id: string;
  title: string;
  date: string;
  content: string;

  categories: { nodes: Category[] };
  tags: { nodes: Tag[] };
  commentCount: number;
  comments: { nodes: Comment[] };
}

const Post = async ({ params: { slug } }: Params) => {
  const { data } = await getPost(slug);
  const {
    id,
    title,
    date,
    content,

    categories: { nodes: categories },
    tags: { nodes: tags },
    commentCount,
    comments: { nodes: comments },
  }: Post = data.post;

  const author: Author | null = data.post.author?.node;
  const featuredImage: FeaturedImage = data.post.featuredImage?.node;
  const formattedDate = format(new Date(date), 'do MMMM, yyyy');

  return (
    <div className="max-w-screen-2xl m-auto py-20">
      {categories && <Categories categories={categories} />}
      <h1 className="text-4xl font-bold mb-10 pt-6">{title}</h1>

      <div className="flex items-center divide-x gap-4 mb-16">
        <div className="flex items-center gap-4">
          {author?.avatar && (
            <Image
              src={author.avatar.url}
              alt={`${author.name}'s avatar`}
              width={author.avatar.height}
              height={author.avatar.height}
              className="rounded-full"
            />
          )}
          <span>{author ? author.name : 'anonymous'}</span>
        </div>
        <div className="pl-4">{formattedDate}</div>
        <div className="flex gap-2 items-center pl-4">
          <Clock
            size={20}
            data-testid="icon-clock"
          />
          {calcAvgReadingTime(content)}
        </div>
      </div>

      {featuredImage && (
        <Image
          src={featuredImage.sourceUrl}
          alt={featuredImage.altText}
          width={featuredImage.mediaDetails.width}
          height={featuredImage.mediaDetails.height}
          className="m-auto mb-16"
        />
      )}

      <div className="grid grid-cols-4">
        <div className="col-span-3 p-4 flex flex-col items-center">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose flex flex-col items-center"
          />
        </div>
        <div className="p-4">related</div>
      </div>
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
