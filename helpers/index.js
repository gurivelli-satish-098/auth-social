const { CHARSET_FOR_USERNAME, USER_LENGTH } = require("../constants");
const { BaseError } = require("../core/errors/base-error");
const { InternalError } = require("../core/errors/errors");

const createRandomString = (strLen) => {
  let str = "";
  const charSetLength = CHARSET_FOR_USERNAME.length;
  for (let i = 0; i < strLen; i++) {
    str += CHARSET_FOR_USERNAME[Math.floor(Math.random() * charSetLength)];
  }
  return str;
};

const validateUserNameAndPassword = (str) => {
  try {
    const regex = new RegExp(
      "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*_.]{8,15}$"
    );
    return regex.test(str);
  } catch (error) {
    if (error instanceof BaseError) throw error;
    throw new InternalError("Error in validateUserName", error);
  }
};

module.exports = { createRandomString, validateUserNameAndPassword };
