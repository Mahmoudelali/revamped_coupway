import axios, { AxiosError } from 'axios';
import { StatusCodes } from '../helpers/constants';

export class NetworkManager {
	private static instance?: NetworkManager;

	private constructor() {
		// Make the constructor private to prevent direct instantiation
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new NetworkManager();
			return this.instance;
		}
	}

	private getBaseURL(): string {
		return 'http://127.0.0.1:8000';
	}

	private parseGetParams(params: any) {
		if (params) {
			let arrayOfParams = [];
			for (let key in params) {
				arrayOfParams.push(key + '=' + params[key]);
			}
			if (arrayOfParams.length) return '?' + arrayOfParams.join('&');
		}
		return '';
	}

	async getRequest(path: string, queries?: any, headers?: any) {
		var url = this.getBaseURL() + this.parseGetParams(queries ?? {});
		let response = await axios.get(url + path, { headers });
		return response.data;
	}

	async postRequest(path: string, payload?: object, headers?: object) {
		try {
			const url = this.getBaseURL() + path;
			const response = await axios.post(url, payload, { headers });

			if (response.status === StatusCodes.OK) {
				return {
					responseError: null,
					responseData: response.data,
					status: response.status,
				};
			} else {
				return {
					responseError: `Unexpected status: ${response.status}`,
					responseData: null,
					status: response.status,
				};
			}
		} catch (error: AxiosError | any) {
			if (axios.isAxiosError(error)) {
				return {
					status: error.response?.status || null,
					errorCode: error.code,
				};
			} else {
				return {
					status: null,
					error: error.message || 'Unknown error occurred',
				};
			}
		}
	}
}
