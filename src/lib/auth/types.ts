
// Auth request and response types
export interface SignupRequestData {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}
