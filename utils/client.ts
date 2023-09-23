import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../config';

/**
 * Create a client to make requests to the API
 * @param {string} baseUrl The base url to make requests to
 * @returns {AxiosInstance} The client
 * @example
 * const client = createClient('users');
 *
 * client.get('/1');
 * // GET https://api.com/users/1
 */
export const createClient = (baseUrl: string = ''): AxiosInstance => {
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
