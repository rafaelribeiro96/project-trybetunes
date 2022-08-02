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
      <h2 data-testid="header-user-name">{ name }</h2>
    );

    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : nameUser }
      </header>
    );
  }
}

export default Header;
