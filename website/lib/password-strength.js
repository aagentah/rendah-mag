import passwordValidator from 'password-validator';

export default (password) => {
  // Create a schema
  const schema = new passwordValidator();

  const minChar = 8;
  const maxChar = 100;
  const blackList = ['password'];

  // Add properties to it
  schema
    .is()
    .min(minChar) // Minimum length
    .is()
    .max(maxChar) // Maximum length
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(blackList); // Blacklist these values

  const list = schema.validate(password, { list: true });
  let message = '';

  if (
    schema.validate(password) &&
    schema.validate(password, { list: true }).length === 0
  ) {
    message = 'Secure Password.';

    return {
      isValid: true,
      message,
    };
  }
  message = 'Insecure Password. ';

  for (let i = 0; i < list.length; i += 1) {
    switch (list[i]) {
      case 'min':
        message += `Minimum ${minChar} characters. `;
        break;
      case 'max':
        message += `Max ${maxChar} characters. `;
        break;
      case 'uppercase':
        message += 'Should have at least 1 uppercase character. ';
        break;
      case 'digits':
        message += 'Should have at least 1 number. ';
        break;
      case 'spaces':
        message += 'Should not have spaced. ';
        break;
      case 'oneOf':
        message += "Should not be 'password'. ";
        break;
      default:
    }
  }

  return {
    isValid: false,
    message,
  };
};
