import { PropTypes } from 'prop-types';
import {
  ListItem,
  Img,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <ListItem>
      <Img src={webformatURL} alt={tags} onClick={onClick} />
    </ListItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
