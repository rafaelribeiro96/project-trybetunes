import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteMusics: [],
  }

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
    const { musicObj } = this.props;
    const { loading, favoriteMusics } = this.state;

    const songCard = (
      <ul className="music-card-content">
        { musicObj.map((music) => {
          const { trackName, trackId, previewUrl } = music;
          return (
            <li className="music-card-item" key={ trackId }>
              <div className="track-name">{ trackName }</div>
              <audio
                className="box-audio-controller"
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
              <label className="labelFavorite" htmlFor="favorite">
                🤍
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
        }) }
      </ul>
    );

    return (
      <div>
        {
          loading ? <Loading /> : songCard
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicObj: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MusicCard;
