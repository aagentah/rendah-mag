export default (align) => {
  switch (align) {
    case 'left':
      return 'tal';
    case 'center':
      return 'tac';
    case 'right':
      return 'tar';
    default:
      return 'tal';
  }
};
