import Image from 'next/image';

interface Props {
  featuredImage: FeaturedImage;
}

const FeaturedImage = ({ featuredImage }: Props) => {
  return (
    <Image
      src={featuredImage.sourceUrl}
      alt={featuredImage.altText}
      width={featuredImage.mediaDetails.width}
      height={featuredImage.mediaDetails.height}
      className="m-auto mb-16"
    />
  );
};

export default FeaturedImage;
