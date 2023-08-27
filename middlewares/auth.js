const HEADER_KEY = "AUTH-KEY";

async function verifyHeaderKey({ HEADER_KEY }) {
  try {
    if (!HEADER_KEY)
      return {
        success: false,
        error: "Access Denied <> API KEY required.",
      };
    if (HEADER_KEY !== ConfigManager.get("SERVICE_AUTH_KEY"))
      return {
        success: false,
        error: "Access Denied <> API KEY mismatch.",
      };
    return {
      success: true,
    };
  } catch (error) {
    throw new Error("Error in verifyHeaderKey", error);
  }
};

async function verifyCookie(cookie) {
    try{
        await bcrypt.compare(`${mpin}`, userMpin[0].value);
    }catch (error) {
        throw new Error("Error in verifyCookie", error);
      }
};

module.exports.authMiddleware = (req, res, next) => {
  try {
    
  } catch (error) {
    return next(error);
  }
};
