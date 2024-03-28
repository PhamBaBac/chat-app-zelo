import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignUpScreen, Verification } from '../screens';
import OnboardingScreen from '../screens/auth/OnbroadingScreen';
import TabNavigator from './TabNavigator';
import MainNavigator from './MainNavigator';
const AuthNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
            <Stack.Screen name="Verification" component={Verification} />

        </Stack.Navigator>
    );
};

export default AuthNavigator;
