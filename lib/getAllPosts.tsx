import axios from 'axios';

const query = `query GetAllPosts {
  posts(first: 20) {
    nodes {
      id
      title
      date
      excerpt
      content
      slug
      author {
        node {
          name
          avatar {
            height
            url
            width
          }
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      commentCount
      featuredImage {
        node {
          altText
          mediaDetails {
            height
            width
          }
          sourceUrl
        }
      }
    }
  }
}`;

export default async function getAllPosts() {
  return await axios
    .post(
      process.env.BASE_URL!,
      { query },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then((response) => response.data);
}
