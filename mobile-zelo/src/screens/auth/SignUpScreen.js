import { TextInput, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import React from "react";
import TextComponent from "../../components/TextComponent";
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponet";
import LoadingModal from "../../modals/LoadingModal";
import authApi from "../../apis/authApi";
import { validate } from "../../utils/validate";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAuth } from "../../redux/reducers/authReducer";
const initValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [values, setValues] = useState(initValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      values.password ||
      values.confirmPassword ||
      values.email ||
      values.fullName ||
      termsAccepted
    ) {
      setErrorMessage("");
    }
  }, [
    values.confirmPassword,
    values.email,
    values.fullName,
    values.password,
    termsAccepted,
  ]);

  const handleChange = (key, value) => {
    const data = { ...values };
    data[key] = value;
    setValues(data);
  };

  const handleSignUp = async () => {
    const { fullName, email, password, confirmPassword } = values;

    if (!fullName) {
      setErrorMessage("Tên không được để trống");
      return;
    }

    if (!validate.email(email)) {
      setErrorMessage("Email không hợp lệ");
      return;
    }

    if (!password) {
      setErrorMessage("Mật khẩu không được để trống");
      return;
    } else if (!validate.password(password)) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Bạn phải chấp nhận điều khoản");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await authApi.handleAuthencation(
        "/register",
        {
          fullname: values.fullName,
          email: values.email,
          password: values.password,
        },
        "POST"
      );
      dispatch(addAuth(response.data));
      console.log("data: ", response.data);
      await AsyncStorage.setItem("auth", JSON.stringify(response.data));
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setErrorMessage("Đăng ký không thành công");
      setIsLoading(false);
    }
  };
  return (
    <View style={globalStyles.container}>
      <HeaderComponent
        style={{
          flexDirection: "row",
          height: APPINFOS.sizes.HEIGHT * 0.06,
          alignItems: "center",
          paddingLeft: 16,
          justifyContent: "space-between",
        }}
        onBackPress={onBackPress}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: APPINFOS.sizes.HEIGHT * 0.06,
          marginTop: 20,
        }}
      >
        <TextComponent
          text="Đăng ký tài khoản Zelo"
          size={20}
          fontFamily="medium"
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, { marginTop: 20 }]}
          placeholder="Full name"
          onChangeText={(value) => handleChange("fullName", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(value) => handleChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={(value) => handleChange("password", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        {errorMessage && (
          <TextComponent
            text={errorMessage}
            size={16}
            color={COLORS.red}
            fontFamily="medium"
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: APPINFOS.sizes.WIDTH * 0.94,
            marginVertical: 20,
          }}
        >
          <Checkbox
            status={termsAccepted ? "checked" : "unchecked"}
            onPress={() => {
              setTermsAccepted(!termsAccepted);
            }}
            color={COLORS.primary}
          />
          <TextComponent
            text="Tôi đồng ý với điều khoản sử dụng của Zelo"
            size={16}
            color={COLORS.primary}
            fontFamily="medium"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: APPINFOS.sizes.WIDTH * 0.94,
            marginBottom: 60,
          }}
        >
          <Checkbox
            status={termsAccepted ? "checked" : "unchecked"}
            onPress={() => {
              setTermsAccepted(!termsAccepted);
            }}
            color={COLORS.primary}
          />
          <TextComponent
            text="Tôi đồng ý với điều khoản mạng xã hội của Zelo"
            size={16}
            color={COLORS.primary}
            fontFamily="medium"
          />
        </View>

        <ButtonComponent title="Tiếp tục" onPress={handleSignUp} />
      </View>
      <LoadingModal isVisible={isLoading} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    justifyContent: "center",
    alignItems: "center",
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
