import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ articles, onImage }) {
  return (
    <>
      {articles.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={css.image} key={id}>
          <img
            src={webformatURL}
            alt="response from API"
            className={css.ImageGalleryItemImage}
            onClick={() => onImage(largeImageURL, tags, id)}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  onImage: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
