import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { useAuth } from '@providers/AuthProvider';
import { useTheme } from '@providers/ThemeProvider';
import { spacing } from '@theme/spacing';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppText } from '@components/index';
import { icons } from '@assets/images';
import WorkoutStack from '@navigation/WorkoutStack';
import ClientScreen from '@screens/Main/ClientScreen';
import AvailabilityScreen from '@screens/Main/AvailabilityScreen';
import BookSlotsScreen from '@screens/Main/BookSlotsScreen';

const Tab = createMaterialTopTabNavigator();

const HomeTopTabs = () => {
    const theme = useTheme();

    const Header = () => {
        const { signOut } = useAuth();
        const navigation = useNavigation<any>();
        const queryClient = useQueryClient();

        const handleLogout = async () => {
            try {
                await signOut();
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        const handleRefresh = () => {
            queryClient.invalidateQueries();
            Toast.show({
                type: 'info',
                text1: 'Refreshing data...',
            });
        };

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                backgroundColor: theme.success,
                elevation: 4,
            }}>
                <TouchableOpacity
                    style={{ width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}
                    onPress={handleLogout}
                >
                    <MaterialIcons name="menu" size={24} color={theme.white} />
                </TouchableOpacity>

                <AppText bold size="FONT_18" color={theme.white}>
                    Workout Management
                </AppText>

                <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                    <TouchableOpacity
                        style={{ width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}
                        onPress={handleRefresh}
                    >
                        <Image source={icons.refresh} style={{ width: 20, height: 20, tintColor: theme.white }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={22} color={theme.white} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <>
            <Header />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarScrollEnabled: false,
                    tabBarIndicatorStyle: { backgroundColor: theme.success, height: 2 },
                    tabBarStyle: { backgroundColor: theme.background, borderBottomColor: theme.border, borderBottomWidth: 1 },
                    tabBarItemStyle: { flex: 1 },
                    tabBarActiveTintColor: theme.success,
                    tabBarInactiveTintColor: theme.textSecondary,
                    swipeEnabled: true,
                    tabBarPressColor: 'transparent',
                    tabBarLabel: ({ color }) => <AppText size="FONT_14" medium color={color} style={{ textAlign: 'center' }}>{route.name}</AppText>,
                })}
            >
                <Tab.Screen name="Workout" component={WorkoutStack} />
                <Tab.Screen name="Client" component={ClientScreen} />
                <Tab.Screen name="Availability" component={AvailabilityScreen} />
                <Tab.Screen name="Book Slots" component={BookSlotsScreen} />
            </Tab.Navigator>
        </>
    );
};

export default HomeTopTabs;
