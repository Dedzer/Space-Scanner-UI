export class User {

  token:string
  role:string | null

  constructor(any:any) {
    this.token = any.token;
    this.role = any.role;
  }
}
