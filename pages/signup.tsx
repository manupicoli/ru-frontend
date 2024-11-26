import { useState } from "react";
import SignupForm from "./components/signupForm";
import loginService from "./services/loginService";

const Signup: React.FC = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (username: string, email: string, password: string) => {
        const response = await loginService.registerUser({ username, email, password });

        if(response.message === 'User registered') {
            window.location.href = '/login';
        } else {
            setError('Informações inválidas');
        }
    };
    
    return (
        <div className="login-container">
            <h2>Signup</h2>
            <SignupForm onSubmit={handleSubmit} error={error}></SignupForm>
        </div>
    )
}

export default Signup;