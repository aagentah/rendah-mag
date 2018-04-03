import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

export class NotFound extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="Oops" />
        <p>Oops, Page was not found!</p>
      </main>
    );
  }
}

export default NotFound;
