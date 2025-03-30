import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImages from './js/pixabay-api.js';
import * as renderFunctions from './js/render-functions.js';

document.getElementById('search-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  search(form.elements.query.value).then(() => form.reset());
});

function search(query) {
  renderFunctions.toggleLoader();
  return getImages(query)
    .then(images => {
      renderFunctions.renderImages(images);
    })
    .catch(error => iziToast.error({ message: error }))
    .finally(() => renderFunctions.toggleLoader());
}
