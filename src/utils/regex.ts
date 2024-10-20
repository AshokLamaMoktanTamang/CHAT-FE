const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  constainsSpecialCharacter: /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/,
  containsUpperLowerCaseCharacter: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
  containsLowerCaseCharacter: /^(?=.*[a-z]).+$/,
  containsUpperCaseCharacter: /^(?=.*[A-Z]).+$/,
};

const validateEmail = (email: any) => {
  const isValidEmail = regex.email.test(email);

  if (isValidEmail) {
    return undefined;
  }

  return "Invalid email address.";
};

export { validateEmail };
