import axios from 'axios';
import { API_URL } from '../config';

export const createClient = (baseUrl = '') => {
	const client = axios.create({
		baseURL: `${API_URL}/${baseUrl}`,
	});

	client.interceptors.request.use((config) => {
		return config;
	});

	client.interceptors.response.use(
		(res) => res.data,
		(error) => {
			throw error.response?.data || error;
		},
	);

	return client;
};
