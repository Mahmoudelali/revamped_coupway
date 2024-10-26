import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import styles from './stylesheets';
import Langs from '../Langs/Langs';

interface ThemeButtonProps {
	title: string;
	clickHandler?: Function;
	errorStr?: string;
	disabled?: boolean;
}

const ThemeButton = (props: ThemeButtonProps) => {
	const handlePress = () => {
		if (props.clickHandler) props.clickHandler();
	};

	const handleRenderError = () => {
		if (!!props.errorStr) {
			return <Text> {props.errorStr} </Text>;
		}
	};
	return (
		<View>
			<Pressable
				onPress={handlePress}
				style={[styles.default, props.disabled && styles.disabled]}
			>
				<Text style={[styles.title]}> {props.title}</Text>
			</Pressable>
			<Text style={styles.errorLabel}> {handleRenderError()} </Text>
		</View>
	);
};

export default ThemeButton;
