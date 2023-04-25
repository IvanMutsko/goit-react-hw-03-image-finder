import { Component } from 'react';
import { fetchPhotos } from 'api/api';

import { AppBox } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { ModalWindow } from './ModalWindow/ModalWindow';

class App extends Component {
  state = {
    images: [],
    searchWord: '',
    page: 1,
    isModalOpen: false,
    largeImageURL: '',
    imageTags: '',
    onLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchWord !== this.state.searchWord ||
      prevState.page !== this.state.page
    ) {
      this.fetchFunction(this.state.searchWord, this.state.page);
    }
  }

  fetchFunction = (searchWord, page) => {
    fetchPhotos(searchWord, page).then(response =>
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
      }))
    );
  };

  onSubmitForm = searchQuery => {
    this.setState({ searchWord: searchQuery });
  };

  onLoadMore = () => {
    console.log('click on Load more');

    this.setState(prevPage => ({
      page: (prevPage.page += 1),
    }));
  };

  // переглянути цю логіку при закритті модалки
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

          <ImageGallery>
            <ImageGalleryItem
              images={this.state.images}
              toggleModal={this.toggleModal}
            />
          </ImageGallery>

          {this.state.images.length !== 0 ? (
            <Button text="Load more" onClick={this.onLoadMore} />
          ) : null}
        </AppBox>

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
