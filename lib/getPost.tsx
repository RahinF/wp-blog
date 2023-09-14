import axios from 'axios';

const query = `query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      author {
        node {
          avatar(size: 32) {
            height
            width
            url
          }
          name
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      date
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
      commentCount
      comments {
        nodes {
          date
          content
          author {
            node {
              id
              name
            }
          }
        }
      }
    }
  }`;

export default async function getPost(slug: string) {
  return await axios
    .post(
      process.env.BASE_URL!,
      {
        query,
        variables: { slug },
      },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then((response) => response.data);
}
