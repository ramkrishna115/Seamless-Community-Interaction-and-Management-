import { useState } from "react";
import axios from "axios";
import "./ui/Billings.css";

const Billings = () => {
  const [name, setName] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [amount, setAmount] = useState("");
  const [billingSuccess, setBillingSuccess] = useState(false);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  

  const handleBilling = async () => {
    if (!name || !flatNo || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const isLoaded = await loadRazorpay();
    
  if (!isLoaded) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

    const options = {
      key: "enter your key", 
      amount: amount * 100,
      currency: "INR",
      name: "Society Admin Dashboard - Billing",
      description: `Bill payment by ${name} (Flat: ${flatNo})`,
      handler: async function (response) {
        setBillingSuccess(true);

        // Save to backend
        try {
          await axios.post("http://localhost:8080/api/billings", {
            name,
            flatNo,
            amount,
            billingId: response.razorpay_payment_id,
          });
          alert("Billing successful and saved.");
        } catch (error) {
          console.error("Error saving billing:", error);
          alert("Billing successful, but failed to save.");
        }
      },
      prefill: {
        name,
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="billing-container">
      <h2 className="billing-title"> Payment</h2>

      <div className="billing-box">
        <input
          className="billing-input"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="billing-input"
          type="text"
          placeholder="Enter Flat Number"
          value={flatNo}
          onChange={(e) => setFlatNo(e.target.value)}
        />
        <input
          className="billing-input"
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleBilling} className="billing-button">
          Pay with Razorpay
        </button>

        {billingSuccess && (
          <div className="billing-success">
            Payment Successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default Billings;
