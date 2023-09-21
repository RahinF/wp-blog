import Categories from '@app/components/Card/Categories';
import { format } from 'date-fns';
import Author from '../Author';
import FeaturedImage from '../FeaturedImage';
import ReadingTime from '../ReadingTime';
import Related from '../Related';

interface Post {
  id: string;
  title: string;
  date: Date;
  content: string;
  categories: { nodes: Category[] };
  tags: { nodes: Tag[] };
  commentCount: number;
  comments: { nodes: Comment[] };
  author: { node?: Author };
  featuredImage: { node: FeaturedImage } | null;
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

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  const {
    title,
    date,
    content,
    author: { node: author },

    categories: { nodes: categories },
  }: Post = post;

  const featuredImage = post.featuredImage?.node;

  const formattedDate = format(new Date(date), 'do MMMM, yyyy');

  return (
    <div className="max-w-screen-2xl m-auto py-20">
      {categories && <Categories categories={categories} />}
      <h1 className="text-4xl font-bold mb-10 pt-6">{title}</h1>

      <div className="flex items-center divide-x gap-4 mb-16">
        <div className="flex items-center gap-4">
          <Author author={author} />
        </div>
        <div className="pl-4">{formattedDate}</div>
        <div className="flex gap-2 items-center pl-4">
          <ReadingTime content={content} />
        </div>
      </div>

      {featuredImage && <FeaturedImage featuredImage={featuredImage} />}

      <div className="grid grid-cols-4">
        <div className="col-span-3 p-4 flex flex-col items-center">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose"
          />
        </div>
        <div className="p-4">
          <Related />
        </div>
      </div>
    </div>
  );
};

export default Post;
