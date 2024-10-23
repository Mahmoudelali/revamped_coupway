import LabelInput from '@/components/LabelInput/LabelInput';
import localize from '@/components/Langs/Langs';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import styles from './styles';
import { Link } from 'expo-router';

const Register = () => {
	return (
		<ScrollView contentContainerStyle={styles.svContainer}>
			<View style={styles.container}>
				<Image
					source={require('./../../assets/images/illustration.png')}
					style={styles.illustration}
				/>
				{renderGreetings('WELCOME')}
				<LabelInput
					placeholder={localize('enter_username')}
					iconName="mail-outline"
				/>
				<LabelInput
					placeholder="Enter your password"
					iconName="lock-open-outline"
				/>
				<LabelInput
					placeholder={localize('confirm_password')}
					iconName="lock-closed-outline"
				/>
				<View style={styles.separator} />
				<ThemeButton title={localize('login')} />
				{renderLoginNowLabel()}
			</View>
		</ScrollView>
	);
};

const renderGreetings = (name: string) => {
	return <Text style={styles.greetings}>{localize(name)}</Text>;
};

const renderLoginNowLabel = () => {
	return (
		<Text style={styles.textCenter}>
			<Text> {localize('already_have_account')} </Text>
			<Link href="/auth/Login" style={styles.loginNow}>
				{` ${localize('login')}`}
			</Link>
		</Text>
	);
};

export default Register;
