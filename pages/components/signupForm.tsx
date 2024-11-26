import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface SignupProps {
    onSubmit: (userame: string, email: string, password: string) => void;
    error: string;
}

const SignupForm: React.FC<SignupProps> = ({ onSubmit, error }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(username, email, password);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Nome:</label>
                <input
                    type="username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
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
            <Button type="submit">Criar conta</Button>
        </Form>
    )    


}

export default SignupForm;