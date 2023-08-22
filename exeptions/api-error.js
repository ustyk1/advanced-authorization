module.exports = class ApiError extends Error {
  status;
  errors;
  constructor(status, message, error = []) {
    super(message);
    this.status = status;
    this.errors = error;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Користувач не авторизований');
  }
  static BadRequest(message, error = []) {
    return new ApiError(400, message, error);
  }
}
