const successResponse = (res, data, meta = {}) => {
  res.json({
    success: true,
    count: Array.isArray(data) ? data.length : 1,
    data,
    meta,
  });
};

const errorResponse = (res, message, status = 500) => {
  res.status(status).json({
    success: false,
    error: message,
  });
};

module.exports = { successResponse, errorResponse };