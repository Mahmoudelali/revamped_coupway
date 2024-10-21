import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	ViewStyle,
	TextStyle,
} from 'react-native';
import styles from './stylesheet';

interface SwitchButtonProps {
	options?: string[];
	selectedOption: string;
	setSelectedOption?: (option: string) => void;
	height?: number;
	fontSize?: number;
}

export function SwitchButton({
	options,
	selectedOption,
	setSelectedOption,
	height,
	fontSize,
}: SwitchButtonProps) {
	const onChangeHandler = (option: string) => {
		if (setSelectedOption) setSelectedOption(option);
	};

	const buttonStyle: ViewStyle = {
		flex: 1,
		height: height ? height : undefined,
	};

	const textStyle: TextStyle = {
		fontSize: fontSize ? fontSize : undefined,
	};

	return (
		<View style={[styles.switchButton, buttonStyle]}>
			{options?.map((option, index) => (
				<TouchableOpacity
					key={index}
					style={[
						styles.button,
						selectedOption === option
							? styles.selectedOption
							: styles.unselectedOption,
						buttonStyle,
					]}
					onPress={() => onChangeHandler(option)}
				>
					<Text style={[option == selectedOption && styles.text]}>
						{option}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}
