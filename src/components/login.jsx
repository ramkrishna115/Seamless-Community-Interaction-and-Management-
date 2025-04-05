import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // clear field error
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password.trim() || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoginSuccess(false);

        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const user = await response.json();
                setLoginSuccess(true);
                setTimeout(() => {
                    navigate("/dashboard", { state: { user } });
                }, 1000); // delay to show message
            } else {
                setErrors({ form: "Invalid email or password." });
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrors({ form: "Something went wrong. Please try again." });
        }
    };

    return (
        <div className="login_section">
            <div className="login_img">
                <img
                    src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment-686x400.jpg"
                    alt="Login"
                />
            </div>
            <div className="login_form">
                <div className="title">
                    <h4>Login</h4>
                    <h3>Welcome Back</h3>
                </div>
                <form className="logfrm" onSubmit={handleSubmit} noValidate>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button type="submit">Login</button>

                    {errors.form && <p className="error">{errors.form}</p>}
                    {loginSuccess && <p className="success">Login successful!</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
