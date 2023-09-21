import config from '@components/Card/config';
import Link from 'next/link';

interface Props {
  categories: Category[];
}

const Categories = ({ categories }: Props) => {
  const shortenedCategories = categories.slice(0, config.TAGS_DISPLAY_COUNT);
  return (
    <div className="flex gap-4">
      {shortenedCategories.map((category) => (
        <Link
          href={`/category/${category.slug}`}
          key={category.id}
          className="text-amber-500 text-xs uppercase font-semibold"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
