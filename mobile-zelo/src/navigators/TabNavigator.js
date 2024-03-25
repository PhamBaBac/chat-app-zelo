import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, UserScreen } from '../screens';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Chat" component={HomeScreen} />
        </Tab.Navigator>
    );
}

export default TabNavigator