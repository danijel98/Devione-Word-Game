import { AxiosResponse } from 'axios';
import http from '../../../http-common';

export interface LoginRequest{
    username:string,
    password:string,
}

export class AuthService {
    resourceUrl = '/api/auth';

    async login(user:LoginRequest): Promise<any>{
        const response = await http.post(`${this.resourceUrl}/login`, user);
        if (response.data && response.data.token && response.data.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return response.data;
        }
        return response;
    }


    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    async register(registerData: {
        name: string;
        lastname: string;
        email: string;
        username: string;
        password: string;
      }): Promise<AxiosResponse<any, any>> {
        return await http.post(this.resourceUrl + "/register", registerData);
      }
}

export const authService = new AuthService();