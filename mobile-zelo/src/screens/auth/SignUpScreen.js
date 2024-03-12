import { TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Checkbox } from "react-native-paper";
import React from "react";
import TextComponent from "../../components/TextComponent";
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponet";

const SignUpScreen = ({ navigation }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const onBackPress = () => {
    navigation.goBack();
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
          secureTextEntry={true}
        />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: APPINFOS.sizes.WIDTH * 0.94,
            marginVertical: 20
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
            marginBottom: 60
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
        <ButtonComponent
          title="Tiếp tục"
          onPress={() => {{}}}
        />
      </View>
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
