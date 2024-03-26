import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import HeaderComponent from '../../components/HeaderComponet';
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactScreen = () => {
    const contacts = [
        {
            id: 1,
            name: 'Alice',
            image: 'https://lab2cn.s3.ap-southeast-1.amazonaws.com/021710603201277.jpg',
            phoneNumber: '123-456-7890',
        },
        {
            id: 2,
            name: 'Bob',
            image: 'https://lab2cn.s3.ap-southeast-1.amazonaws.com/021710603201277.jpg',
            phoneNumber: '456-789-0123',
        },
        {
            id: 3,
            name: 'Charlie',
            image: 'https://lab2cn.s3.ap-southeast-1.amazonaws.com/021710603201277.jpg',
            phoneNumber: '789-012-3456',
        },
    ];

    const handlePressContact = (contact) => {
        console.log('Selected contact:', contact);
    };

    const renderContactItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePressContact(item)}>
            <View style={styles.contactItem}>
                <Image source={{ uri: item.image }} style={styles.contactImage} />
                <View style={styles.contactDetails}>
                    <View style={styles.contactHeader}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        <Icon name="phone" size={25} color={COLORS.gray4} style={styles.phoneIcon} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

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
                title="Liên hệ"
                fontFamily={"medium"}
                color={COLORS.white}
                size={18}
            />
            <FlatList
                data={contacts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderContactItem}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    contactImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    contactDetails: {
        flex: 1,
    },
    contactHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Đặt biểu tượng và tên liên hệ vào hai phía
        alignItems: 'center',
    },
    contactName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    phoneIcon: {
        marginLeft: 5,
    },
    flatListContent: {
        paddingBottom: 20, // Add padding to the bottom to separate the last item from the edge of the screen
    },
});

export default ContactScreen;
