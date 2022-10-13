import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';

import { Box } from './Box';

import { getImages } from 'api/api';

export class App extends Component {
  state = {
    gallery: [],
    searchQuery: '',
    page: 1,
    total: '',
    loading: false,
    error: false,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      getImages(this.state.searchQuery, this.state.page)
        .then(data =>
          this.setState(prevState => {
            return { gallery: [...prevState.gallery, ...data.hits] };
          })
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSubmit = newSearchQuery => {
    if (newSearchQuery !== this.state.searchQuery) {
      this.setState({
        gallery: [],
        searchQuery: newSearchQuery,
        loading: true,
        page: 1,
      });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  showModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickGalleryImage = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  render() {
    return (
      <Box
        as="main"
        position="relative"
        display="grid"
        gridTemplateColumns="1fr"
        gridGap={16}
        pb={24}
      >
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          gallery={this.state.gallery}
          openModal={this.onClickGalleryImage}
        />
        {this.state.loading && (
          <Box mx="auto">
            <Loader />
          </Box>
        )}
        {this.state.gallery.length > 0 && <Button onClick={this.onLoadMore} />}
        {this.state.showModal && (
          <Modal onClose={this.showModal} url={this.state.largeImageURL} />
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </Box>
    );
  }
}
