import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import { Avatar } from "react-native-paper";
import HeaderComponent from '../../components/HeaderComponet';

const MessageScreen = ({ route, navigation }) => {
    const { conversation } = route.params;
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState(conversation.messages || []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                isSent: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    return (
        <View style={globalStyles.container}>
            <HeaderComponent
                title={conversation.name}
                onBackPress={() => navigation.goBack()}
                color={COLORS.white}
                fontFamily="medium"
                size={18}
                style={{
                    flexDirection: "row",
                    backgroundColor: COLORS.primary,
                    height: APPINFOS.sizes.HEIGHT * 0.06,
                    alignItems: "center",
                    paddingLeft: 16,
                    justifyContent: "space-between"
                }}
            />
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.isSent ? styles.sentMessage : styles.receivedMessage]}>
                        {!item.isSent && <Avatar.Image source={{ uri: conversation.image }} size={30} style={styles.avatar} />}
                        <View style={[styles.messageContent, !item.isSent && styles.receivedMessageContent]}>
                            <Text style={item.isSent ? styles.sentMessageText : styles.receivedMessageText}>
                                {item.text}
                            </Text>
                            <Text style={styles.messageTime}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Nhập tin nhắn..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 10,
    },
    sentMessage: {
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
    },
    avatar: {
        marginRight: 10,
    },
    messageContent: {
        maxWidth: '80%',
        backgroundColor: COLORS.gray3,
        padding: 10,
        borderRadius: 10,
    },
    receivedMessageContent: {
        backgroundColor: COLORS.primary,
    },
    sentMessageText: {
        color: COLORS.black,
    },
    receivedMessageText: {
        color: COLORS.black,
    },
    messageTime: {
        color: COLORS.black,
        fontSize: 12,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 20,
        padding: 10,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginLeft: 10,
    },
    sendButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default MessageScreen;