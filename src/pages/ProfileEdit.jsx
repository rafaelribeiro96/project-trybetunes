import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    loading: false,
    disableButton: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount = () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, image, description } = user;
      this.setState(
        { name,
          email,
          image,
          description,
          loading: false },
        () => {
          this.saveButtonIsDisabled();
        },
      );
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.saveButtonIsDisabled();
    });
  };

  handleChangeButton = async (event) => {
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      const { history } = this.props;
      history.push('/profile');
    });
  };

  saveButtonIsDisabled = () => {
    const { name, email, image, description } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validateForm = [
      name.length > 0,
      email.length > 0,
      regex.test(email),
      image.length > 0,
      description.length > 0,
    ].every(Boolean);
    this.setState({ disableButton: !validateForm });
  };

  render() {
    const { loading, disableButton, name, email, image, description } = this.state;

    const profileForm = (

      <form className="form-profile-edit">

        <div>
          <img src={ image } alt={ name } />
        </div>
        <div className="div-input-profile">
          <div>
            <label htmlFor="name" className="flex-data-edit-profile">
              <span>Nome:</span>
              <input
                type="text"
                id="name"
                name="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
          </div>

          <div>
            <label htmlFor="email" className="flex-data-edit-profile">
              <span>E-mail:</span>
              <input
                type="text"
                id="email"
                name="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>

          <div>
            <label htmlFor="description" className="flex-data-edit-profile">
              <span>Descrição:</span>
              <input
                type="text"
                id="description"
                name="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
          </div>

          <div>
            <label htmlFor="image" className="flex-data-edit-profile">
              <span> Imagem: </span>
              <input
                placeholder="Insira um link"
                type="text"
                name="image"
                id="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          className="buttonEditProfile"
          data-testid="edit-button-save"
          disabled={ disableButton }
          onClick={ this.handleChangeButton }
        >
          Salvar
        </button>

      </form>

    );

    return (
      <div data-testid="page-profile-edit" className="profile-edit-page">
        <Header />
        <div className="profile-edit-content">
          <h1>Editar perfil</h1>
          {
            loading ? <Loading /> : profileForm
          }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
