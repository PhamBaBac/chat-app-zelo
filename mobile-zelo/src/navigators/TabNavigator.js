import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ContactScreen } from '../screens';
import User from '../screens/user/UserScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
                tabBarStyle: {
                    display: 'flex',
                },
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Contact') {
                        iconName = focused ? 'address-book' : 'address-book';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'user' : 'user';
                    }
                    return <Icon name={iconName} size={size} color={focused ? COLORS.primary : 'gray'} />;
                },
            })}
        >
            <Tab.Screen name="Tin nhắn" component={HomeScreen} />
            <Tab.Screen name="Danh bạ" component={ContactScreen} />
            <Tab.Screen name="Cá nhân" component={User} />
        </Tab.Navigator>
    );
};

export default TabNavigator;