import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper, AppText, AppLoader } from '@components/index';
import { useAuth } from '@providers/AuthProvider';
import { useTheme } from '@providers/ThemeProvider';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { icons } from '@assets/images';
import { styles } from './LoginScreen.styles';

const LoginScreen = () => {
    const { signIn, isLoading } = useAuth();
    const theme = useTheme();

    const handleGoogleSignIn = async () => {
        try {
            await signIn();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Signed in successfully!',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to sign in. Please try again.',
            });
        }
    };

    return (
        <ScreenWrapper backgroundColor={theme.white}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#000000" />
                </TouchableOpacity>

                <AppText bold size="FONT_28" style={styles.title}>
                    Sign Up
                </AppText>

                <AppText size="FONT_20" bold style={styles.welcomeText}>
                    Welcome! Manage, Track and Grow your Gym with WellVantage.
                </AppText>

                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.8}
                >
                    <View style={styles.googleButtonContent}>
                        <Image source={icons.google} style={styles.googleIcon} />
                        <AppText size="FONT_16" medium color={theme.black}>
                            Continue with Google
                        </AppText>
                    </View>
                </TouchableOpacity>

                <AppLoader
                    overlay
                    visible={isLoading}
                    message="Signing in with Google..."
                />
            </View>
        </ScreenWrapper>
    );
};

export default LoginScreen;
