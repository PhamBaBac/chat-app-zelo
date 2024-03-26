import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import ButtonComponent from "../../components/ButtonComponent";
import { useDispatch } from "react-redux";
import { authSelector, removeAuth } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const handleLogout = async() => {
    await AsyncStorage.clear();
    dispatch(removeAuth({}));
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        
      }}
    >
      <Text style={{ color: COLORS.primary, fontSize: 20 }}>Hello {user.fullname}</Text>
      <ButtonComponent title="LOG OUT" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
