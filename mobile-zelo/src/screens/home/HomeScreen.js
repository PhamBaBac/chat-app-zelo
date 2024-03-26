import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponet';
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import { Avatar } from "react-native-paper";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [conversations, setConversations] = React.useState([
    {
      id: 1,
      name: 'Alice',
      image: 'https://lab2cn.s3.ap-southeast-1.amazonaws.com/021710603201277.jpg',
      lastMessage: 'Hello, how are you?',
      time: '10:30 AM',
      messages: [
        { id: 1, text: 'Hello, how are you?', isSent: false, time: '10:30 AM' },
        { id: 2, text: 'I am good, thanks!', isSent: true, time: '10:32 AM' },
        { id: 3, text: 'That\'s great!', isSent: false, time: '10:35 AM' },
      ],
    },
    {
      id: 2,
      name: 'Bob',
      image: 'https://lab2cn.s3.ap-southeast-1.amazonaws.com/021710603201277.jpg',
      lastMessage: 'I am good, thanks! How about you?',
      time: '11:15 AM',
      messages: [
        { id: 1, text: 'Hi Bob!', isSent: true, time: '11:10 AM' },
        { id: 2, text: 'I am good, thanks! How about you?', isSent: false, time: '11:15 AM' },
        { id: 3, text: 'I\'m doing well too.', isSent: true, time: '11:18 AM' },
      ],
    },
    {
      id: 3,
      name: 'Charlie',
      image: 'https://lab2cn.s3.ap-southeast-1.amazonaws.com/021710603201277.jpg',
      lastMessage: 'I am doing great!',
      time: '12:00 PM',
      messages: [
        { id: 1, text: 'Hey Charlie!', isSent: true, time: '11:55 AM' },
        { id: 2, text: 'I am doing great!', isSent: false, time: '12:00 PM' },
      ],
    },
  ]);

  const handlePress = (conversation) => {
    navigation.navigate('MessageScreen', { conversation }); // Đảm bảo MessageScreen là tên của màn hình chi tiết cuộc trò chuyện
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
        title="Trang chủ"
        fontFamily={"medium"}
        color={COLORS.white}
        size={18}
      />
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={[styles.conversation, { borderBottomColor: COLORS.gray5 }]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <View style={styles.messageContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conversation: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  image: {
    width: APPINFOS.sizes.HEIGHT * 0.1,
    height: APPINFOS.sizes.HEIGHT * 0.1,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageContainer: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
  },
  lastMessage: {
    color: COLORS.gray4,
  },
  time: {
    color: COLORS.gray4,
    fontSize: 12,
  },
});

export default HomeScreen;
