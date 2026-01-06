import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@providers/ThemeProvider';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    scrollable?: boolean;
    backgroundColor?: string;
    statusBarStyle?: 'default' | 'light-content' | 'dark-content';
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    style,
    scrollable = false,
    backgroundColor,
    statusBarStyle = 'dark-content',
}) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const Container = scrollable ? ScrollView : View;
    const bgColor = backgroundColor || theme.background;

    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor: bgColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    };

    return (
        <>
            <StatusBar
                backgroundColor={bgColor}
                barStyle={statusBarStyle}
                translucent
            />
            <Container
                style={[containerStyle, style]}
                contentContainerStyle={scrollable ? styles.scrollContent : undefined}
            >
                {children}
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
});

export default ScreenWrapper;
