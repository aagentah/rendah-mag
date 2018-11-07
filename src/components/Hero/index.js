/* eslint-disable eslint-disablee */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Hero extends PureComponent {
  heading = (type, title) => {
    switch (type) {
      case 'h1':
        return <h1 className="dn">{title}</h1>;
      case 'h2':
        return <h2 className="dn">{title}</h2>;
      case 'h3':
        return <h3 className="dn">{title}</h3>;
      case 'h4':
        return <h4 className="dn">{title}</h4>;
      case 'h5':
        return <h5 className="dn">{title}</h5>;
      case 'h6':
        return <h6 className="dn">{title}</h6>;
      default:
        return null;
    }
  };

  loopChars = (title, styles) => {
    const letters = [];
    let letterDisplay;

    for (let i = 0; i < title.length; i += 1) {
      const char = title.charAt(i);
      letterDisplay = (!char || char === ' ' || char === '  ') ? 'db' : 'dib';

      letters.push(
        <span key={i} className={`${styles}  ${letterDisplay}  rel  hero__letter  hero__letter--${i}`}>
          {char}
        </span>,
      );
    }
    return letters;
  };

  render() {
    const { type, title, styles, padding } = this.props;
    const image = 'https://res.cloudinary.com/dzz8ji5lj/image/upload/e_blur:1500/v1539787080/brand/Big_Canvas_Textures_opt.jpg';

    return (
      <div className={padding}>
        <div className="w-100  center  h6  flex  justify-center  align-center  hero" style={{ backgroundImage: `url(${image})` }}>
          <div className="flex">
            <div className="col-24  ph4">
              {this.heading(type, title)}
              {this.loopChars(title, styles)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.string,
  padding: PropTypes.string,
};

Hero.defaultProps = {
  type: '',
  title: '',
  styles: '',
  padding: '',
};

export default Hero;
