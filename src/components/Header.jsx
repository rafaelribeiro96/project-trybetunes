import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

        <h1>TrybeTunes</h1>

        { loading ? <Loading /> : nameUser }

        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">
                Search
              </Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </nav>

      </header>
    );
  }
}

export default Header;
