import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface LoginProps {
    onSubmit: (email: string, password: string) => void;
    error: string;
}

const LoginForm: React.FC<LoginProps> = ({ onSubmit, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(email, password);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="error">{error}</p>}
            <Button type="submit">Entrar</Button>
        </Form>
    )    
}
export default LoginForm;