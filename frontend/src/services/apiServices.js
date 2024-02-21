import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const apiService = axios.create({
    baseURL: apiUrl,
});

export const getBankList = async () => {
    try {
        const response = await apiService.get('/banks');
        return response.data;
    } catch (error) {
        throw error;
    }
};