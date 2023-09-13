import axios from 'axios';

export default async function getPost(postId: string) {
  return await axios
    .get(`${process.env.BASE_URL}/posts/${postId}`)
    .then((response) => response.data);
}
