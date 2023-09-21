import { AxiosInstance } from 'axios';
import { createClient } from '../utils/client';

export interface DetectionResponse {
	id: number;
	name: string;
	one_hot: number[];
}

class WasteService {
	private client: AxiosInstance;

	constructor() {
		this.client = createClient('wastes');
	}

	async getLabels() {
		return await this.client.get('/labels');
	}

	async predict(report: Map<string, string>) {
		return await this.client.post(`/report`, report);
	}

	async detect(img: Blob) {
		const form = new FormData();

		form.append('img', img);

		return (await this.client.post(`/detection`, form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})) as unknown as DetectionResponse;
	}
}

export default new WasteService() as WasteService;
