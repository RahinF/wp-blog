import axios from 'axios';

export default async function getAllPosts() {
  return await axios
    .get(`${process.env.BASE_URL}/posts`)
    .then((response) => response.data);
}
