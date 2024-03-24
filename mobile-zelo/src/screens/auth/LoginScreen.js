import { Text, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import TextComponent from "../../components/TextComponent";
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponet";
import authApi from "../../apis/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAuth } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const hanhdleLogin = async () => {
    try {
      const response = await authApi.handleAuthencation(
        "/login",
        {
          email: email,
          password: password,
        },
        "POST"
      );
      dispatch(addAuth(response.data));
      console.log("data: ", response.data);
      await AsyncStorage.setItem('auth', JSON.stringify(response.data));
    } catch (error) {
      console.log("error: ", error);
    }
  };
  
  return (
    <View style={globalStyles.container}>
      <HeaderComponent
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.primary,
          height: APPINFOS.sizes.HEIGHT * 0.06,
          alignItems: "center",
          paddingLeft: 16,
          justifyContent: "space-between",
        }}
        title="Đăng nhập"
        fontFamily={"medium"}
        onBackPress={onBackPress}
        color={COLORS.white}
        size={18}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.gray3,
          height: APPINFOS.sizes.HEIGHT * 0.06,
        }}
      >
        <TextComponent
          text="Vui lòng nhập email vài mật khẩu để đăng nhập"
          size={16}
          fontFamily="medium"
          style={{ marginRight: 20 }}
        />
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TextComponent
          text="Lấy lại mật khẩu"
          size={16}
          color={COLORS.primary}
          fontFamily="medium"
          style={[styles.input, { borderBottomWidth: 0, marginTop: 20 }]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          icon={"arrow-forward"}
          width={APPINFOS.sizes.WIDTH * 0.2}
          height={APPINFOS.sizes.HEIGHT * 0.1}
          borderRadius={APPINFOS.sizes.WIDTH * 0.2}
          onPress={hanhdleLogin}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 20,
    marginBottom: 20,
  },
  input: {
    borderColor: COLORS.gray2,
    borderBottomWidth: 1,
    width: APPINFOS.sizes.WIDTH * 0.9,
    height: APPINFOS.sizes.HEIGHT * 0.04,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
});
