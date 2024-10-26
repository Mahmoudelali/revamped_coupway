import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { FormErrors, StatusCodes } from '../helpers/constants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getFormError, login, setFormError } from '../slices/commons-slice';
import { View, Text, ScrollView, Image } from 'react-native';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import LabelInput from '@/components/LabelInput/LabelInput';
import styles from './styles';
import localize from '@/components/Langs/Langs';

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

const renderContinueAsGuest = () => {
	return (
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
	);
};

const Login = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [error, setError] = useState<string>('');

	const dispatch = useAppDispatch();
	const commons = useAppSelector((state) => state.commons);

	const handleLogin = async () => {
		if (username == '') {
			dispatch(setFormError(FormErrors.USERNAME_REQUIRED));
			return;
		}
		if (password == '') {
			dispatch(setFormError(FormErrors.PASSWORD_REQUIRED));
			return;
		}

		let payload = { username: username.toLocaleLowerCase(), password };
		await dispatch(login(payload));
		checkForTokenAndRedirectOrSetError();
	};
	const checkForTokenAndRedirectOrSetError = () => {
		setIsLoading(false);
		if (!!commons.token) {
			router.replace('/(tabs)/basketContainer/basket');
			return;
		}
		dispatch(setFormError(FormErrors.none));
	};
	const handleUsernameFieldError = (): string => {
		return getFormError() == FormErrors.USERNAME_REQUIRED
			? localize(FormErrors.USERNAME_REQUIRED)
			: getFormError() == FormErrors.INVALID_EMAIL
			? localize(FormErrors.INVALID_EMAIL)
			: localize(FormErrors.none);
	};
	const handleRenderButtonError = () => {
		const error = getFormError();
		if (error == FormErrors.SERVER_ERROR || error == FormErrors.WRONG_CREDS)
			return error;
	};
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
					inputHandler={setUsername}
					errLabel={handleUsernameFieldError()}
				/>

				<LabelInput
					placeholder={localize('enter_password')}
					iconName="lock-open-outline"
					inputHandler={setPassword}
					errLabel={
						getFormError() == FormErrors.PASSWORD_REQUIRED
							? localize(FormErrors.PASSWORD_REQUIRED)
							: localize(FormErrors.none)
					}
				/>

				<View style={styles.separator} />

				<ThemeButton
					title={localize('login')}
					clickHandler={handleLogin}
					disabled={isLoading}
					errorStr={handleRenderButtonError()}
				/>
				{renderCreateAccountOption()}
				{renderOrLabel()}
				{renderContinueAsGuest()}
			</View>
		</ScrollView>
	);
};

export default Login;
