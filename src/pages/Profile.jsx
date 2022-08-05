import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  state = {
    profile: {
      name: '',
      email: '',
      description: '',
      image: '',
    },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const profileSave = await getUser();
      this.setState({ loading: false, profile: profileSave });
    });
  }

  render() {
    const {
      loading,
      profile:
            {
              name,
              email,
              description,
              image,
            },
    } = this.state;

    const profileContent = (
      <div className="profile-content">
        <div>
          <img
            src={ image }
            alt="foto de perfil"
            data-testid="profile-image"
            className="profile-image"
          />
          <div>
            <Link to="/profile/edit" className="link-profile">Editar perfil</Link>
          </div>
        </div>

        <div className="data-profile">
          <div className="flex-data-profile">
            <span className="title-value">Nome de usuário:</span>
            <span className="value">{name}</span>
          </div>
          <div className="flex-data-profile">
            <span className="title-value">E-mail:</span>
            <span className="value">{email}</span>
          </div>
          <div className="flex-data-profile">
            <span className="title-value">Descrição:</span>
            <span className="value">{description}</span>
          </div>
        </div>
      </div>
    );

    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        <div className="profile-page">
          <h1 className="title-profile">Perfil</h1>
          {
            loading ? <Loading /> : profileContent
          }
        </div>
      </div>
    );
  }
}
export default Profile;
