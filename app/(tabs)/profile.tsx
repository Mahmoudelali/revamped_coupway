import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const Profile = () => {
	const commons = useAppSelector((state) => state.commons);
	return <Text>{commons.value}</Text>;
};

const styles = StyleSheet.create({});

export default Profile;
