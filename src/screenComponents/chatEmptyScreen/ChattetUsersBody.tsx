import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const ChattetUsersBody = () => {

    const [usersWithChatHistory, setUsersWithChatHistory] = useState([]);


    const getUsersWithChatHistory = async () => {


        try {
            const chatsSnapshot = await firestore()
                .collection('chats')
                .get();




            //   console.log('chatssnapshots==>', chatsSnapshot);

            const usersWithChatHistory = [];



            // Step 2: For each chat, check if the 'messages' sub-collection exists and has data
            for (const chatDoc of chatsSnapshot.docs) {
                const messagesSnapshot = await chatDoc.ref.collection('messages').get();

                // If the 'messages' collection has documents, there is chat history
                if (!messagesSnapshot.empty) {
                    // Get the list of participants (users) from this chat
                    const chatData = chatDoc.data();
                    const participants = chatData.participants || [];
                    // console.log('participants=>>', participants);

                    // Add each user to the list of users with chat history (avoid duplicates)
                    participants.forEach(userId => {
                        if (!usersWithChatHistory.includes(userId)) {
                            usersWithChatHistory.push(userId);
                        }
                    });
                }
            }
            console.log("usersWithChatHistory==>",usersWithChatHistory[0])

            return usersWithChatHistory;

        } catch (error) {
            console.error("Error retrieving users with chat history:", error);
        }
    };




    // Call the function
    useEffect(() => {
        getUsersWithChatHistory().then(users => {
            setUsersWithChatHistory(users);
        });
    }, []);




    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users with Chat History:</Text>
            <ScrollView>
                {usersWithChatHistory.length > 0 ? (
                    usersWithChatHistory.map((userId, index) => (
                        <Text key={index} style={styles.userText}>
                            {userId}
                        </Text>
                    ))
                ) : (
                    <Text>No users with chat history.</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default ChattetUsersBody

const styles = StyleSheet.create({})