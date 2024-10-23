import { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import styles from './stylesheets';
import { Ionicons } from '@expo/vector-icons';
// import { colors, fonts } from '../css';
// import inputStyles from './stylesheets';

interface LabelInputProps {
	title?: string;
	placeholder?: string;
	errLabel?: string;
	labelText?: string;
	keyboardType?: string;
	// extraComponent;
	inputHandler?: Function;
	secureTextEntry?: boolean;
	borderStyle?: string;
	editable?: boolean;
	iconName?: keyof typeof Ionicons.glyphMap;
}

const LabelInput = (props: LabelInputProps) => {
	const [focused, setFocused] = useState(false);

	const handleChangeText: TextInputProps['onChangeText'] = (e) => {
		if (props.inputHandler) props.inputHandler(e);
	};

	const handleFocus = () => {};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{props.title}</Text>
			<Text>{props.errLabel}</Text>
			<View>
				{!!props.iconName && (
					<Ionicons
						name={props.iconName}
						size={20}
						style={styles.icon}
					/>
				)}

				<TextInput
					inlineImageLeft="test"
					style={[
						styles.input,
						!!props.errLabel && styles.inputError,
					]}
					placeholder={props.placeholder}
					onChangeText={handleChangeText}
					onFocus={handleFocus}
				/>
			</View>
		</View>
	);
};

export default LabelInput;
