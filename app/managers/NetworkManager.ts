import axios, { AxiosResponse } from 'axios';

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
		let response = await axios.get(url + path, headers);
		return response.data;
	}

	async postRequest(path: string, payload?: object, headers?: object) {
		var url = this.getBaseURL() + path;
		let response = await axios.post(url, payload, headers);
		if (response.status == 400) {
			return { responseError: response.data, responseData: null };
		}
		return { responseError: null, responseData: response.data };
	}
}
