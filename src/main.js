import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImages from './js/pixabay-api.js';
import * as renderFunctions from './js/render-functions.js';

const form = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  await search(form.elements.query.value);
  form.reset();
});

loadMoreButton.addEventListener('click', loadMore);

async function getImagesWithLoader({ query, page = 1 }, callable) {
  renderFunctions.toggleLoader();
  try {
    const images = await getImages(query, page);
    callable(images);
  } catch (e) {
    loadMoreButton.hidden = true;
    iziToast.error({ message: e.message });
    console.error(e);
  } finally {
    renderFunctions.toggleLoader();
  }
}

async function search(query) {
  return getImagesWithLoader({ query }, images => {
    renderFunctions.renderSearchResults(images);
    loadMoreButton.hidden = false;
    loadMoreButton.dataset.query = query;
    loadMoreButton.dataset.page = String(2);
  });
}

async function loadMore() {
  const { query, page } = loadMoreButton.dataset;
  await getImagesWithLoader(
    { query, page: Number(page) },
    renderFunctions.renderNewPage
  );

  loadMoreButton.dataset.page = String(Number(page) + 1);
}
