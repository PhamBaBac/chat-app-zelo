import React, { useEffect, useState } from 'react';
import SplashScreen from './src/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsShowSplash(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <NavigationContainer>
        {isShowSplash ? <SplashScreen /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}

export default App;
