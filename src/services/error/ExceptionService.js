import {
  BadRequestHandler,
  ExceptionHandler,
  NotFoundHandler,
  ServerErrorHandler,
  UnauthorizedHandler,
} from "./ExceptionHandler";

class ExceptionService {
  constructor() {
    this.handlers = {
      400: new BadRequestHandler(),
      401: new UnauthorizedHandler(),
      404: new NotFoundHandler(),
      500: new ServerErrorHandler(),
    };

    this.defaultHandler = new ExceptionHandler();
  }

  handleException(exception) {
    if (!exception || typeof exception !== "object") {
      this.defaultHandler.handle("An unknown error occurred!");
      return;
    }

    const { message, statusCode } = exception;

    // Use the handler for the status code or fall back to the default handler
    const handler = this.handlers[statusCode] || this.defaultHandler;
    handler.handle(message);
  }
}

const exceptionService = new ExceptionService();
export default exceptionService;
