import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images }) => {
  return images.map(image => (
    <GalleryItem key={image.id}>
      <GalleryImage loading="lazy" src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  ));
};
