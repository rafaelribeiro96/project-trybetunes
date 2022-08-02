import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    nameArtist: '',
    isButtonDisabled: true,
    loading: false,
    albuns: [],
    artist: '',

  }

  handleChange = (event) => {
    this.setState({ nameArtist: event.target.value }, () => {
      const { nameArtist } = this.state;
      const minCharacters = 2;
      const buttonIsDisabled = nameArtist.length < minCharacters;
      this.setState({ isButtonDisabled: buttonIsDisabled });
    });
  }

  handleChangeButton = async (e) => {
    e.preventDefault();
    const { nameArtist } = this.state;
    this.setState({ loading: true, artist: nameArtist });
    const getAlbuns = await searchAlbumsAPI(nameArtist);
    this.setState({
      albuns: [...getAlbuns],
      loading: false,
      nameArtist: '',
    });
  }

  render() {
    const { isButtonDisabled, loading, albuns, nameArtist, artist } = this.state;

    const substringDate = 10;

    const searchAlbum = (
      <div>

        {
          (albuns.length !== 0) ? (

            <div>
              <h3>{`Resultado de álbuns de: ${artist}`}</h3>

              {albuns.map(({
                artistName,
                collectionId,
                collectionName,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    <h2>{collectionName}</h2>
                    <h3>{artistName}</h3>
                    <img src={ artworkUrl100 } alt={ artistName } />
                  </Link>
                  <p>
                    {`Data de lançamento: ${releaseDate.substring(substringDate, 0)}`}
                  </p>
                  <p>{`Faixas: ${trackCount}`}</p>
                </div>
              ))}

            </div>

          ) : (<h2>Nenhum álbum foi encontrado</h2>)
        }

      </div>
    );

    return (
      <div data-testid="page-search">
        <Header />

        <h1>Search</h1>

        <form>
          <input
            type="text"
            name="nameArtist"
            id="nameArtist"
            value={ nameArtist }
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

        <div>
          {
            loading ? <Loading /> : searchAlbum
          }
        </div>

      </div>
    );
  }
}

export default Search;
