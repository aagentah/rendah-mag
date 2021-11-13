export default (text) => {
  const t = text.replace(/&/g, '&amp;');
  return t.replace('&amp;amp;', '&amp;');
};
