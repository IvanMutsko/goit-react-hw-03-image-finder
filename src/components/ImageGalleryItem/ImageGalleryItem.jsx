import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, toggleModal }) => {
  return images.map(image => (
    <GalleryItem
      key={image.id}
      onClick={() => toggleModal(image.largeImageURL, image.tags)}
    >
      <GalleryImage loading="lazy" src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
