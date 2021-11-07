const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};

  authResponse.principalId = principalId;

  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];

    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;

    policyDocument.Statement[0] = statementOne;

    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
}

module.exports.auth = (event, context, callback) => {
  const token = event.authorizationToken.replace("Bearer ", "");

  if (!token) {
    return callback(null, 'no token - Unauthorized');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return callback(null, generatePolicy(decoded.id, "Deny", event.methodArn));
    }

    return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
  });

  // const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // if (decoded && decoded.id) {
  //   return callback(null, generateAuthResponse(decoded.id, "Allow", event.methodArn));
  // } else {
  //   return callback(null, generateAuthResponse(decoded.id, "Deny", event.methodArn));
  // }
};