import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onSubmitData = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);

    if (this.state.query.trim() === '') {
      alert('Please enter your request');
      return;
    }

    this.setState({ query: '' });
  };

  onInputChange = event => {
    this.setState({ query: event.target.value.toLowerCase() });
    console.log(event.target.value);
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.onSubmitData}>
          <SearchFormButton type="submit" className="SearchForm-button">
            <FaSearch size="20px" />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.query}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
