import React, { useEffect, useRef, useState } from 'react';
import { Link, router } from 'expo-router';
import {
	FormErrors,
	LocalStorageAction,
	StatusCodes,
} from '../helpers/constants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login, setFormError, setIsLoggedIn } from '../slices/commons-slice';
import { View, Text, ScrollView, Image } from 'react-native';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import LabelInput from '@/components/LabelInput/LabelInput';
import styles from './styles';
import localize from '@/components/Langs/Langs';
import { localStorageAction } from '../helpers/helperFuncs';

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
	const mounted = useRef(false);
	console.log(isLoading);

	const dispatch = useAppDispatch();
	const commons = useAppSelector((state) => state.commons);

	const getFormError = (): string => {
		return commons.formError;
	};

	useEffect(() => {
		if (!commons.token) return;

		localStorageAction(LocalStorageAction.SET, 'token', commons.token);
		console.log('saving auth in Storage');
	}, [commons.isLoggedIn]);

	useEffect(() => {
		if (!mounted.current) mounted.current = true;

		localStorageAction(LocalStorageAction.GET, 'token').then((token) => {
			if (!!token) {
				console.log('🎉 Found token in local storage', token);
				dispatch(setIsLoggedIn(!!token));
				router.replace('/(tabs)/');
				return;
			}
			console.log('user is not authenticated');
			dispatch(setIsLoggedIn(false));
			// router.replace('/auth/');
		});
	}, [commons.isLoggedIn]);

	const handleLogin = async () => {
		setIsLoading(true);

		if (username == '') {
			dispatch(setFormError(FormErrors.USERNAME_REQUIRED));
			return;
		}
		if (password == '') {
			dispatch(setFormError(FormErrors.PASSWORD_REQUIRED));
			return;
		}

		let payload = { username: username.toLocaleLowerCase(), password };

		dispatch(login(payload));

		setIsLoading(false);
		checkForTokenAndRedirectOrSetError();
	};

	const checkForTokenAndRedirectOrSetError = () => {
		dispatch(setFormError(FormErrors.none));

		setIsLoggedIn(true);
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
