import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AppText, Calendar, AppLoader } from '@components/index';
import { spacing } from '@theme/spacing';
import { useTheme } from '@providers/ThemeProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useGetSlots, useDeleteSlot } from '@shared/hooks/useSlots';
import { MONTH_NAMES } from '@shared/data/constants';
import { styles } from './BookSlotsScreen.styles';

const BookSlotsScreen = () => {
    const theme = useTheme();
    const now = new Date();
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedDay, setSelectedDay] = useState(now.getDate());

    const getFormattedDate = () => {
        return `${selectedDay} ${MONTH_NAMES[selectedMonth]} ${selectedYear}`;
    };

    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const dayStr = String(selectedDay).padStart(2, '0');
    const dateStr = `${selectedYear}-${monthStr}-${dayStr}`;

    const { data: availableSlots = [], isLoading: isFetching } = useGetSlots(dateStr);
    const deleteSlotMutation = useDeleteSlot();

    const handleDateSelect = (day: number) => {
        setSelectedDay(day);
    };

    const handlePreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const handleDeleteSlot = (slotId: string) => {
        Alert.alert(
            'Delete Slot',
            'Are you sure you want to delete this slot?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteSlotMutation.mutate(slotId)
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <AppText bold size="FONT_18" color="#333333" style={styles.header}>
                    Book Client Slots
                </AppText>

                <AppText size="FONT_14" color="#666666" style={styles.clientInfo}>
                    Rahul Verma has 20 sessions left to book{'\n'}
                    Selected: {getFormattedDate()}
                </AppText>

                <Calendar
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    selectedDay={selectedDay}
                    onDateSelect={handleDateSelect}
                    onPreviousMonth={handlePreviousMonth}
                    onNextMonth={handleNextMonth}
                />

                <View style={styles.slotsSection}>
                    <AppText bold size="FONT_14" color="#333333" style={styles.slotsTitle}>
                        Available Slots:
                    </AppText>

                    {isFetching ? (
                        <AppLoader message="Loading slots..." />
                    ) : availableSlots.length === 0 ? (
                        <AppText size="FONT_14" color="#999999" style={{ textAlign: 'center', marginTop: 20 }}>
                            No slots available for this date.
                        </AppText>
                    ) : (
                        availableSlots.map((slot: any) => {
                            const timeStr = slot.time ||
                                (slot.start_time && slot.end_time ? `${slot.start_time} - ${slot.end_time}` : null) ||
                                (slot.startTime && slot.endTime ? `${slot.startTime} - ${slot.endTime}` : 'Time not set');

                            return (
                                <View key={slot.id} style={styles.slotCard}>
                                    <View style={styles.slotTimeContainer}>
                                        <AppText size="FONT_14" color="#333333">
                                            {timeStr}
                                        </AppText>
                                    </View>

                                    <View style={styles.slotActions}>
                                        <View style={styles.statusBadge}>
                                            <AppText size="FONT_12" color="#4CAF50" medium>
                                                {slot.status}
                                            </AppText>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => handleDeleteSlot(slot.id)}
                                        >
                                            <MaterialIcons name="delete-outline" size={20} color="#E74C3C" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </View>
            </View>

            <AppLoader
                overlay
                visible={deleteSlotMutation.isPending}
                message="Deleting slot..."
            />
        </ScrollView>
    );
};

export default BookSlotsScreen;
