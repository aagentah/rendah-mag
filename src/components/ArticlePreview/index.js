/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../containers/App/assets/overlay.png';

export class Article extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    console.log('this.hello.offsetHeight', this.hello.offsetHeight);
    this.setState({ height: this.hello.offsetHeight });
  }

  render() {
    const article = this.props.info;

    return (
      <React.Fragment>
        <div className="article-preview">
          <div className="article-preview__image-wrapper">
            <img
              className="article-preview__overlay"
              src={Overlay}
              alt={article.img}
              ref={(c) => { this.hello = c; }}
              onLoad={(image) => { console.log(image); }}
            />

            <img
              className="article-preview__image"
              src={article.img}
              alt={article.img}
              style={{ height: this.state.height }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  info: PropTypes.shape({
    article: PropTypes.shape({}),
  }),
};

Article.defaultProps = {
  info: {
    article: {},
  },
};

export default Article;
