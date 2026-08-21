export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface DirectoryUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ApiError {
  code?: string;
  message: string;
}
