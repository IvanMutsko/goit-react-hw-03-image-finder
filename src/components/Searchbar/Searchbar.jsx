import { Component } from 'react';
import { GoSearch } from 'react-icons/go';

import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onChangeInput = evt => {
    const { value } = evt.currentTarget;
    this.setState({ searchQuery: value });
  };

  onSearch = evt => {
    evt.preventDefault();

    const { searchQuery } = this.state;

    this.setState({ searchQuery: '' });

    this.props.onSubmit(searchQuery);
  };

  render() {
    return (
      <SearchbarBox>
        <SearchForm onSubmit={this.onSearch}>
          <SearchFormButton type="submit">
            <GoSearch size="50%" />
          </SearchFormButton>

          <SearchFormInput
            id="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
          />
        </SearchForm>
      </SearchbarBox>
    );
  }
}
