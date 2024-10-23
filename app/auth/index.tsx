import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import LabelInput from '@/components/LabelInput/LabelInput';
import styles from './styles';
import localize from '@/components/Langs/Langs';

const Index = () => {
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
			</View>
		</ScrollView>
	);
};

const renderGreetings = () => {
	return <Text style={styles.greetings}>{localize('greetings')}</Text>;
};
export default Index;
