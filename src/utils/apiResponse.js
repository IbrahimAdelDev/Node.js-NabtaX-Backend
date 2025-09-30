exports.successResponse = (data) => ({
  status: 'success',
  data,
})

exports.errorResponse = (message) => ({
  status: 'error',
  message,
})