import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@components/index';
import { useTheme } from '@providers/ThemeProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { icons } from '@assets/images';
import { INITIAL_WORKOUTS } from '@shared/data/constants';
import { styles } from './WorkoutScreen.styles';

const WorkoutScreen = () => {
    const navigation = useNavigation<any>();
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.dropdown, { backgroundColor: theme.card }]}>
                <AppText size="FONT_14" medium color={theme.text}>
                    Custom Workout Plans
                </AppText>
                <MaterialIcons name="keyboard-arrow-down" size={20} color={theme.textSecondary} />
            </TouchableOpacity>

            {INITIAL_WORKOUTS.map((workout) => (
                <View key={workout.id} style={[styles.workoutItem, { borderBottomColor: theme.border }]}>
                    <AppText size="FONT_14" color={theme.text}>
                        {workout.title}
                    </AppText>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Image source={icons.delete} style={styles.deleteIconImage} />
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity
                style={[styles.addButton, { backgroundColor: theme.success }]}
                onPress={() => navigation.navigate('AddWorkoutPlan')}
            >
                <MaterialIcons name="add" size={28} color={theme.white} />
            </TouchableOpacity>
        </View>
    );
};

export default WorkoutScreen;
