import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


    export const useAuth = () => {
        const { user, setUser } = useContext(AuthContext);
    
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const email = localStorage.getItem("email"); // or however you store email after login
                    if (!email) return;
    
                    const response = await axios.get(`http://localhost:8080/api/auth/user/${email}`);
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
    
            fetchUser();
        }, [setUser]);
    
        return { user, setUser };
    };
        

  