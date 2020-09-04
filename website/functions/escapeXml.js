const escapeXML = (unsafe) => {
  const newChar = unsafe.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return '';
    }
  });

  return newChar;
};

export default escapeXML;
