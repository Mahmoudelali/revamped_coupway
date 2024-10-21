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

interface LangsProps {
	str: string;
	params?: { [key: string]: string };
}

export default function Langs(props: LangsProps) {
	const lang = useAppSelector((state) => state.commons.lang);
	let Lang = langs[lang];
	let finalStr = props.str;

	if (Lang && Lang[props.str]) {
		finalStr = Lang[props.str];
	}

	if (props.params && Object.keys(props.params).length) {
		for (const key in props.params) {
			let regex = new RegExp('%' + key + '%', 'g');
			finalStr = finalStr.replace(regex, props.params[key]);
		}
	}
	console.log(lang, Lang);
	return <Text>{finalStr}</Text>;
}
