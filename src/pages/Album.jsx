import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import './Album.css';

class Album extends Component {
state = {
  artist: '',
  album: '',
  image: '',
  musics: [],
  loading: false,
}

componentDidMount() {
  this.musicsFromAlbum();
}

musicsFromAlbum = () => {
  this.setState({ loading: true }, async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const musicsGet = await getMusics(id);

    const { artistName, collectionName, artworkUrl100 } = musicsGet[0];
    this.setState({
      loading: false,
      musics: musicsGet,
      album: collectionName,
      artist: artistName,
      image: artworkUrl100,
    });
  });
}

render() {
  const { artist, album, musics, loading, image } = this.state;

  const onlyMusic = musics.filter((_, index) => index > 0);
  const musicCard = (<MusicCard
    musicObj={ onlyMusic }
  />);

  const songCard = (
    <div className="content">
      <div className="album-content">
        <div className="info-album">
          <h1>Album</h1>
          <img className="img-album-song" src={ image } alt={ artist } />
          <h2 data-testid="album-name">{album}</h2>
          <h3 data-testid="artist-name">{artist}</h3>
        </div>
        <div className="music-card">{ musicCard }</div>
      </div>
    </div>
  );

  return (
    <div data-testid="page-album" className="album-page">
      <Header />
      {
        loading ? <Loading /> : songCard
      }
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
