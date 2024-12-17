import axios from "axios";

const API_URL = "http://localhost:8000"; // Your backend URL

// Login
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem("access_token", response.data.access_token);
};

// SignUp
export const signUp = async (email, password, username) => {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password, username });
    localStorage.setItem("access_token", response.data.access_token);
};

// Generate Image
export const generateImage = async (prompt) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
        `${API_URL}/image/generate_image`,
        { prompt },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data.image_url;
};
