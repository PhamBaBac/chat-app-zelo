import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextComponent from './TextComponent';
import { COLORS } from '../constants';

const HeaderComponent = ({ title, onBackPress, icons=[], placeholder, style,color, fontFamily, size }) => {
    return (
        <View style={[styles.container, style]}>
            {onBackPress && (
                <TouchableOpacity onPress={onBackPress}>
                    <Ionicons name="arrow-back" size={24} color={color} />
                </TouchableOpacity>
            )}
            <TextComponent text={title} color={COLORS.white} fontFamily={fontFamily} size={size}/>
            {icons.map((icon, index) => (
                <Ionicons key={index} name={icon.name} size={24} color="black" />
            ))}
            <TextInput placeholder={placeholder} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
});

export default HeaderComponent;