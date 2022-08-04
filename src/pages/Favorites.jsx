import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  state = {
    favoriteMusics: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favoriteMusicsSave = await getFavoriteSongs();
      this.setState({ loading: false, favoriteMusics: favoriteMusicsSave });
    });
  }

  saveFavoriteMusics = async (musicObj) => {
    const { favoriteMusics } = this.state;

    if (favoriteMusics.some((check) => check.trackId === musicObj.trackId)) {
      this.setState({ loading: true });
      await removeSong(musicObj);
      const removeMusic = favoriteMusics
        .filter((musicRemove) => musicRemove.trackId !== musicObj.trackId);
      return this.setState({ favoriteMusics: removeMusic, loading: false });
    }

    this.setState({ loading: true }, async () => {
      await addSong(musicObj);
      this.setState({ loading: false, favoriteMusics: [...favoriteMusics, musicObj] });
    });
  }

  render() {
    const { loading, favoriteMusics } = this.state;

    const favoriteListContent = (
      <div>
        <h1 className="title-favorites">Músicas Favoritas</h1>
        <div>
          <ul className="music-card-content-favorites ">
            {favoriteMusics.map((music) => {
              const { artworkUrl100, trackName, previewUrl, trackId } = music;
              return (
                <li className="music-card-item-favorites" key={ trackId }>
                  <img className="img-favorite" src={ artworkUrl100 } alt={ trackName } />
                  <div className="track-name-favorites">{ trackName }</div>
                  <audio
                    className="box-audio-controller-favorites"
                    data-testid="audio-component"
                    src={ previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label className="labelFavorites" htmlFor="favorite">
                    Favorita
                    <input
                      type="checkbox"
                      name="favorite"
                      id="favorite"
                      data-testid={ `checkbox-music-${trackId}` }
                      checked={ favoriteMusics
                        .some((check) => check.trackId === trackId) }
                      onChange={ () => this.saveFavoriteMusics(music) }
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );

    return (
      <div className="page-favorites">
        <Header />
        <div>
          {
            loading ? <Loading /> : favoriteListContent
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
