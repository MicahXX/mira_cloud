import React, { useState } from "react";
import styles from "./Signup.module.css"; // CSS Module Import

function SignupForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:5555/post/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Signup failed");
            } else {
                setSuccess(true);
                setFormData({ username: "", password: "", confirmPassword: "" });
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again later.");
        }
    };

    if (success) {
        return (
            <div className={styles.wrapper}>
                <p className={styles.success}>
                    Account created successfully! You can now log in.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <p className={styles.error}>{error}</p>}

                <input
                    className={styles.input}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />

                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <input
                    className={styles.input}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />

                <button className={styles.button} type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupForm;