import { notification } from "antd";

class ExceptionHandler {
  handle(message) {
    notification.error({
      message: "Error",
      description: message || "An unexpected error occurred.",
    });
  }
}

class BadRequestHandler extends ExceptionHandler {
  handle(message) {
    notification.warning({
      message: "Bad Request",
      description: message || "Invalid request sent to the server.",
    });
  }
}

class UnauthorizedHandler extends ExceptionHandler {
  handle(message) {
    notification.warning({
      message: "Unauthorized",
      description: message || "You are not authorized to perform this action.",
    });
  }
}

class NotFoundHandler extends ExceptionHandler {
  handle(message) {
    notification.info({
      message: "Not Found",
      description: message || "The requested resource was not found.",
    });
  }
}

class ServerErrorHandler extends ExceptionHandler {
  handle(message) {
    notification.error({
      message: "Server Error",
      description: message || "An internal server error occurred.",
    });
  }
}

export {
  ExceptionHandler,
  BadRequestHandler,
  UnauthorizedHandler,
  NotFoundHandler,
  ServerErrorHandler,
};
