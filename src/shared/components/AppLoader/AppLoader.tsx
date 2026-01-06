import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';
import { useTheme } from '@providers/ThemeProvider';
import AppText from '../AppText';
import { spacing } from '@theme/spacing';

interface AppLoaderProps {
    visible?: boolean;
    fullScreen?: boolean;
    overlay?: boolean;
    message?: string;
    size?: 'small' | 'large';
    color?: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({
    visible = true,
    fullScreen = false,
    overlay = false,
    message,
    size = 'large',
    color,
}) => {
    const theme = useTheme();
    const loaderColor = color || theme.primary;

    if (!visible) return null;

    const LoaderContent = () => (
        <View style={fullScreen ? [styles.fullScreen, { backgroundColor: theme.background }] : styles.container}>
            <ActivityIndicator size={size} color={loaderColor} />
            {message && (
                <AppText
                    size="FONT_14"
                    color={theme.textSecondary}
                    style={styles.message}
                >
                    {message}
                </AppText>
            )}
        </View>
    );

    if (overlay) {
        return (
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
                        <ActivityIndicator size={size} color={loaderColor} />
                        {message && (
                            <AppText
                                size="FONT_14"
                                color={theme.textSecondary}
                                style={styles.message}
                            >
                                {message}
                            </AppText>
                        )}
                    </View>
                </View>
            </Modal>
        );
    }

    return <LoaderContent />;
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.md,
    },
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: spacing.xl,
        borderRadius: 12,
        alignItems: 'center',
        minWidth: 120,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    message: {
        marginTop: spacing.md,
        textAlign: 'center',
    },
});

export default AppLoader;
