
export interface UserToRegister {
    name: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
  }
  
 export interface UserToLogin {
    email: string;
    password: string;
  }
  
 export interface LoginResponse {
    success: boolean;
    message?: string;
    token?: string;
  }
  
export  interface RegisterError {
    messageName?: string;
    messageLastName?: string;
    messageEmail?: string;
    messagePassword?: string;
    messageRepeatPassword?: string;
  }