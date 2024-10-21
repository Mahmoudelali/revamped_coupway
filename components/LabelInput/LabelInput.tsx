import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	NativeSyntheticEvent,
	TextInputTextInputEventData,
	TextInputProps,
} from 'react-native';
import styles from './stylesheets';
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
}

const LabelInput = (props: LabelInputProps) => {
	const [focused, setFocused] = useState(false);

	const handleChangeText: TextInputProps['onChangeText'] = (e) => {
		if (props.inputHandler) props.inputHandler(e);
	};

	const handleFocus = () => {};

	return (
		<View>
			<Text style={styles.header}>{props.title}</Text>
			<Text>{props.errLabel}</Text>
			<View>
				<TextInput
					style={[styles.input, styles.inputError]}
					placeholder={props.placeholder}
					onChangeText={handleChangeText}
					onFocus={handleFocus}
				/>
			</View>
		</View>
	);
};

export default LabelInput;
