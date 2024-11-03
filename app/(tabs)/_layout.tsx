import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/app/helpers/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomTabScreens } from '../helpers/constants';
import { NetworkManager } from '../managers/NetworkManager';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarIcon: ({ color, focused, size }) => {
					return <TabBarIcon name="airplane" />;
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: BottomTabScreens.HOME,
					tabBarIcon: ({ color, focused, size }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={BottomTabScreens.SEARCH}
				options={{
					title: BottomTabScreens.SEARCH,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'search' : 'search-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={BottomTabScreens.NOTIFICATIONS}
				options={{
					title: BottomTabScreens.NOTIFICATIONS,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={
								focused
									? 'notifications'
									: 'notifications-outline'
							}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name={BottomTabScreens.BASKET}
				options={{
					title: BottomTabScreens.BASKET,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'basket' : 'basket-outline'}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name={BottomTabScreens.PROFILE}
				options={{
					title: BottomTabScreens.PROFILE,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'person' : 'person-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

{
	/* <Tabs.Screen
name="explore"
options={{
title: 'Explore',
tabBarIcon: ({ color, focused }) => (
<TabBarIcon
name={focused ? 'code-slash' : 'code-slash-outline'}
color={color}
/>
),
}}
/> */
}
