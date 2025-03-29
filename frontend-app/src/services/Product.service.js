import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const getProducts = async () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        console.error("No token found in localStorage");
        return []; // Return array kosong agar tidak menyebabkan error di frontend
    }

    try {
        const response = await axios.get(`${API_URL}/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Fetched products:", response.data); // Debugging log
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        return []; // Return array kosong jika terjadi error
    }
};

export { getProducts };
