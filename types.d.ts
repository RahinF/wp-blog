interface FeaturedImage {
  altText: string;
  mediaDetails: {
    height: number;
    width: number;
  };
  sourceUrl: string;
}

interface Author {
  avatar: {
    height: number;
    width: number;
    url: string;
  };
  name: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}
