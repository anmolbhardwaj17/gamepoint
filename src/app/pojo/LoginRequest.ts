export class LoginRequest {
    email: string;
    password: string;
    public constructor(init?: Partial<LoginRequest>) {
      Object.assign(this, init);
    }
  }
  