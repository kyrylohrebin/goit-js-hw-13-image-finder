import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const apiKey = '18662312-a5f7d9a00f5eb78409595edb4';

export default {
  searchQuery: '',
  pageNumber: '',

  async fetchPictures() {
    try {
      const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${apiKey}`;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      };

      const response = await fetch(url, options);
      const { hits, total } = await response.json();
      if (!hits.length) return;
      if (!total) return error('Wrong query! Please try again');
      return { hits, total };
    } catch (err) {
      error();
    }
  },
  resetPage() {
    this.pageNumber = 1;
  },
  incrementPage() {
    this.pageNumber += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
