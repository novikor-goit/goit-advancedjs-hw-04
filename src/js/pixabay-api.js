const API_KEY = '49490613-8cd40a9bd53e95e64061d42d8';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

axios.defaults.params = {
  key: API_KEY,
};

export default async function getList(query, page) {
  const response = await axios.get('/', {
    params: {
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 15,
      safesearch: true,
    },
  });
  if (!response.data?.hits.length) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }

  return response.data.hits;
}
