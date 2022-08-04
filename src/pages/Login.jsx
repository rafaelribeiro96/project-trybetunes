import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

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
      <form className="form-login">
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
          ▶️
        </button>
      </form>
    );

    return (
      <div data-testid="page-login" className="content-login">
        <h1>TrybeTunes</h1>
        {
          loading ? <Loading /> : formLogin
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Login;
