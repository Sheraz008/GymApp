import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    ActivityIndicator,
} from 'react-native';
import AppText from '../AppText';
import { useTheme } from '@providers/ThemeProvider';
import { spacing, borderRadius } from '@theme/spacing';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
}

const AppButton: React.FC<AppButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    style,
}) => {
    const theme = useTheme();

    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
            borderRadius: borderRadius.md,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 50,
        };

        if (variant === 'primary') {
            return {
                ...baseStyle,
                backgroundColor: disabled ? theme.border : theme.primary,
            };
        } else if (variant === 'secondary') {
            return {
                ...baseStyle,
                backgroundColor: disabled ? theme.border : theme.card,
            };
        } else {
            return {
                ...baseStyle,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: disabled ? theme.border : theme.primary,
            };
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.textSecondary;
        if (variant === 'primary') return theme.white;
        if (variant === 'outline') return theme.primary;
        return theme.text;
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <AppText bold size="FONT_16" color={getTextColor()}>
                    {title}
                </AppText>
            )}
        </TouchableOpacity>
    );
};

export default AppButton;
