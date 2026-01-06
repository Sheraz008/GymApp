import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
    },
    dropdown: {
        borderRadius: 8,
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    workoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
    },
    deleteButton: {
        padding: spacing.xs,
    },
    addButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: spacing.lg,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    deleteIconImage: {
        width: 22,
        height: 22,
        tintColor: '#E74C3C',
    },
});
