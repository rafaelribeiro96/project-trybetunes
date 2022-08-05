import React, { Component } from 'react';
import './NotFound.css';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        <Header />
        <div data-testid="page-not-found" className="page-not-found-content">
          <h1>PAGE NOT FOUND</h1>
        </div>

      </div>
    );
  }
}

export default NotFound;
