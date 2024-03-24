import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import ButtonComponent from '../../components/ButtonComponent'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'
const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuth({}));
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: COLORS.primary}}>HomeScreen</Text>
      <ButtonComponent title="LOG OUT" onPress={handleLogout}/>
    </View>
  );
};

export default HomeScreen;