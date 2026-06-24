import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/api'

function Register() {

    const [error, setError] = useState<string[]>([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const newErrors = [];

        if (password.length === 0) newErrors.push('Passwort darf nicht leer sein! ');
        if (email.length === 0) newErrors.push('E-Mail darf nicht leer sein! ');
        if (password!== confirmPassword) newErrors.push('Passwörter stimmen nicht überein! ');

        if (newErrors.length > 0)
        {
            setError(newErrors);
            return
        }

        const response = await registerUser(email, password)
        if (response.ok)
        {
            window.location.href = '/login'
        }
        else
            {
                setError(['Registrierung fehlgeschlagen!'])
            }

    }


    useEffect(() => {
        if (confirmPassword && password !== confirmPassword && password.length > 0) {
            setError(['Passwörter stimmen nicht überein! ']);
        }
        else {
            setError([]);
        }
    }, [confirmPassword, password]);


    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8 relative">
            <Link
                to="/"
                className="absolute left-6 top-6 text-gray-300 hover:text-white text-sm font-medium"
            >
                ← Back
            </Link>

            <div className="bg-gray-900 p-8 w-full max-w-md rounded-3xl shadow-xl shadow-black/20">
                <h1 className="text-white text-3xl font-bold mb-8 text-center">Register</h1>
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
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                        Passwort wiederholen
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-3 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none"
                            placeholder="Passwort bestätigen"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-2xl transition-all duration-200"
                    >
                        Register
                    </button>
                    <div className="text-red-500 text-sm mt-2 font-semibold">
                        {error.map((err, index) => (
                            <p key={index}>{err}</p>
                        ))}
                    </div>
                    <div className="text-center text-sm text-gray-400 mt-4">
                        Schon ein Konto?{' '}
                        <Link to="/login" className="text-green-400 hover:text-green-300 font-medium">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;