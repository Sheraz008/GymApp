import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
    },
    header: {
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    clientInfo: {
        textAlign: 'center',
        marginBottom: spacing.lg,
        lineHeight: 20,
    },
    slotsSection: {
        marginTop: spacing.sm,
    },
    slotsTitle: {
        marginBottom: spacing.md,
    },
    slotCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.sm,
        backgroundColor: '#FFFFFF',
    },
    slotTimeContainer: {
        flex: 1,
    },
    slotActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: 4,
    },
    deleteButton: {
        padding: spacing.xs,
    },
});
