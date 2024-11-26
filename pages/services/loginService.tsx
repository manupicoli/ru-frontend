import axios from "axios";
const baseUrl = 'http://localhost:3001/webmob';

export interface loginDTO{
    email?: string,
    password?: string
}

export interface signupDTO{
    username?: string,
    email?: string,
    password?: string
}

class LoginService {
    async registerUser(payload: signupDTO) {
        try{
            const response = await axios.post(`${baseUrl}/signup`, {
                username: payload.username,
                email: payload.email,
                password: payload.password
            });

            return response.data;
        } catch (error){
            console.log('Error fetching data: ', error);
        }
    }
    
    async login(payload: loginDTO) {
        try {
            const response = await axios.post(`${baseUrl}/login`, {
                email: payload.email,
                password: payload.password
            });
            return { success: true, data: response.data };
        } catch (err) {
            return { success: false, message: "Ocorreu um erro inesperado. Tente novamente mais tarde." };
        }
    }         
}

export default new LoginService