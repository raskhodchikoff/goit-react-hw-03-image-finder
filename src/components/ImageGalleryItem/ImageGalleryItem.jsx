import { PropTypes } from 'prop-types';
import {
  ListItem,
  Img,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ galleryItems, onClick }) => {
  return (
    <>
      {galleryItems.map(({ id, webformatURL, largeImageURL }) => (
        <ListItem key={id} onClick={() => onClick(largeImageURL)}>
          <Img src={webformatURL} alt="" />
        </ListItem>
      ))}
    </>
  );
};

ImageGalleryItem.propType = {
  galleryItems: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
