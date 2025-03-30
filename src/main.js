import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImages from './js/pixabay-api.js';
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
    const result = await searchImages(query, page);
    callable(result);
  } catch (e) {
    iziToast.error({ message: e.message });
    throw e;
  } finally {
    renderFunctions.toggleLoader();
  }
}

async function search(query) {
  return getImagesWithLoader({ query }, ({ images, pages }) => {
    renderFunctions.renderSearchResults(images);
    loadMoreButton.hidden = pages <= 1;
    loadMoreButton.dataset.query = query;
    loadMoreButton.dataset.page = String(2);
  });
}

async function loadMore() {
  const { query, page } = loadMoreButton.dataset;
  await getImagesWithLoader(
    { query, page: Number(page) },
    ({ images, pages }) => {
      renderFunctions.renderNewPage(images);
      const nextPage = Number(page) + 1;
      loadMoreButton.dataset.page = String(nextPage);

      console.log(nextPage, pages);
      if (nextPage > pages) {
        loadMoreButton.hidden = true;
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  );
}
