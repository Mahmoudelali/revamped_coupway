import React from 'react';

import { Redirect } from 'expo-router';

const Index = () => {
	return <Redirect href={'/auth/Login'} />;
};

export default Index;
