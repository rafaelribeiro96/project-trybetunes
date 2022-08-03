import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  }

  saveFavoriteMusic = () => {
    this.setState({ loading: true }, async () => {
      const { music } = this.props;
      await addSong({ music });
      this.setState({
        loading: false,
        check: true,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, check } = this.state;
    const favoriteSong = (
      <label htmlFor="favorite">
        ❤️
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          checked={ check }
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
  music: PropTypes.string.isRequired,
};

export default MusicCard;
