export class TokenModel {
    constructor(
        public token?: string
    ) {}
}

export interface UserModel {
  id: number;
  email: string;
}

export interface LoginModel {
  email: string;
  password: string;
}
