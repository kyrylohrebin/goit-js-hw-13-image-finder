import pictureItem from '../templates/picture-item.hbs';
import refs from './refs';

function updatePicturesMarkup(pictures) {
  const markup = pictureItem(pictures);
  refs.picturesList.insertAdjacentHTML('beforeend', markup);
}

export default updatePicturesMarkup;