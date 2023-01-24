import { Component } from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { SearchBar } from './Searchbar/Searchbar';
import { BASE_URL, API_KEY, SEARCH_PARAMS } from 'api/api';
import { SpinnerLoader } from './Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    hits: [],
    name: '',
    page: 1,
    showModal: false,
    loading: false,
    largeImageURL: '',
    tags: '',
  };

  getValue = ({ name, page }) => {
    console.log(name, page);
    this.setState({ loading: true });
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          } else if (name === this.state.name) {
            this.setState(state => ({
              hits: [...state.hits, ...response.data.hits],
              name: name,
              page: state.page + 1,
            }));
          } else {
            this.setState(state => ({
              hits: response.data.hits,
              name: name,
              page: state.page + 1,
            }));
          }
        });
    } catch (error) {
      console.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  loadMore = () => {
    this.getValue(this.state);
  };

  render() {
    const { hits, showModal, loading, largeImageURL, tags } = this.state;
    return (
      <div>
        <SearchBar onSubmitHandler={this.getValue} />
        {loading && <SpinnerLoader />}
        <ImageGallery>
          <ImageGalleryItem articles={hits} onImage={this.toggleModal} />
        </ImageGallery>
        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}
        {hits.length > 0 && <Button onButtonClick={() => this.loadMore()} />}
      </div>
    );
  }
}
