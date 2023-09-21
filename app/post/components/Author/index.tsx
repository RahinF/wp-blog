import Image from 'next/image';

interface Props {
  author?: Author;
}

const Author = ({ author }: Props) => {
  return (
    <>
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
    </>
  );
};

export default Author;
