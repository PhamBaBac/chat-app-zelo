import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, APPINFOS } from "../constants";

const ButtonComponent = ({ title, onPress, width, height, borderRadius, icon }) => {
  const buttonWidth = width || APPINFOS.sizes.WIDTH * 0.8;
  const buttonHeight = height || APPINFOS.sizes.HEIGHT * 0.08;
  const buttonBorderRadius = borderRadius || 40;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { width: buttonWidth, height: buttonHeight, borderRadius: buttonBorderRadius }]}
    >
      {icon && <Ionicons name={icon} size={30} color={COLORS.white} style={styles.icon} />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.white2,
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    fontSize: 40,
  }
});

export default ButtonComponent;
