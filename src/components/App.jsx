import { Component } from 'react';

import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
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

  onSubmit = searchQuery => {
    this.setState({
      gallery: [],
      searchQuery,
      loading: true,
    });
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
        <ImageGallery>
          <ImageGalleryItem
            galleryItems={this.state.gallery}
            onClick={this.onClickGalleryImage}
            url={this.state.largeImageURL}
          />
        </ImageGallery>
        {this.state.loading && (
          <Box mx="auto">
            <Loader />
          </Box>
        )}
        {this.state.gallery.length > 0 && <Button onClick={this.onLoadMore} />}
        {this.state.showModal && (
          <Modal onClose={this.showModal} url={this.state.largeImageURL} />
        )}
      </Box>
    );
  }
}
