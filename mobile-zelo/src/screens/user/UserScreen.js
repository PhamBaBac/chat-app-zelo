import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { useDispatch } from "react-redux";
import { authSelector, removeAuth } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { Avatar } from 'react-native-paper';
import ButtonComponent from '../../components/ButtonComponent';

const UserScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);

    const handleLogout = () => {
        dispatch(removeAuth({}));
    };



    return (
        <View style={styles.container}>
            <Avatar.Image
                size={40}
                source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{user.fullname}</Text>
            <Button title="Change Avatar" onPress={{}} />


            <ButtonComponent
                title="Đăng xuất"
                onPress={handleLogout}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
});

export default UserScreen;