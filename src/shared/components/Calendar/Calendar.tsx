import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AppText } from '@components/index';
import { spacing } from '@theme/spacing';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { MONTH_NAMES, DAYS_OF_WEEK } from '@shared/data/constants';

interface CalendarProps {
    selectedYear: number;
    selectedMonth: number;
    selectedDay: number;
    onDateSelect: (day: number) => void;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
    selectedYear,
    selectedMonth,
    selectedDay,
    onDateSelect,
    onPreviousMonth,
    onNextMonth,
}) => {
    const getDaysInMonth = () => {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        const weeks = [];
        let week = new Array(7).fill(null);
        let dayCounter = 1;

        for (let i = firstDay; i < 7 && dayCounter <= daysInMonth; i++) {
            week[i] = dayCounter++;
        }
        weeks.push(week);

        while (dayCounter <= daysInMonth) {
            week = new Array(7).fill(null);
            for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
                week[i] = dayCounter++;
            }
            weeks.push(week);
        }

        return weeks;
    };

    return (
        <View style={styles.calendarContainer}>
            {/* Month Navigation */}
            <View style={styles.monthHeader}>
                <TouchableOpacity style={styles.navButton} onPress={onPreviousMonth}>
                    <MaterialIcons name="chevron-left" size={24} color="#333333" />
                </TouchableOpacity>
                <AppText size="FONT_14" medium color="#333333">
                    {MONTH_NAMES[selectedMonth]} {selectedYear}
                </AppText>
                <TouchableOpacity style={styles.navButton} onPress={onNextMonth}>
                    <MaterialIcons name="chevron-right" size={24} color="#333333" />
                </TouchableOpacity>
            </View>

            <View style={styles.daysOfWeekRow}>
                {DAYS_OF_WEEK.map((day: string, index: number) => (
                    <View key={index} style={styles.dayOfWeekCell}>
                        <AppText size="FONT_12" medium color="#666666">
                            {day}
                        </AppText>
                    </View>
                ))}
            </View>

            {/* Calendar Grid */}
            {getDaysInMonth().map((week: (number | null)[], weekIndex: number) => (
                <View key={weekIndex} style={styles.weekRow}>
                    {week.map((day: number | null, dayIndex: number) => (
                        <View key={dayIndex} style={styles.dayCell}>
                            {day && (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => onDateSelect(day)}
                                    style={[
                                        styles.dayTouch,
                                        day === selectedDay && styles.selectedDay,
                                    ]}
                                >
                                    <AppText
                                        size="FONT_14"
                                        color={day === selectedDay ? '#FFFFFF' : '#333333'}
                                    >
                                        {day}
                                    </AppText>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.lg,
        backgroundColor: '#FFFFFF',
    },
    monthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    navButton: {
        padding: spacing.xs,
    },
    daysOfWeekRow: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    dayOfWeekCell: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    weekRow: {
        flexDirection: 'row',
        marginBottom: spacing.xs,
    },
    dayCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 42,                 // 🔥 FIXED HEIGHT = perfect grid
    },

    dayTouch: {
        width: 32,
        height: 32,
        borderRadius: 16,           // 🔥 REAL CIRCLE
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectedDay: {
        backgroundColor: '#4CAF50',
    },

    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    }
});

export default Calendar;
