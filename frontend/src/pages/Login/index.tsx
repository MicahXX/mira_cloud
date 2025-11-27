import React, { useState, useEffect } from 'react';

function LoginForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    // Check if user is already logged in when component mounts
    useEffect(() => {
        fetch('http://localhost:5555/post/session', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) setLoggedInUser(data.user);
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5555/post/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // needed for sessions
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                setLoggedInUser(null);
            } else {
                setLoggedInUser(data.user);
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong');
        }
    };

    return (
        <div>
            {loggedInUser ? (
                <p style={{ color: 'green' }}>Logged in as: {loggedInUser}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
}

export default LoginForm;
