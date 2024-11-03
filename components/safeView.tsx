import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface SafeViewProps {
	children: ReactNode;
	edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
	style?: ViewStyle;
}

const SafeView: React.FC<SafeViewProps> = (props) => {
	return (
		<SafeAreaProvider>
			<SafeAreaView edges={props.edges} style={props.style}>
				{props.children}
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default SafeView;
