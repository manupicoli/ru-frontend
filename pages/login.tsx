import { useState } from "react";
import LoginForm from "./components/loginForm";
import loginService from "./services/loginService";

const Login: React.FC = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (email: string, password: string) => {
        const response = await loginService.login({email, password});

        if(!response.success) {
            setError('Usuário ou senha incorretos');
        } else {
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem("role", response.data.user.role);
            window.location.href = '/reservas';
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <LoginForm onSubmit={handleSubmit} error={error}/>
        </div>
    )
}

export default Login;