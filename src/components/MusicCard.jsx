import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteMusics: [],
  }

  async componentDidMount() {
    this.setState({ favoriteMusics: await getFavoriteSongs() });
  }

  saveFavoriteMusic = () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      const { favoriteMusics } = this.state;
      this.setState({
        loading: false,
        favoriteMusics: [...favoriteMusics, this.props],
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteMusics } = this.state;

    const favoriteSong = (
      <label htmlFor="favorite">
        ❤️
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          checked={ favoriteMusics.some((music) => music.trackId === trackId) }
          onChange={ this.saveFavoriteMusic }
        />
      </label>
    );

    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        {
          loading ? <Loading /> : favoriteSong
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
