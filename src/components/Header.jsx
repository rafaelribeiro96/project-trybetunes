import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

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
      <div className="user">
        <Link to="/profile" className="link-tittle">
          <h3 className="user-name" data-testid="header-user-name">{`👤 ${name}`}</h3>
        </Link>
        <Link to="/" className="link-tittle">
          <h3 className="logout">Sair</h3>
        </Link>
      </div>
    );

    return (
      <header data-testid="header-component" className="header">

        <div className="header-top">
          <div className="title">
            <Link to="/search" className="link-tittle">
              <h1>🎧 TrybeTunes</h1>
            </Link>
          </div>

          { loading ? <Loading /> : nameUser }
        </div>

        <nav className="navegation">
          <Link data-testid="link-to-search" to="/search" className="link">
            Search
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites" className="link">
            Favorites
          </Link>
          <Link data-testid="link-to-profile" to="/profile" className="link">
            Profile
          </Link>
        </nav>

      </header>
    );
  }
}

export default Header;
