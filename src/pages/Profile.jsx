import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

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
      <div>
        <div>
          <img
            src={ image }
            alt="foto de perfil"
            data-testid="profile-image"
          />
          <div>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        </div>
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {
            loading ? <Loading /> : profileContent
          }
        </div>
      </div>
    );
  }
}
export default Profile;
