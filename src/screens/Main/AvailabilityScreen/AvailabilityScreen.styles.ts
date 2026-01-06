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
        marginBottom: spacing.lg,
        textDecorationLine: 'underline',
    },
    inputGroup: {
        marginBottom: spacing.md + 4,
    },
    label: {
        marginBottom: spacing.xs,
        fontWeight: '500',
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
    },
    dateInput: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    calendarIcon: {
        width: 20,
        height: 20,
        tintColor: '#333333',
    },
    timeRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    timeInputGroup: {
        flex: 1,
        marginBottom: 0,
    },
    timeInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        fontSize: 14,
        color: '#333333',
    },
    repeatRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
        paddingVertical: spacing.xs,
    },
    sessionNameInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        fontSize: 14,
        color: '#333333',
    },
    createButton: {
        marginTop: spacing.md,
        alignSelf: 'center',
        paddingHorizontal: spacing.xl + spacing.lg,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timePickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: spacing.lg,
        width: '80%',
        maxWidth: 300,
    },
    timePickerTitle: {
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    timePickerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    timeColumn: {
        maxHeight: 150,
    },
    timeOption: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        alignItems: 'center',
    },
    timePickerButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: spacing.md,
    },
    timePickerButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    timePickerButtonPrimary: {
        backgroundColor: '#4CAF50',
        borderRadius: 6,
    },
});
