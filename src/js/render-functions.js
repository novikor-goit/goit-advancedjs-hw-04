import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function toggleLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('active');
}

const gallery = new SimpleLightbox('#gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryElement = document.querySelector('#gallery');

function renderImages(images) {
  galleryElement.innerHTML = images
    .map(
      image =>
        `<li class="gallery-item">
              <a href="${image.largeImageURL}"><img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}"/></a>
              <ul class="gallery-item-desc">
                <li>
                  <h3>Likes</h3>
                  <p>${image.likes}</p>
                </li>
                <li>
                  <h3>Views</h3>
                  <p>${image.views}</p>
                </li>
                <li>
                  <h3>Comments</h3>
                  <p>${image.comments}</p>
                </li>
                <li>
                  <h3>Downloads</h3>
                  <p>${image.downloads}</p>
                </li>
              </ul>
        </li>`
    )
    .join('');
  gallery.refresh();
}

export { renderImages, toggleLoader };
