const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  constainsSpecialCharacter: /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/,
  containsUpperLowerCaseCharacter: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
  containsLowerCaseCharacter: /^(?=.*[a-z]).+$/,
  containsUpperCaseCharacter: /^(?=.*[A-Z]).+$/,
  name: /^[\w\s]+$/,
};

const validateEmail = (email: any) => {
  const isValidEmail = regex.email.test(email);

  if (isValidEmail) {
    return undefined;
  }

  return "Invalid email address.";
};

const validateName = (name: any) => {
  const isValidName = regex.name.test(name);
  if (isValidName) {
    return undefined;
  }
  return "Please enter valid name";
};

export { validateEmail, validateName };
