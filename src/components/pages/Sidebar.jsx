

import { NavLink } from "react-router-dom";
import "./ui/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><NavLink to="/dashboard">🏠 Home</NavLink></li>
        <li><NavLink to="/dashboard/requests">📌 Request Services</NavLink></li>
        <li><NavLink to="/dashboard/complaints">⚠️ Complaints</NavLink></li>
        <li><NavLink to="/dashboard/events">🎉 Events</NavLink></li>
        <li><NavLink to="/dashboard/notices">📢 Notices</NavLink></li>
        <li><NavLink to="/dashboard/posts">📝 Posts</NavLink></li>
        <li><NavLink to="/dashboard/parking">🚗 Parking</NavLink></li>
        <li><NavLink to="/dashboard/emergency">🚑 Emergency Contacts</NavLink></li>
        <li><NavLink to="/dashboard/billing">💰 Billing</NavLink></li>
        <li className="logout-btn">
        <NavLink to="/">🚪 Log Out</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
