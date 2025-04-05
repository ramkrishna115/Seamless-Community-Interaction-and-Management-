import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error as user types
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password.trim() || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        if (!formData.role) {
            newErrors.role = "Please select a role.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (formData.role === "Admin") {
                    navigate("/adminlogin");
                } else if (formData.role === "Resident") {
                    navigate("/userlogin");
                }
            } else {
                setErrors({ ...errors, form: "Signup failed. Please try again." });
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors({ ...errors, form: "Something went wrong. Try again later." });
        }
    };

    return (
        <div className="signup_section">
            <div className="signup_img">
                <img
                    src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment-686x400.jpg"
                    alt=""
                />
            </div>
            <div className="signup_form">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit} noValidate>
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

                    <label htmlFor="role">Role</label>
                    <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="Admin">Admin</option>
                        <option value="Resident">Resident</option>
                    </select>
                    {errors.role && <p className="error">{errors.role}</p>}

                    <button className="formInfo" type="submit">
                        Sign Up
                    </button>
                    {errors.form && <p className="error">{errors.form}</p>}
                </form>
                <p className="formInfo">Existing User?</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default SignUp;
