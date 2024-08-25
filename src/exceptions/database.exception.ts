export class DatabaseException extends Error {
  message: string;
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
    Object.setPrototypeOf(this, DatabaseException.prototype);
  }
}
