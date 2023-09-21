import { AxiosInstance } from 'axios';
import { createClient } from '../utils/client';
import { Label } from '../constants/labels';

export interface DetectionResponse {
	id: number;
	name: string;
	one_hot: number[];
}

export interface ReportResponse {
	message: string;
}

class WasteService {
	private client: AxiosInstance;

	constructor() {
		this.client = createClient('wastes');
	}

	async getLabels() {
		return (await this.client.get('/labels')) as unknown as Label[];
	}

	async report(img: Blob, label: number) {
		const form = new FormData();
		form.append('img', img);

		return (await this.client.post(`/report`, form, {
			params: {
				label,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})) as unknown as ReportResponse;
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
