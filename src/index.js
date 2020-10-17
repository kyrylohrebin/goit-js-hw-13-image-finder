import './css/styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import updatePicturesMarkup from './js/updatePicturesMarkup.js';
import fetchAPI from './js/search.js';
import refs from './js/refs.js';
import loadMoreBtn from './js/loadMore.js';
import * as basicLightbox from 'basiclightbox';

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const form = event.currentTarget;
  fetchAPI.query = form.elements.query.value;

  if (fetchAPI.query !== '') {
    clearGallery();

    fetchAPI.resetPage();
    fetchPictures();
  }
});

refs.loadMoreBtn.addEventListener('click', fetchPictures);

function fetchPictures() {
  loadMoreBtn.disable();

  fetchAPI.fetchPictures().then(pictures => {
      if (!pictures) return error('Wrong query! Please try again');
      updatePicturesMarkup(pictures);
      loadMoreBtn.show();
      loadMoreBtn.enable();
      fetchAPI.incrementPage();

      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })

}

function clearGallery() {
  refs.picturesList.innerHTML = '';
}

refs.picturesList.addEventListener('click', openLargeImage);

function openLargeImage(event) {

  const largeImageURL = event.target.dataset.source;
  openModal(largeImageURL);
}

function openModal(url) {
  basicLightbox.create(`<img width="1600" height="900" src="${url}">`).show();
}