import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      const { name } = this.state;
      const minCharacters = 2;
      const buttonIsDisabled = name.length < minCharacters;
      this.setState({ isButtonDisabled: buttonIsDisabled });
    });
  }

  render() {
    const { isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input
            type="text"
            name="name"
            id="nameArtist"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleChangeButton }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
