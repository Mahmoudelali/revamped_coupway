import { router } from 'expo-router';
import { getAllOffers } from '../slices/search-slice';
import SafeView from '@/components/safeView';
import { Offer, SectionModel } from '../slices/Models';
import ImageWithLayer from '@/components/imageWithLayer';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { localStorageAction, LogJSON } from '../helpers/helperFuncs';
import {
	StyleSheet,
	Text,
	View,
	SectionList,
	SectionListRenderItemInfo,
	SectionListData,
	FlatList,
	ListRenderItem,
	ListRenderItemInfo,
} from 'react-native';

import {
	resetToken,
	setIsLoading,
	setIsLoggedIn,
} from '../slices/commons-slice';

import {
	FontWeights,
	LocalStorageAction,
	MainColors,
} from '../helpers/constants';

export default function HomeScreen() {
	const commons = useAppSelector((state) => state.commons);
	const dispatch = useAppDispatch();
	let mounted = useRef(false);

	let state = useAppSelector((state) => state.search);
	let isLoading = commons.isLoading;

	interface SectionHeaderInfo {
		section: SectionListData<Offer, SectionModel>;
	}
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

	useEffect(() => {
		dispatch(setIsLoading(true));
		dispatch(getAllOffers());
		dispatch(setIsLoading(false));
	}, []);

	const handleClick = async () => {
		localStorageAction(LocalStorageAction.REMOVE, 'token').then((res) => {
			if (res == 'done') dispatch(resetToken());
		});
	};

	const renderEmptyView = () => {
		return <View></View>;
	};
	const handleRenderSectionFromMap = () => {
		let sections = [];
		for (const [key, value] of Object.entries(state.categoriesMap)) {
			sections.push({
				title: key,
				data: value,
			});
		}
		LogJSON(sections);
		return sections;
	};

	const handleRenderSectionHeader = ({ section }: SectionHeaderInfo) => {
		let capitalizedTitle =
			section.title[0].toUpperCase() +
			section.title.substring(1, section.title.length);
		return (
			<View>
				<Text style={styles.sectionHeader}>{capitalizedTitle}</Text>
			</View>
		);
	};

	const handleRenderFlatItem = ({ item }: ListRenderItemInfo<Offer>) => {
		return (
			<ImageWithLayer
				image={item.main_picture}
				containerStyles={styles.imageLayerContainer}
			>
				<Text style={styles.imageLayerText}>{item.fine_print}</Text>
			</ImageWithLayer>
		);
	};

	const handleRenderSectionItem = ({
		section,
		index,
	}: SectionListRenderItemInfo<Offer, SectionModel>) => {
		if (index == 0) {
			return (
				<FlatList
					horizontal
					data={section.data}
					renderItem={handleRenderFlatItem}
				/>
			);
		} else return renderEmptyView();
	};
	return (
		<SafeView>
			<SectionList
				sections={handleRenderSectionFromMap()}
				renderSectionHeader={handleRenderSectionHeader}
				renderItem={handleRenderSectionItem}
				progressViewOffset={100}
				stickySectionHeadersEnabled={false}
			/>
		</SafeView>
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
	separator: {
		backgroundColor: 'red',
		height: 1,
		flex: 1,
		flexDirection: 'row',
	},
	sectionHeader: {
		fontWeight: FontWeights.Bold,
		color: MainColors.textColor,
		fontSize: 22,
		lineHeight: 28,
		marginLeft: 10,
	},
	imageLayerContainer: {
		width: 240,
		height: 120,
		borderRadius: 6,
		overflow: 'hidden',
		marginHorizontal: 12,
		marginVertical: 32,
	},
	imageLayerText: {
		textAlign: 'center',
		fontSize: 17,
		letterSpacing: 1,
		maxWidth: '70%',
		color: MainColors.white,
		fontWeight: FontWeights.Bold,
		margin: 'auto',
	},
});
