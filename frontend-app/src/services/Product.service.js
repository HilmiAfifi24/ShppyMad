import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const getProducts = async () => {
    try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        const response = await axios.get(`${API_URL}/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        throw error;
    }
};

export { getProducts };
