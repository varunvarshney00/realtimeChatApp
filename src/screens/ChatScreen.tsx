import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderOfUser from '../screenComponents/chatScreen/HeaderOfUser'
import firestore from '@react-native-firebase/firestore';
import ChatBody from '../screenComponents/chatScreen/ChatBody';
import ChatFooter from '../screenComponents/chatScreen/ChatFooter';
import { Modal } from 'react-native';


const ChatScreen = (props) => {

    const [modalVisible, setModalVisible] = useState(false);


    const { contactId, userId } = props.route.params;
    // console.log('contactid==', contactId);
    console.log('userid==', userId);

    const generateChatId = () => {
        const sortedUserIds = [userId, contactId].sort();
        // console.log('sortedUserIds==>', sortedUserIds);
        const chatId = sortedUserIds.join('_');
        // console.log('chatId==>', chatId)
        return chatId;
    }

    const chatId = generateChatId();

    const chatRef = firestore().collection('chats').doc(chatId);
    console.log('chatRef==>', chatRef.get());
    const useRef = firestore().collection('users').doc(userId);
    console.log('useRef==>', useRef);
    const contactUserRef = firestore().collection('users').doc(contactId);
    // console.log('contactUserRef==>', contactUserRef);

    const createChatRoom = async () => {
        const chatSnapShot = await chatRef.get();
        if (!chatSnapShot.exists) {
            const participants = [useRef, contactUserRef];
            await chatRef.set({ participants });
        }
    };

    createChatRoom();

    const [contactName, setContactName] = useState('')

    // Fetch the user document for 'contactUserRef'
    contactUserRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Contact user data:", doc.data().contactName); // Contact data will include name if stored
            setContactName(doc?.data()?.contactName);
        } else {
            console.log("No such document!");
        }
    });


    return (
        <View style={{ flex: 1, backgroundColor: '#e7edf3' }}>
            <HeaderOfUser chatId={chatId} contactName={contactName} />
            <ChatBody chatRef={chatRef} chatId={chatId} userId={userId} />
            {/* <ChatFooter chatRef={chatRef} userId={userId}/> */}
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})