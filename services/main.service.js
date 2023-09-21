import axios from 'axios';

const BASE_URL = 'https://51cf-113-176-87-53.ngrok-free.app/wastes';

export default {
	getLabels() {
		return axios.get(`${BASE_URL}/labels`);
	},
	predict(report) {
		return axios.post(`${BASE_URL}/report`, report);
	},
	detect(img) {
		const form = new FormData();
		form.append('img', img);

		return axios.post(`${BASE_URL}/detection`, form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
