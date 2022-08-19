export class User {
  constructor(
    public email: string,
    public id: string,
    private tok: string,
    private tokExpirationDate: Date
  ) {}

  get token(): string {
    if (!this.tokExpirationDate || new Date() > this.tokExpirationDate) {
      return null;
    }
    return this.tok;
  }
}
