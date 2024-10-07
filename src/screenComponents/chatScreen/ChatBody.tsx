import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { vh, vw } from '../../utils/Dimensions';
import moment from 'moment';


const ChatBody = ({ chatId, userId }) => {
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();





    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot(snapShot => {
                const allMessages = snapShot.docs.map(snap => snap.data());
                setMessages(allMessages);
            });

        return () => unsubscribe();
    }, [chatId]);





    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };





    const getMessageDate = (timestamp) => {
        if (!timestamp) {
            return ''; 
        }
    
        const messageDate = moment(timestamp.toDate());
        const today = moment().startOf('day'); 
        const yesterday = moment().subtract(1, 'days').startOf('day'); 
    
        if (messageDate.isSame(today, 'day')) {
            return 'Today';
        } else if (messageDate.isSame(yesterday, 'day')) {
            return 'Yesterday';
        } else {
            return messageDate.format('MMMM DD, YYYY');
        }
    };
    





    // Message view for the current user
    const UserMessageView = ({ message, time }) => (
        <View style={{ marginBottom: 28, marginRight: vw(16), }}>
            <Text style={styles.time}>{time}</Text>
            <View style={styles.userContainer}>
                <TouchableOpacity style={styles.userInnerContainer}>
                    <Text style={styles.message}>{message}</Text>
                </TouchableOpacity>
            </View>
        </View>

    );





    // Message view for other users
    const OtherUserMessageView = ({ message, time }) => (
        <View style={styles.otherUserContainer}>
            <View style={styles.otherUserInnerContainer}>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    );





    return (
        <>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={scrollToBottom}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>

                {messages.map((item, index) => (

                    <View key={index}>
                        <View style={{alignItems:'center', justifyContent:'center', marginTop:vh(31), marginBottom:vh(14)}}>
                            <Text style={styles.today}>
                                {getMessageDate(item.timestamp)}
                            </Text>
                        </View>




                        {item.sender === userId ? (
                            <UserMessageView
                                message={item.body}
                                time={item.timestamp?.toDate().toLocaleTimeString()}
                            />
                        ) : (
                            <OtherUserMessageView
                                message={item.body}
                                time={item.timestamp?.toDate().toLocaleTimeString()}
                            />
                        )}
                    </View>

                ))}
            </ScrollView>
        </>
    );
};

export default ChatBody;

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // borderWidth: 1,
        // height: vh(36),

    },
    otherUserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    userInnerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'flex-end',
        backgroundColor: '#2A7CBC',
        // borderWidth: 1,
        // height: vh(36),
        justifyContent: 'center',
        alignSelf: 'center',
        maxWidth: '70%',

    },
    otherUserInnerContainer: {
        // backgroundColor: Colors.primaryColor,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    message: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '500',
        lineHeight: 19.6,
        letterSpacing: -0.28,
    },
    time: {
        fontSize: 11,
        textAlign: 'right',
        color: '#60707D',
        marginBottom: 2,
        fontWeight: '500',
        lineHeight: 14.3,
        letterSpacing: -0.22
    },
    scrollView: {
        height: vh(631),
    },
    today: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#eff3f6',
        borderWidth: 1,
        borderColor: 'white',
        color: '#60707D',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 15.6,
        letterSpacing: -0.24,
        textAlign: 'center',
    }
});
