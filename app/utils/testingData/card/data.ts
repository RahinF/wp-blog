const testData = {
  title: 'Template: Comments',
  content: '<p>This post tests comments in the following ways.</p>',
  excerpt: '<p>This post tests comments in the following ways.</p>',
  slug: 'template-comments',
  author: {
    node: {
      id: '1',
      avatar: {
        height: 24,
        width: 24,
        url: 'http://0.gravatar.com/avatar/?s=24&d=mm&r=g',
      },
      name: 'admin',
    },
  },
  categories: {
    nodes: [
      {
        id: 'dGVybTo1MQ==',
        name: 'Template',
        slug: 'template-2',
      },
      {
        id: 'dGVybTo1Mg==',
        name: 'Uncategorized',
        slug: 'uncategorized',
      },
      {
        id: 'dGVybTHWQg==',
        name: 'Category 3',
        slug: 'category-3',
      },
    ],
  },
  date: new Date('2012-01-03T10:11:37'),
  featuredImage: {
    node: {
      altText: 'alt text',
      mediaDetails: {
        height: 200,
        width: 200,
      },
      sourceUrl: 'http://0.gravatar.com/avatar/?s=24&d=mm&r=g;',
    },
  },
  commentCount: 19,
};

export default testData;
