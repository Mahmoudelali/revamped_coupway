import {
	Image,
	StyleSheet,
	Platform,
	Text,
	View,
	ScrollView,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { resetToken, setIsLoggedIn } from '../slices/commons-slice';
import { localStorageAction } from '../helpers/helperFuncs';
import {
	FontWeights,
	LocalStorageAction,
	MainColors,
} from '../helpers/constants';

import { router } from 'expo-router';
import ImageWithLayer from '@/components/imageWithLayer';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
	const commons = useAppSelector((state) => state.commons);
	const dispatch = useAppDispatch();
	let mounted = useRef(false);

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
		});
	}, [commons.isLoggedIn]);

	const handleClick = async () => {
		localStorageAction(LocalStorageAction.REMOVE, 'token').then((res) => {
			if (res == 'done') dispatch(resetToken());
		});
	};

	return (
		<ImageWithLayer
			image="https://t3.ftcdn.net/jpg/02/43/87/74/360_F_243877435_Jst4Q167p0PXboARcGNq5KXCmSelazFj.jpg"
			containerStyles={styles.bannerContainer}
		>
			<View style={styles.layerText}>
				<View style={styles.subtitleContainer}>
					<Ionicons
						style={styles.location}
						name="location"
						size={24}
					/>
					<Text style={styles.location}> San Francisco, CA</Text>
				</View>

				<Text style={styles.highlight}>
					Good afternoon. Take a break from work.
				</Text>
			</View>
		</ImageWithLayer>
	);
}

const styles = StyleSheet.create({
	bannerContainer: {
		height: 280,
		top: -10,
	},
	bannerImage: {
		objectFit: 'contain',
		maxWidth: '100%',
		height: '100%',
	},
	layerText: {
		bottom: 24,
		left: 16,
		position: 'absolute',
	},
	highlight: {
		color: MainColors.white,
		fontWeight: FontWeights.Bold,
		fontSize: 28,
		lineHeight: 34,
		letterSpacing: 1,
	},
	location: {
		color: MainColors.white,
		fontWeight: FontWeights.Semi,
		fontSize: 15,
		lineHeight: 34,
		letterSpacing: 1,
	},
	subtitleContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

{
	/* <ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}
		></ParallaxScrollView> */
}
