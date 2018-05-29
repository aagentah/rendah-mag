/* eslint-disable import/prefer-default-export */

export const convertDate = (date) => {
  const p = date.split(/\D/g);
  console.log([p[2], p[1], p[0]].join('-'));
  return [p[2], p[1], p[0]].join('/');
};
