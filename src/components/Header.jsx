import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({
        name,
        loading: false,
      });
    });
  }

  render() {
    const { name, loading } = this.state;
    const nameUser = (
      <h3 data-testid="header-user-name">{`Usuário: ${name}`}</h3>
    );

    return (
      <header data-testid="header-component">
        <h1>TryberTunes</h1>
        { loading ? <Loading /> : nameUser }
      </header>
    );
  }
}

export default Header;
