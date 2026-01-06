import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutScreen from '@screens/Main/WorkoutScreen';
import AddWorkoutPlanScreen from '@screens/Main/AddWorkoutPlanScreen';

export type WorkoutStackParamList = {
    WorkoutList: undefined;
    AddWorkoutPlan: undefined;
};

const Stack = createStackNavigator<WorkoutStackParamList>();

const WorkoutStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="WorkoutList" component={WorkoutScreen} />
            <Stack.Screen name="AddWorkoutPlan" component={AddWorkoutPlanScreen} />
        </Stack.Navigator>
    );
};

export default WorkoutStack;
