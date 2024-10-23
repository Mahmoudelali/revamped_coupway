import React from 'react';
import { useSelector } from 'react-redux';
import en from './en.json';
import ar from './ar.json';
import { useAppSelector } from '@/app/hooks';
import { Text } from 'react-native';

// Define the structure of your languages
interface LangsType {
	[key: string]: { [key: string]: any };
}

let langs: LangsType = {
	en: en,
	ar: ar,
};

export default function localize(
	str: string,
	params?: { [key: string]: string },
) {
	const lang = useAppSelector((state) => state.commons.lang);

	let Lang = langs[lang];
	let finalStr = str;

	if (Lang && Lang[str]) {
		finalStr = Lang[str];
	}

	if (params && Object.keys(params).length) {
		for (const key in params) {
			let regex = new RegExp('%' + key + '%', 'g');
			finalStr = finalStr.replace(regex, params[key]);
		}
	}
	return finalStr;
}
