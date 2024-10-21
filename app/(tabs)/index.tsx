import { Image, StyleSheet, Platform, Pressable, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login, LoginPayload, setIsLoggedIn } from '../slices/commons-slice';
import { localStorageAction } from '../helpers/helperFuncs';
import { LocalStorageAction } from '../helpers/constants';
import { HelloWave } from '@/components/HelloWave';
import LabelInput from '@/components/LabelInput/LabelInput';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { SwitchButton } from '@/components/Switcher/Switcher';
import Langs from '@/components/Langs/Langs';

export default function HomeScreen() {
	const commons = useAppSelector((state) => state.commons);
	const dispatch = useAppDispatch();
	let mounted = useRef(false);

	let payload: LoginPayload = {
		username: 'mahmoud',
		password: '123',
	};
	let isAuthenticated = commons.isLoggedIn;
	const [text, setText] = useState<string>('');
	const [selectedOption, setSelectedOption] = useState('Login');

	useEffect(() => {
		if (!mounted.current) mounted.current = true;
		if (!!commons.isLoggedIn) return;

		localStorageAction(LocalStorageAction.GET, 'token').then((token) => {
			if (!!token) {
				console.log('🎉 Found token in local storage', token);
				dispatch(setIsLoggedIn(!!token));
				return;
			}
			console.log('Redirecting to Login');
			dispatch(setIsLoggedIn(false));
			dispatch(login(payload));
		});
	}, []);

	useEffect(() => {
		if (!commons.token) return;
		localStorageAction(LocalStorageAction.SET, 'token', commons.token);
	}, [commons.token]);

	const handleClick = () => {
		console.log('clicked');
	};
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}
		>
			<Langs str="test" />
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Welcome!</ThemedText>
				<HelloWave />
			</ThemedView>

			<SwitchButton
				options={['Login', 'Register']}
				selectedOption={selectedOption}
				setSelectedOption={setSelectedOption}
			/>
			<LabelInput
				placeholder="Error"
				title="Header"
				inputHandler={setText}
			/>
			<ThemeButton
				title="Confirm"
				disabled={false}
				errorStr="Cannot proceed this request 🙁!"
				clickHandler={handleClick}
				error={true}
			/>
			<Pressable
				onPress={() => {
					dispatch(login(payload));
				}}
			>
				<Text>
					{!isAuthenticated ? 'is Guest user' : 'is Logged in'}
				</Text>
			</Pressable>

			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 1: Try it</ThemedText>
				<ThemedText>
					Edit{' '}
					<ThemedText type="defaultSemiBold">
						app/(tabs)/index.tsx
					</ThemedText>{' '}
					to see changes. Press{' '}
					<ThemedText type="defaultSemiBold">
						{Platform.select({
							ios: 'cmd + d',
							android: 'cmd + m',
						})}
					</ThemedText>{' '}
					to open developer tools.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 2: Explore</ThemedText>
				<ThemedText>
					Tap the Explore tab to learn more about what's included in
					this starter app.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">
					Step 3: Get a fresh start
				</ThemedText>
				<ThemedText>
					When you're ready, run{' '}
					<ThemedText type="defaultSemiBold">
						npm run reset-project
					</ThemedText>{' '}
					to get a fresh{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText>{' '}
					directory. This will move the current{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
					<ThemedText type="defaultSemiBold">app-example</ThemedText>.
				</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
