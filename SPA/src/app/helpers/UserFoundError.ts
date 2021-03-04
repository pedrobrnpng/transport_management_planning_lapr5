export class UserFoundError extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "UserFoundError"; // (2)
    }
  }