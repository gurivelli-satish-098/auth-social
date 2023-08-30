const roleNameIdMap = {
  Admin: 1,
  User: 2,
};

const roles = {
  admin: "Admin",
  user: "User",
};

const roleIdNameMap = {
  1: "Admin",
  2: "User",
};

const roleSecretMap = {
  admin: "master-password",
  user: "credentails",
};

module.exports = { roleIdNameMap, roleNameIdMap, roles, roleSecretMap };
