const CHARSET_FOR_USERNAME =
  "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_.";
const ADMIN_USER_NAME_LENGTH = 5; // Admin userName should be ADMIN_ + random string of length 5

const USER_LENGTH = {
  min : 8,
  max: 15,
} // for both password and userName

module.exports = { CHARSET_FOR_USERNAME, ADMIN_USER_NAME_LENGTH, USER_LENGTH };
