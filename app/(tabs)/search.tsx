import React, { useEffect, useRef } from 'react';
import {
	SectionList,
	StyleSheet,
	Text,
	FlatList,
	View,
	SectionListRenderItemInfo,
	SectionListData,
	Insets,
	ListRenderItemInfo,
	Image,
} from 'react-native';
import SafeView from '../../components/safeView';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllOffers } from '../slices/search-slice';
import { setIsLoading } from '../slices/commons-slice';
import { Offer } from '../slices/Models.js';
import localize from '@/components/Langs/Langs';
import { colorize } from '../helpers/helperFuncs';
import ImageWithLayer from '@/components/imageWithLayer';
import { FontWeights, MainColors } from '../helpers/constants';

interface SectionHeaderInfo {}
const Search = () => {
	const dispatch = useAppDispatch();

	let commons = useAppSelector((state) => state.commons);

	return <></>;
};

const styles = StyleSheet.create({});

export default Search;
