const lambdaResponse = ({ json, statusCode, allowCORS = false }) => {
  const response = {
    statusCode,
    body: JSON.stringify(json),
  };

  if (allowCORS) {
    response.headers = {
      "Access-Control-Allow-Origin": "*",
    };
  }

  return response;
};

module.exports.successResponse = (json) =>
  lambdaResponse({
    json,
    statusCode: 200,
  });

module.exports.errorResponse = (json) =>
  lambdaResponse({
    json,
    statusCode: 500,
  });

module.exports.customResponse = (json, code) =>
  lambdaResponse({
    json,
    statusCode: code,
  });

module.exports.unauthorizedResponse = (json) =>
  lambdaResponse({
    json,
    statusCode: 401,
  });
