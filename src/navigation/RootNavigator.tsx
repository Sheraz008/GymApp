import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@providers/AuthProvider';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { StyleSheet } from 'react-native';
import { useTheme } from '@providers/ThemeProvider';
import { AppLoader } from '@components/index';

const RootNavigator = () => {
    const { user, isLoading } = useAuth();
    const theme = useTheme();

    if (isLoading) {
        return <AppLoader fullScreen message="Restoring session..." />;
    }

    return (
        <NavigationContainer>
            {user ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RootNavigator;
