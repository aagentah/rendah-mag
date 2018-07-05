/* eslint-disable import/prefer-default-export, arrow-body-style */

export const convertDate = (date) => {
  const p = date.split(/\D/g);
  console.log([p[2], p[1], p[0]].join('-'));
  return [p[2], p[1], p[0]].join('/');
};

export const toTitleCase = (str) => {
  const val = str.replace(/-/g, ' ');
  return val.replace(
    /\w\S*/g,
    (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    },
  );
};

export const toUrlCase = str => str.replace(/\s+/g, '-').toLowerCase();
