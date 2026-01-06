import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { ScreenWrapper, AppText, AppButton } from '@components/index';
import { useTheme } from '@providers/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { icons } from '@assets/images';
import { styles } from './AddWorkoutPlanScreen.styles';

interface Exercise {
    id: string;
    name: string;
    sets: string;
    reps: string;
}

interface Day {
    id: string;
    dayNumber: number;
    name: string;
    exercises: Exercise[];
}

const AddWorkoutPlanScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const [workoutName, setWorkoutName] = useState('');
    const [days, setDays] = useState<Day[]>([
        {
            id: '1',
            dayNumber: 1,
            name: '',
            exercises: [{ id: '1', name: '', sets: '', reps: '' }],
        },
    ]);

    const handleAddDay = () => {
        const newDayNumber = days.length + 1;
        const newDay: Day = {
            id: Date.now().toString(),
            dayNumber: newDayNumber,
            name: '',
            exercises: [{ id: '1', name: '', sets: '', reps: '' }],
        };
        setDays([...days, newDay]);
    };

    const handleAddExercise = (dayId: string) => {
        setDays(
            days.map((day) =>
                day.id === dayId
                    ? {
                        ...day,
                        exercises: [
                            ...day.exercises,
                            {
                                id: Date.now().toString(),
                                name: '',
                                sets: '',
                                reps: '',
                            },
                        ],
                    }
                    : day
            )
        );
    };

    const handleDeleteExercise = (dayId: string, exerciseId: string) => {
        setDays(
            days.map((day) =>
                day.id === dayId
                    ? {
                        ...day,
                        exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
                    }
                    : day
            )
        );
    };

    const handleUpdateExercise = (
        dayId: string,
        exerciseId: string,
        field: keyof Exercise,
        value: string
    ) => {
        setDays(
            days.map((day) =>
                day.id === dayId
                    ? {
                        ...day,
                        exercises: day.exercises.map((ex) =>
                            ex.id === exerciseId ? { ...ex, [field]: value } : ex
                        ),
                    }
                    : day
            )
        );
    };

    const handleUpdateDay = (dayId: string, field: string, value: string) => {
        setDays(
            days.map((day) =>
                day.id === dayId
                    ? { ...day, [field]: value }
                    : day
            )
        );
    };

    const handleSubmit = () => {
        if (!workoutName.trim()) {
            Alert.alert('Error', 'Please enter a workout plan name');
            return;
        }

        const isValid = days.every((day) =>
            day.exercises.some((ex) => ex.name.trim() !== '')
        );

        if (!isValid) {
            Alert.alert('Error', 'Each day must have at least one exercise with a name');
            return;
        }

        Alert.alert('Success', 'Workout plan submitted successfully!');
        navigation.goBack();
    };

    return (
        <ScreenWrapper
            backgroundColor={theme.background}
            scrollable={true}
            statusBarStyle="light-content"
        >
            <View style={styles.contentWrapper}>
                <TextInput
                    style={[
                        styles.workoutNameInput,
                        {
                            borderColor: '#E0E0E0',
                            backgroundColor: '#FFFFFF',
                        },
                    ]}
                    placeholder="Beginner's Workout - 3 days"
                    placeholderTextColor="#999999"
                    value={workoutName}
                    onChangeText={setWorkoutName}
                />

                {days.map((day, dayIndex) => (
                    <View key={day.id} style={styles.daySection}>
                        <View style={styles.dayHeaderRow}>
                            <View style={[styles.dayBadge, { backgroundColor: '#4CAF50' }]}>
                                <AppText bold size="FONT_14" color="#FFFFFF">
                                    Day {day.dayNumber}
                                </AppText>
                            </View>

                            <TextInput
                                style={[
                                    styles.dayNameInput,
                                    {
                                        borderColor: '#E0E0E0',
                                        backgroundColor: '#FFFFFF',
                                        color: '#333333',
                                    },
                                ]}
                                placeholder={dayIndex === 0 ? 'Chest' : `Day ${day.dayNumber} Name`}
                                placeholderTextColor="#999999"
                                value={day.name}
                                onChangeText={(text) => handleUpdateDay(day.id, 'name', text)}
                            />

                            <TouchableOpacity
                                style={styles.dayDeleteButton}
                                onPress={() => {
                                    if (days.length > 1) {
                                        setDays(days.filter(d => d.id !== day.id));
                                    }
                                }}
                            >
                                <Image source={icons.delete} style={styles.deleteIconImage} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.exercisesContainer}>
                            <View style={styles.exerciseHeaderRow}>
                                <View style={styles.exerciseNameHeader} />
                                <AppText size="FONT_12" medium color="#333333" style={styles.setsHeader}>
                                    Sets
                                </AppText>
                                <AppText size="FONT_12" medium color="#333333" style={styles.repsHeader}>
                                    Reps
                                </AppText>
                                <View style={styles.deleteHeader} />
                            </View>

                            {day.exercises.map((exercise, exIndex) => (
                                <View key={exercise.id} style={styles.exerciseRow}>
                                    <TextInput
                                        style={[
                                            styles.exerciseNameText,
                                            {
                                                color: '#333333',
                                            },
                                        ]}
                                        placeholder={exIndex === 0 ? 'Chest' : 'Exercise name'}
                                        placeholderTextColor="#999999"
                                        value={exercise.name}
                                        onChangeText={(text) =>
                                            handleUpdateExercise(day.id, exercise.id, 'name', text)
                                        }
                                    />

                                    <TextInput
                                        style={[
                                            styles.setsInput,
                                            {
                                                borderColor: '#4CAF50',
                                                backgroundColor: '#FFFFFF',
                                                color: '#333333',
                                            },
                                        ]}
                                        placeholder="8"
                                        placeholderTextColor="#999999"
                                        keyboardType="number-pad"
                                        value={exercise.sets}
                                        onChangeText={(text) =>
                                            handleUpdateExercise(day.id, exercise.id, 'sets', text)
                                        }
                                    />

                                    <TextInput
                                        style={[
                                            styles.repsInput,
                                            {
                                                borderColor: '#4CAF50',
                                                backgroundColor: '#FFFFFF',
                                                color: '#333333',
                                            },
                                        ]}
                                        placeholder="5-8"
                                        placeholderTextColor="#999999"
                                        value={exercise.reps}
                                        onChangeText={(text) =>
                                            handleUpdateExercise(day.id, exercise.id, 'reps', text)
                                        }
                                    />

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDeleteExercise(day.id, exercise.id)}
                                    >
                                        <Image source={icons.delete} style={styles.deleteIconImage} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.addExerciseButton}
                            onPress={() => handleAddExercise(day.id)}
                        >
                            <MaterialIcons name="add" size={26} color="#FFFFFF" />
                        </TouchableOpacity>

                        <View style={styles.notesSection}>
                            <TextInput
                                style={[
                                    styles.notesInput,
                                    {
                                        borderColor: '#E0E0E0',
                                        backgroundColor: '#FFFFFF',
                                        color: '#333333',
                                    },
                                ]}
                                placeholder="Bench Press: www.benchpress.com\nEat Oats"
                                placeholderTextColor="#999999"
                                multiline
                                numberOfLines={3}
                            />
                            <AppText size="FONT_12" color="#F39C12" style={styles.wordCount}>
                                45 words remaining
                            </AppText>
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.addDayButton}
                    onPress={handleAddDay}
                >
                    <MaterialIcons name="add" size={32} color="#FFFFFF" />
                </TouchableOpacity>

                <AppButton title="Submit" onPress={handleSubmit} style={styles.submitButton} />
            </View>
        </ScreenWrapper>
    );
};

export default AddWorkoutPlanScreen;
