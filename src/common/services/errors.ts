export class AuthTokenError extends Error {
  constructor() {
    super('Error with authentication token.');
  }
}

export class UnexpectedError extends Error {
  constructor(error: any) {
    super(`Unexpected Error: ${error}`);
  }
}