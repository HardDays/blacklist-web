export class TokenModel {
    constructor(
        public token?: string
    ) {}
}

export interface UserModel {
  id: number;
  email: string;
  user_type: string;
  image_id: number;
  is_payed: boolean;
  is_admin: boolean;
  image?: string;
  name?: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  second_name: string;
  birthday?: string;
  gender?: string;
  education?: string;
  education_year?: number;
  contacts?: string;
  skills?: string;
  experience?: string;
  status?: string;
  position?: string;
  jobs?: any;
  image?: string;
}

export interface Company {
  id: number;
  name: string;
  description?: string;
  contacts?: string;
  address?: string;
}

export interface Job {
  id?: number;
  name: string;
  period: string;
  position?: string;
  description?: string;
}

export interface Vacancie {
  id: number;
  company_id: number;
  company_name: string;
  position: string;
  salary: string;
  description: string;
  min_experience: number;
}

export interface BlackListItem {
  id?: number;
  name: string;
  description: string;
  addresses?: string;
  text?: string;
  item_type?: string;
}
export interface Comment {
  id?: number;
  comment_type: string;
  text: string;
  user?: UserModel;
  created_at?: string;
}
