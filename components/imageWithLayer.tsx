import { MainColors } from '@/app/helpers/constants';
import { getImageSource } from '@/app/helpers/helperFuncs';
import React, { ReactNode } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

interface ImageWithLayerProps {
	containerStyles?: ViewStyle;
	image: string;
	children: ReactNode;
}
const ImageWithLayer: React.FC<ImageWithLayerProps> = (props) => {
	return (
		<View style={props.containerStyles ?? styles.bannerContainer}>
			<Image
				source={getImageSource(props.image)}
				style={styles.bannerImage}
			/>
			<View style={styles.bannerLayer}>{props.children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bannerContainer: {
		height: 270,
		top: -10,
		position: 'relative',
	},
	bannerImage: {
		objectFit: 'cover',
		maxWidth: '100%',
		height: '100%',
	},
	bannerLayer: {
		backgroundColor: MainColors.colorWithOpacity(MainColors.black, 35),
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
});

export default ImageWithLayer;
