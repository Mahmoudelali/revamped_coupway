import { useAppSelector } from '@/app/hooks';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Basket = () => {
	const commons = useAppSelector((state) => state.commons);
	return <Text>{commons.test}</Text>;
};

const styles = StyleSheet.create({});

export default Basket;
