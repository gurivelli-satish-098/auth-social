const LOGIN_TYPES = {
  password: "Password",
};

const loginIdTypeMap = {
  1: "password",
};

const loginTypeIdMap = {
  password: 1,
};

const loginTypeDetails = {
  password: {
    id: 1,
    name: "Password",
    expiry: "525960", // in minutes
  },
};

module.exports = {
  LOGIN_TYPES,
  loginIdTypeMap,
  loginTypeIdMap,
  loginTypeDetails
};
