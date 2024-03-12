import React from 'react'
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
    );
}

export default MainNavigator