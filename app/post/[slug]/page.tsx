import getAllPosts from '@lib/getAllPosts';
import getPost from '@lib/getPost';
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
  author: { node: Author };
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
    author: { node: author },
    categories: { nodes: categories },
    tags: { nodes: tags },
    commentCount,
    comments: { nodes: comments },
  }: Post = data.post;

  const featuredImage: FeaturedImage = data.post.featuredImage?.node;

  return (
    <div className="max-w-screen-2xl m-auto py-20">
      <div>{id}</div>
      <div>{date}</div>

      <div className="flex items-center gap-4">
        <Image
          src={author.avatar.url}
          alt={`${author.name}'s avatar`}
          width={author.avatar.height}
          height={author.avatar.height}
          className="rounded-full"
        />
        <span>{author.name}</span>
      </div>

      <h2>{title}</h2>

      {featuredImage && (
        <Image
          src={featuredImage.sourceUrl}
          alt={featuredImage.altText}
          width={featuredImage.mediaDetails.width}
          height={featuredImage.mediaDetails.height}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: content }} />

      <div>
        <h3>categories</h3>
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="border rounded-3xl px-4 py-2 transition hover:bg-blue-500 hover:text-white duration-300"
            >
              {category.name}
            </button>
          ))}
        </div>

        <div>
          <h3>tags</h3>
          <div className="flex gap-4">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className="border rounded-3xl px-4 py-2 transition hover:bg-green-500 hover:text-white duration-300"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3>comments</h3>
        <span>{commentCount}</span>
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
