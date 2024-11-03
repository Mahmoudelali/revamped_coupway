import React, { ReactNode, useEffect, useRef } from 'react';
import {
	SectionList,
	StyleSheet,
	Text,
	FlatList,
	View,
	SectionListProps,
	SectionListRenderItem,
	SectionListRenderItemInfo,
	SectionListData,
	ListRenderItem,
	ListRenderItemInfo,
} from 'react-native';
import { data_one, data_Two } from '../../app/helpers/dummy.js';
import SafeView from '../../components/safeView';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllOffers } from '../slices/search-slice';
import { setIsLoading } from '../slices/commons-slice';
import { Offer } from '../slices/Models.js';
import localize from '@/components/Langs/Langs';

interface SectionModel {
	title: string;
	data: Offer[];
}
interface SectionHeaderInfo {
	section: SectionListData<Offer, SectionModel>;
}
const Search = () => {
	let mounted = useRef<boolean>(false);
	const dispatch = useAppDispatch();

	let state = useAppSelector((state) => state.search);
	let commons = useAppSelector((state) => state.commons);
	let isLoading = commons.isLoading;

	useEffect(() => {
		dispatch(setIsLoading(true));
		dispatch(getAllOffers());
		dispatch(setIsLoading(false));
		mounted.current = true;
	}, []);

	// [data_one, data_Two]
	const handleRenderSectionFromMap = () => {
		let sections = [];
		for (const [key, value] of Object.entries(state.categoriesMap)) {
			sections.push({
				title: key,
				data: value,
			});
		}
		return sections;
	};

	const handleRenderFlatItem = ({ item }: ListRenderItemInfo<Offer>) => {
		return (
			<View>
				<Text>{item.title} </Text>
			</View>
		);
	};
	const handleRenderSectionHeader = ({ section }: SectionHeaderInfo) => {
		return <Text>{section.title}</Text>;
	};

	const handleRenderSectionItem = ({
		section,
	}: SectionListRenderItemInfo<Offer, SectionModel>) => {
		return isLoading ? (
			<Text>{localize('loading')}</Text>
		) : (
			<FlatList
				horizontal={section.title == 'food'}
				data={section.data}
				keyExtractor={(item) => item.title + item.company}
				renderItem={handleRenderFlatItem}
			/>
		);
	};
	return (
		<SafeView>
			<SectionList
				sections={handleRenderSectionFromMap()}
				renderSectionHeader={handleRenderSectionHeader}
				renderItem={handleRenderSectionItem}
				progressViewOffset={100}
			/>
		</SafeView>
	);
};

const styles = StyleSheet.create({
	separator: {
		backgroundColor: 'red',
		height: 1,
		flex: 1,
		flexDirection: 'row',
	},
});

export default Search;
