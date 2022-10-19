const { sendResponse, jwt } = require('../utils');
const config = process.env;
const TokenService = require('../modules/token/token.service');

async function isAuthenticated(req, res, next) {
  const token = req.header('x-auth-token') || req.header('Authorization');
  try {
    if (!token) {
      return sendResponse(res, 401, { tokenExpired: 0 }, 'Failed to Authenticate');
    }

    const decoded = jwt.decryptAccessToken(token);
    // const decoded2 = jwt.verify(token, config.TOKEN_SECRET);
    // console.log('token', token, req.body, decoded);

    // Perform this check if you want to match token user and session user
    let sessionUserInfo = req?.session?.userInfo;
    // console.log('sessionUserInfo', sessionUserInfo);
    // if (decoded.id !== sessionUserInfo._id) {
    //   return sendResponse(res, 401, { tokenExpired: 1 }, 'Token Expired');
    // }

    // Check if token sent matches with DB
    let tokenDoc = await TokenService.getToken({ email: decoded.email });
    // console.log('tokenDoc', tokenDoc);
    if (token != tokenDoc?.token) {
      return sendResponse(res, 401, { tokenExpired: 0 }, 'Corrupt token');
    }

    // if everything is good, save to request for use in other routes
    req.user = decoded;
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendResponse(res, 401, { tokenExpired: 1 }, 'Token Expired');
    } else if (err.name === 'JsonWebTokenError') {
      return sendResponse(res, 401, { tokenExpired: 0 }, 'Corrupt Token');
    } else {
      return sendResponse(res, 401, { tokenExpired: 0 }, err.message);
    }
  }
  return 0;
}

async function getUserId(req) {
  const token = req.header('x-auth-token') || req.header('Authorization');
  const decoded = jwt.decryptAccessToken(token);
  return decoded.id;
}

module.exports = {
  isAuthenticated,
  getUserId
};
