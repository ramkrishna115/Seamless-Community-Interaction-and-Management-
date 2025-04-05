import { useState } from "react";
import "../registerpg/adminlogin.css";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        societyName: "",
        flatNo: "",
        postalcode: "",
        role: "resident"
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); 
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
        }
        if (!formData.societyName.trim()) newErrors.societyName = "Society name is required.";
        if (!formData.flatNo.trim()) newErrors.flatNo = "Flat number is required.";
        if (!/^\d{6}$/.test(formData.postalcode.trim())) {
            newErrors.postalcode = "Enter a valid 6-digit postal code.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                mode: "cors",
            });

            const responseData = await response.json();

            if (response.ok) {
                alert("User registered successfully!");
                setFormData({
                    name: "",
                    phoneNumber: "",
                    societyName: "",
                    flatNo: "",
                    postalcode: "",
                    role: "resident"
                });
                setErrors({});
                navigate("/login");
            } else {
                alert(responseData.length ? responseData[0] : "Validation failed");
            }
        } catch {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login_sec">
            <div className="login_imgg">
                <img src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment-686x400.jpg" alt="login banner" />
            </div>
            <div className="login_frm">
                <div className="ttl">
                    <h3>Sign Up</h3>
                </div>

                <form className="form" onSubmit={handleSubmit} noValidate>
                    <label>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <p className="error-text">{errors.name}</p>}

                    <label>Phone Number</label>
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}

                    <label>Society Name</label>
                    <input name="societyName" value={formData.societyName} onChange={handleChange} />
                    {errors.societyName && <p className="error-text">{errors.societyName}</p>}

                    <label>Flat No</label>
                    <input name="flatNo" value={formData.flatNo} onChange={handleChange} />
                    {errors.flatNo && <p className="error-text">{errors.flatNo}</p>}

                    <label>Postal Code</label>
                    <input name="postalcode" value={formData.postalcode} onChange={handleChange} />
                    {errors.postalcode && <p className="error-text">{errors.postalcode}</p>}

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
