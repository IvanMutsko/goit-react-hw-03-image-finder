import { Component } from 'react';
import { fetchPhotos } from 'api/api';

import { AppBox } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

class App extends Component {
  state = {
    images: [],
    searchWord: '',
    page: 1,
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
      this.setState({ images: [...response.hits] })
    );
  };

  onSubmitForm = searchQuery => {
    this.setState({ searchWord: searchQuery });
  };

  render() {
    return (
      <AppBox>
        <Searchbar onSubmit={this.onSubmitForm} />

        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
        </ImageGallery>
        <Button text="Load more" />
      </AppBox>
    );
  }
}

export default App;
