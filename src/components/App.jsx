import { Component } from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { SearchBar } from './Searchbar/Searchbar';
import { BASE_URL, API_KEY, SEARCH_PARAMS } from 'api/api';
import { Circless } from './Loader/Loader';
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
    showLoadMore: true,
  };

  componentDidUpdate(_, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.getValue();
    }
  }

  getValue = () => {
    const { name, page } = this.state;
    // console.log(name);
    this.setState({ loading: true, showLoadMore: true });
    axios
      .get(`${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`)
      .then(response => {
        console.log(response.data.hits);
        if (!response.data.hits.length) {
          Notiflix.Notify.failure('No images found!');
        }
        if (response.data.hits.length < 20) {
          this.setState({ showLoadMore: false });
        }
        this.setState(state => ({
          hits: [...state.hits, ...response.data.hits],
        }));
      })
      .catch(error => {
        console.error(error.message);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  valueFromInput = name => {
    // console.log(name);
    this.setState({ name: name, page: 1, hits: [] });
  };
  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const {
      hits,
      showModal,
      showLoadMore,
      loading,
      largeImageURL,
      tags,
    } = this.state;
    return (
      <div>
        <SearchBar onSubmitHandler={this.valueFromInput} />
        {loading && <Circless />}
        <ImageGallery>
          <ImageGalleryItem articles={hits} onImage={this.toggleModal} />
        </ImageGallery>
        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}
        {hits.length > 0 && showLoadMore && (
          <Button onButtonClick={this.loadMore} />
        )}
      </div>
    );
  }
}
