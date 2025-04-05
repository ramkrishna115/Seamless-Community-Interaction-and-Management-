import { useState } from "react";
import "../registerpg/adminlogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        societyName: "",
        societyAddress: "",
        city: "",
        district: "",
        postal: "",
        role: "admin"
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
        if (!/^\d{10}$/.test(formData.phoneNumber.trim())) newErrors.phoneNumber = "Valid 10-digit phone number required.";
        if (!formData.societyName.trim()) newErrors.societyName = "Society name is required.";
        if (!formData.societyAddress.trim()) newErrors.societyAddress = "Address is required.";
        if (!formData.city.trim()) newErrors.city = "City is required.";
        if (!formData.district.trim()) newErrors.district = "District is required.";
        if (!/^\d{6}$/.test(formData.postal.trim())) newErrors.postal = "Valid 6-digit postal code required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:8080/admins", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let responseData = {};
            try {
                responseData = await response.json();
            } catch (err) {
                console.error("JSON parse error:", err);
                responseData = { message: "Unexpected server error" };
            }

            if (response.ok) {
                alert("Admin registered successfully!");
                setFormData({
                    name: "",
                    phoneNumber: "",
                    societyName: "",
                    societyAddress: "",
                    city: "",
                    district: "",
                    postal: "",
                    role: "admin"
                });
                setErrors({});
                navigate("/login");
            } else {
                alert(`Error: ${responseData.message || "Registration failed"}`);
            }
        } catch (error) {
            alert("Request failed.");
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className="login_sec">
            <div className="login_imgg">
                <img
                    src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment-686x400.jpg"
                    alt="login visual"
                />
            </div>
            <div className="login_frm">
                <div className="ttl">
                    <h3>Fill These Details To Continue</h3>
                </div>
                <form className="form" onSubmit={handleSubmit} noValidate>
                    <label>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <label>Phone Number</label>
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                    <label>Society Name</label>
                    <input name="societyName" value={formData.societyName} onChange={handleChange} />
                    {errors.societyName && <p className="error">{errors.societyName}</p>}

                    <label>Society Address</label>
                    <input name="societyAddress" value={formData.societyAddress} onChange={handleChange} />
                    {errors.societyAddress && <p className="error">{errors.societyAddress}</p>}

                    <label>City</label>
                    <input name="city" value={formData.city} onChange={handleChange} />
                    {errors.city && <p className="error">{errors.city}</p>}

                    <label>District</label>
                    <input name="district" value={formData.district} onChange={handleChange} />
                    {errors.district && <p className="error">{errors.district}</p>}

                    <label>Postal</label>
                    <input name="postal" value={formData.postal} onChange={handleChange} />
                    {errors.postal && <p className="error">{errors.postal}</p>}

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
