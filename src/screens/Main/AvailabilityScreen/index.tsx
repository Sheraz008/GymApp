import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Switch, Platform, Modal, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppText, AppButton, Calendar, AppLoader } from '@components/index';
import { spacing } from '@theme/spacing';
import { useTheme } from '@providers/ThemeProvider';
import { icons } from '@assets/images';
import { useCreateSlot } from '@shared/hooks/useSlots';
import { MONTH_NAMES } from '@shared/data/constants';
import { styles } from './AvailabilityScreen.styles';

const AvailabilityScreen = () => {
    const theme = useTheme();
    const now = new Date();
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedDay, setSelectedDay] = useState(now.getDate());

    const [startTimeDate, setStartTimeDate] = useState(new Date(now.setHours(11, 30)));
    const [endTimeDate, setEndTimeDate] = useState(new Date(now.setHours(11, 45)));

    const createSlotMutation = useCreateSlot();

    const [repeatSessions, setRepeatSessions] = useState(true);
    const [sessionName, setSessionName] = useState('');
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const getFormattedDate = () => {
        const monthName = MONTH_NAMES[selectedMonth];
        return `${selectedDay} ${monthName} ${selectedYear}`;
    };

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

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        const hoursStr = hours < 10 ? '0' + hours : hours;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hoursStr}:${minutesStr} ${ampm}`;
    };

    const onStartTimeChange = (event: any, selectedDate?: Date) => {
        setShowStartTimePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setStartTimeDate(selectedDate);
        }
    };

    const onEndTimeChange = (event: any, selectedDate?: Date) => {
        setShowEndTimePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setEndTimeDate(selectedDate);
        }
    };

    const handleCreate = async () => {
        const month = String(selectedMonth + 1).padStart(2, '0');
        const day = String(selectedDay).padStart(2, '0');
        const dateStr = `${selectedYear}-${month}-${day}`;

        const startTimeStr = formatTime(startTimeDate);
        const endTimeStr = formatTime(endTimeDate);

        createSlotMutation.mutate({
            date: dateStr,
            startTime: startTimeStr,
            endTime: endTimeStr,
        });
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <AppText bold size="FONT_18" color="#333333" style={styles.header}>
                    Set Availability
                </AppText>

                <View style={styles.inputGroup}>
                    <AppText size="FONT_12" color="#333333" style={styles.label}>
                        Date*
                    </AppText>
                    <View style={styles.dateInputContainer}>
                        <TextInput
                            style={styles.dateInput}
                            value={getFormattedDate()}
                            editable={false}
                            placeholderTextColor="#999999"
                        />
                        <Image source={icons.calendar} style={styles.calendarIcon} />
                    </View>
                </View>

                <View style={styles.timeRow}>
                    <View style={[styles.inputGroup, styles.timeInputGroup]}>
                        <AppText size="FONT_12" color="#333333" style={styles.label}>
                            Start Time*
                        </AppText>
                        <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                            <TextInput
                                style={styles.timeInput}
                                value={formatTime(startTimeDate)}
                                editable={false}
                                placeholderTextColor="#999999"
                                pointerEvents="none"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.inputGroup, styles.timeInputGroup]}>
                        <AppText size="FONT_12" color="#333333" style={styles.label}>
                            End Time*
                        </AppText>
                        <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                            <TextInput
                                style={styles.timeInput}
                                value={formatTime(endTimeDate)}
                                editable={false}
                                placeholderTextColor="#999999"
                                pointerEvents="none"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.repeatRow}>
                    <AppText size="FONT_14" medium color="#333333">
                        Repeat Sessions
                    </AppText>
                    <Switch
                        value={repeatSessions}
                        onValueChange={setRepeatSessions}
                        trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                        thumbColor="#FFFFFF"
                    />
                </View>

                <Calendar
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    selectedDay={selectedDay}
                    onDateSelect={handleDateSelect}
                    onPreviousMonth={handlePreviousMonth}
                    onNextMonth={handleNextMonth}
                />

                <View style={styles.inputGroup}>
                    <AppText size="FONT_12" color="#333333" style={styles.label}>
                        Session Name*
                    </AppText>
                    <TextInput
                        style={styles.sessionNameInput}
                        value={sessionName}
                        onChangeText={setSessionName}
                        placeholder="PT"
                        placeholderTextColor="#999999"
                    />
                </View>

                <AppButton
                    title="Create"
                    onPress={handleCreate}
                    style={styles.createButton}
                />

                {showStartTimePicker && (
                    <DateTimePicker
                        value={startTimeDate}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onStartTimeChange}
                    />
                )}
                {showEndTimePicker && (
                    <DateTimePicker
                        value={endTimeDate}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onEndTimeChange}
                    />
                )}

                <AppLoader
                    overlay
                    visible={createSlotMutation.isPending}
                    message="Creating slot..."
                />
            </View>
        </ScrollView>
    );
};

export default AvailabilityScreen;
