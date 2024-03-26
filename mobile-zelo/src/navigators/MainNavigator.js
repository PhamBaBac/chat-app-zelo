import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { MessageScreen } from '../screens';


const MainNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Main" component={TabNavigator} /> */}
            <Stack.Screen name='TabNavigator' component={TabNavigator} />
            <Stack.Screen name='MessageScreen' component={MessageScreen} />
        </Stack.Navigator>
    );
}

export default MainNavigator