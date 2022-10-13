import { PropTypes } from 'prop-types';

import axios from 'axios';
import { toast } from 'react-toastify';

const KEY = '29483891-3b013779f21b0689e33cf999d';
axios.defaults.baseURL = `https://pixabay.com/api`;

export const getImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(
      `?key=${KEY}&per_page=12&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch {
    toast.error('', {
      position: 'top-center',
      autoClose: 3000,
      theme: 'colored',
    });
  }
};

getImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
