import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_SERVICE } from '../api/service/auth.service';

interface GoogleUser {
    id: string;
    email: string;
    name?: string | null;
    photo?: string | null;
    familyName?: string | null;
    givenName?: string | null;
}

interface AuthContextType {
    user: GoogleUser | null;
    isLoading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        configureGoogleSignIn();
        restoreSession();
    }, []);

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            offlineAccess: true,
        });
    };

    const restoreSession = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user_data');
            const token = await AsyncStorage.getItem('access_token');
            if (storedUser && token) {
                setUser(JSON.parse(storedUser));
            } else {
                await GoogleSignin.getCurrentUser();
            }
        } catch (error) {
            // Error restoring session handled silently
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async () => {
        try {
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (response.type === 'success') {
                const idToken = response.data.idToken;
                if (!idToken) {
                    throw new Error('Google Sign-In failed: No ID Token');
                }

                const backendResponse = await AUTH_SERVICE.googleLogin({ idToken });
                const { access_token, user: backendUser } = backendResponse.data;

                await AsyncStorage.setItem('access_token', access_token);
                await AsyncStorage.setItem('user_data', JSON.stringify(backendUser));

                setUser(backendUser);
            }
        } catch (error: any) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setIsLoading(true);
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('user_data');
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
