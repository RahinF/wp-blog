import axios from 'axios';

export default async function getAuthor(id: number) {
  return await axios
    .get(`${process.env.BASE_URL}/users/${id}`)
    .then((response) => response.data);
}
