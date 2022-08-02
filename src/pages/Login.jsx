import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
    loading: false,
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      const { name } = this.state;
      const minCharacters = 3;
      const buttonIsDisabled = name.length < minCharacters;
      this.setState({ isButtonDisabled: buttonIsDisabled });
    });
  }

  handleChangeButton = async (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
  }

  render() {
    const { isButtonDisabled, loading } = this.state;

    const formLogin = (
      <form>
        <input
          type="text"
          name="name"
          id="nameInput"
          placeholder="Usuário"
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isButtonDisabled }
          onClick={ this.handleChangeButton }
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : formLogin
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Login;
