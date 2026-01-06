import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginTop: spacing.md,
    },
    title: {
        textAlign: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xxl * 2,
    },
    welcomeText: {
        textAlign: 'center',
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.md,
        lineHeight: 28,
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingVertical: spacing.md + 2,
        paddingHorizontal: spacing.lg,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: spacing.sm,
    },
});
