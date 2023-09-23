import { API_URL } from '../../config';
import { createClient } from '../../utils/client';

describe('createClient', () => {
	it('should return an axios instance', () => {
		const client = createClient();

		expect(client).toBeDefined();
		expect(client.interceptors.request).toBeDefined();
		expect(client.interceptors.response).toBeDefined();
	});

	it('should return an axios instance with the correct base url', () => {
		const client = createClient('users');

		expect(client.defaults.baseURL).toBe(API_URL + '/users');
	});
});
