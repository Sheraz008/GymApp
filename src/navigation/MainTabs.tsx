import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabParamList } from './types';
import HomeTopTabs from './HomeTopTabs';

const Stack = createStackNavigator<MainTabParamList>();

const MainTabs = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeTopTabs} />
        </Stack.Navigator>
    );
};

export default MainTabs;
