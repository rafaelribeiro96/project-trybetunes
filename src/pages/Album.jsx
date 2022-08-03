import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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

  const musicsForCard = musics.filter((_, index) => index)
    .map((music, index) => <MusicCard { ...music } { ...this.state } key={ index } />);

  const songCard = (
    <div>
      <Header />
      <h1>Album</h1>
      <img src={ image } alt={ artist } />
      <h2 data-testid="album-name">{album}</h2>
      <h3 data-testid="artist-name">{artist}</h3>
      <div>{ musicsForCard }</div>
    </div>
  );

  return (
    <div data-testid="page-album">
      {
        loading ? <Loading /> : songCard
      }
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape.isRequired,
  params: PropTypes.shape.isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
