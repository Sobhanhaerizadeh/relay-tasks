import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../services/api'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string[]>([]);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const newErrors: string[] = [];

        if (email.length === 0) newErrors.push('E-Mail darf nicht leer sein! ');
        if (password.length === 0) newErrors.push('Passwort darf nicht leer sein! ');

        if (newErrors.length > 0) {

            setError(newErrors);
            return;
        }
        
            const response = await loginUser(email, password)

        if (response.ok) {
            localStorage.setItem('token', 'fake-token');
            window.location.href = '/dashboard';
        } else {
            setError(['Ungültige E-Mail oder Passwort!']);
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8 relative">
            <Link
                to="/"
                className="absolute left-6 top-6 text-gray-300 hover:text-white text-sm font-medium"
            >
                ← Back
            </Link>

            <div className="bg-gray-900 p-8 w-full max-w-md rounded-3xl shadow-xl shadow-black/20">
                <h1 className="text-white text-3xl font-bold mb-8 text-center">Login</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                        E-Mail
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-3 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none"
                            placeholder="E-Mail"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                        Passwort
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-3 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none"
                            placeholder="Passwort"
                        />
                    </label>
                    <div className="text-right">
                        <a href="#" className="text-sm text-gray-400 hover:text-gray-100">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-2xl transition-all duration-200"
                    >
                        Login
                    </button>
                    <div className="text-red-500 text-sm mt-2 font-semibold">
                        {error.map((err, index) => (
                            <p key={index}>{err}</p>
                        ))}
                    </div>
                    <div className="text-center text-sm text-gray-400 mt-4">
                        Noch kein Konto?{' '}
                        <Link to="/register" className="text-green-400 hover:text-green-300 font-medium">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;