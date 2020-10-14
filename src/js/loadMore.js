import refs from './refs';

const loadMoreBtn = {
  enable() {
    refs.loadMoreBtnSpinner.classList.add('is-hidden');
  },
  disable() {
    refs.loadMoreBtnSpinner.classList.remove('is-hidden');
  },
  show() {
    refs.loadMoreBtn.classList.remove('is-hidden');
  },
};

export default loadMoreBtn;