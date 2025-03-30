const API_KEY = '49490613-8cd40a9bd53e95e64061d42d8';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

axios.defaults.params = {
  key: API_KEY,
};

export default function getList(query) {
  return axios
    .get('/', {
      params: {
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response =>
      response.data?.hits.length
        ? response.data.hits
        : Promise.reject(
            'Sorry, there are no images matching your search query. Please try again!'
          )
    );
}
