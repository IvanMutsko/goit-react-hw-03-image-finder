import { Component } from 'react';
import { fetchAPI } from 'api/api';

import { AppBox } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { ModalWindow } from './ModalWindow/ModalWindow';
import { Loader } from './Loader/Loader';

const scrollDown = page => {
  const { height: cardHeight } = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect();

  console.log(page);

  const heightDown = cardHeight * 3 * page;

  window.scrollTo({
    top: heightDown,
    behavior: 'smooth',
  });
};

class App extends Component {
  state = {
    images: [],
    searchWord: '',
    page: 1,
    isModalOpen: false,
    largeImageURL: '',
    imageTags: '',
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchWord !== this.state.searchWord ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });

      this.fetchPhotos(this.state.searchWord, this.state.page);
    }
  }

  onSubmitForm = searchQuery => {
    this.setState({
      searchWord: searchQuery,
      images: [],
      page: 1,
    });
  };

  fetchPhotos = async (searchWord, page) => {
    try {
      this.setState({ loading: true, error: null });
      const fetchedPhotos = await fetchAPI(searchWord, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...fetchedPhotos.hits],
      }));
    } catch (error) {
      this.setState({ error: 'ERRRRRRROR' });
    } finally {
      this.setState({ loading: false });
    }
  };

  onLoadMore = () => {
    this.setState(
      prevPage => ({
        page: (prevPage.page += 1),
      }),
      scrollDown(this.state.page)
    );
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ isModalOpen }) => {
      if (!this.state.isModalOpen) {
        return {
          isModalOpen: !isModalOpen,
          largeImageURL: largeImageURL,
          imageTags: tags,
        };
      }
      return {
        isModalOpen: !isModalOpen,
        largeImageURL: '',
        imageTags: '',
      };
    });
  };

  render() {
    return (
      <>
        <AppBox>
          <Searchbar onSubmit={this.onSubmitForm} />

          {!this.state.loading && (
            <ImageGallery>
              <ImageGalleryItem
                images={this.state.images}
                toggleModal={this.toggleModal}
              />
            </ImageGallery>
          )}

          {this.state.images.length !== 0 ? (
            <Button text="Load more" onClick={this.onLoadMore} />
          ) : null}
        </AppBox>

        {this.state.loading && <Loader />}

        {this.state.isModalOpen && (
          <ModalWindow
            imageURL={this.state.largeImageURL}
            imageTags={this.state.imageTags}
            toggleModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default App;
