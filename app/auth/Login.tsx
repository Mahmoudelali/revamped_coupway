import React from 'react';

import { View, Text, ScrollView, Image } from 'react-native';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import LabelInput from '@/components/LabelInput/LabelInput';
import styles from './styles';
import localize from '@/components/Langs/Langs';
import { Link } from 'expo-router';

const renderGreetings = () => {
	return <Text style={styles.greetings}>{localize('greetings')}</Text>;
};

const renderCreateAccountOption = () => {
	return (
		<Text style={[styles.textCenter, { marginVertical: 15 }]}>
			<Text>{localize('ques_no_account')}</Text>
			<Link href="/auth/Register" style={styles.loginNow}>
				{` ${localize('register_now')}`}
			</Link>
		</Text>
	);
};

const renderOrLabel = () => {
	return (
		<View style={styles.orContainer}>
			<View style={[styles.orSeparator]} />
			<Text style={{ fontWeight: '700' }}> {localize('or')}</Text>
			<View style={[styles.orSeparator]} />
		</View>
	);
};

const Login = () => {
	return (
		<ScrollView contentContainerStyle={styles.svContainer}>
			<View style={styles.container}>
				<Image
					source={require('./../../assets/images/illustration.png')}
					style={styles.illustration}
				/>
				{renderGreetings()}
				<LabelInput
					placeholder={localize('enter_username')}
					iconName="mail-outline"
				/>
				<LabelInput
					placeholder="Enter your password"
					iconName="lock-open-outline"
				/>
				<View style={styles.separator} />
				<ThemeButton title={localize('login')} />
				{renderCreateAccountOption()}
				{renderOrLabel()}
				<Link
					style={[
						styles.textCenter,
						styles.marginTop,
						styles.tintColor,
						{ fontSize: 16 },
					]}
					href="/(tabs)/"
				>
					{localize('continue_as_guest')}
				</Link>
			</View>
		</ScrollView>
	);
};

export default Login;
