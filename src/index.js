import './css/styles.css';
import updatePicturesMarkup from './js/updatePicturesMarkup.js';
import fetchAPI from './js/search.js';
import refs from './js/refs.js';

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  fetchAPI.query = form.query.value;

  refs.picturesList.innerHTML = '';
  form.reset;

  fetchAPI.resetPage();

  fetchAPI.fetchPictures().then(pictures => {
    updatePicturesMarkup(pictures);
  });
});
