export default (type, value) => {
  const typeLetter = type === 'padding' ? 'pv' : 'mv';
  const spacingValue = value + 1;

  return `${typeLetter}${spacingValue}`;
};
