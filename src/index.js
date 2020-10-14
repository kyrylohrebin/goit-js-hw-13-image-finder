import './css/styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import updatePicturesMarkup from './js/updatePicturesMarkup.js';
import fetchAPI from './js/search.js';
import refs from './js/refs.js';
import loadMoreBtn from './js/loadMore.js';

refs.loadMoreBtn.addEventListener('click', fetchPictures);

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const form = event.currentTarget;
  fetchAPI.query = form.elements.query.value;

  clearGallery();

  fetchAPI.fetchPictures();
  fetchPictures();
  form.reset();
});


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
    .catch(pnError => {
      error({
        title: 'Wrong query! Please try again',
      });
});
}

function clearGallery() {
  refs.picturesList.innerHTML = '';
}