/* eslint-disable react/sort-comp */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import type { Element } from 'react';
import { Link } from 'react-router-dom';

const Nav = (): Element<'div'> => (
  <nav className="bg-black  tac  pt4">
    <ul>
      <li className="dib">
        <Link className="title-font  white  dib  pb2  t5  link" to={'/'}>Home</Link>
      </li>
      <li className="dib">
        <Link className="title-font  white  dib  pb2  t5  link" to={'/Authors'}>Authors</Link>
      </li>
      <li className="dib">
        <Link className="title-font  white  dib  pb2  t5  link" to={'/About'}>About Us</Link>
      </li>
      <li className="dib">
        <Link className="title-font  white  dib  pb2  t5  link" to={'/Contact'}>Contact</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
