import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorageAction } from './constants';

export async function localStorageAction(
	action: LocalStorageAction,
	key: string,
	value?: any,
): Promise<string | null> {
	try {
		if (!key) return Promise.reject('Key is required');

		let valCopy = typeof value === 'string' ? value : JSON.stringify(value);

		switch (action) {
			case LocalStorageAction.SET:
				console.log('Setting value in localStorage');
				await AsyncStorage.setItem(key, valCopy);
				return Promise.resolve('done');

			case LocalStorageAction.GET:
				console.log('Getting value from localStorage');
				let data = await AsyncStorage.getItem(key);
				return Promise.resolve(data); // Return the retrieved data

			case LocalStorageAction.UPDATE:
				console.log('Updating value in localStorage');
				await AsyncStorage.mergeItem(key, valCopy);
				return Promise.resolve('done');

			case LocalStorageAction.REMOVE:
				console.log('Removing value from localStorage');
				await AsyncStorage.removeItem(key);
				return Promise.resolve('done');

			default:
				const _exhaustiveCheck: never = action;
				throw new Error(`Unhandled case: ${action}`);
		}
	} catch (error) {
		console.log('🧨 LOCAL STORAGE ACTION FAILURE', error);
		return Promise.reject(error);
	}
}
