import { StyleSheet, View, TextInput, TouchableOpacity, Animated, Image, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { vh, vw } from '../../utils/Dimensions';
import { Icons } from '../../assets/Index';





const ChatBody = ({ chatRef, chatId, userId }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const reactions = ['👍', '❤️', '😂', '🎉', '👎'];

    const removeReaction = (reaction) => {
        chatRef.collection('messages').doc(messageId).update({
            reactions: firestore.FieldValue.arrayRemove({ userId, reaction }),
        });
    };




    // Done
    const handleDeleteMessage = async () => {
        if (selectedMessage) {
            const messageId = selectedMessage._id as string;

            try {
                const messageRef = chatRef.collection('messages').doc(messageId);
                const messageSnapshot = await messageRef.get();


                if (messageSnapshot.exists) {
                    await messageRef.update({
                        body: 'You have deleted this message',
                        deleted: true,
                        reactions: [],
                    });

                    closeModal();
                    console.log('Message deleted successfully');
                } else {
                    console.warn('Message does not exist');
                }
            } catch (error) {
                console.error('Error deleting message: ', error);
            }
        }
    };





    const openModal = () => {
        setModalVisible(true);
    };





    const closeModal = () => {
        setModalVisible(false);
    };





    const handleLongPress = (context, message) => {
        setSelectedMessage(message);
        setModalVisible(true);
    };



    const handlingReactions = async (reaction) => {
        if (selectedMessage) {
            const messageId = selectedMessage._id as string;
            const newReaction = { userId, reaction };

            try {
                const messageRef = chatRef.collection('messages').doc(messageId);
                const messageSnapshot = await messageRef.get();



                if (!messageSnapshot.exists || messageSnapshot.data().deleted) {
                    console.warn('Cannot add reaction to a deleted message');
                    return;
                }

                const messageData = messageSnapshot.data();
                let updatedReactions = messageData.reactions || [];


                const userReactionIndex = updatedReactions.findIndex(
                    (r) => r.userId === userId
                );


                if (userReactionIndex > -1) {
                    updatedReactions[userReactionIndex].reaction = reaction;
                } else {
                    updatedReactions.push(newReaction);
                }

                await messageRef.update({ reactions: updatedReactions });
                closeModal();
            } catch (error) {
                console.error('Error adding or updating reaction: ', error);
            }
        }
    }


    // done
    const addReaction = (reaction: string) => {
        //user id === id
        handlingReactions(reaction);
        // if(user?.id == id){

        // }else{

        // }
    };





    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapShot => {
                const allMessages = snapShot.docs.map(snap => {
                    const message = snap.data();
                    return {
                        _id: snap.id,
                        text: message.deleted ? <Text style={{ color: '#60707D', fontWeight: '500', fontSize: vw(14) }}>This message has been deleted</Text> : message.body || '',
                        createdAt: message.timestamp ? message.timestamp.toDate() : new Date(),

                        user: {
                            _id: message.sender || 'unknown',
                            name: message.sender === userId ? 'You' : 'Other User',
                        },

                        deleted: message.deleted || false,
                        reactions: message.reactions || [],  // Add reactions to the message
                    };
                });

                setMessages(allMessages);
            });

        return () => unsubscribe();
    }, [chatId, userId]);





    // Function to handle sending messages
    const onSend = (newMessages = []) => {
        const text = newMessages[0]?.text.trim();
        if (text) {
            chatRef.collection('messages').add({
                body: text,
                sender: userId,
                timestamp: firestore.FieldValue.serverTimestamp(),
            });
            setInputText(''); // Clear input text
        }
    };





    // Custom Bubble styling for GiftedChat
    const renderBubble = (props) => {
        const message = props.currentMessage;
        return (
            <View style={{ position: 'relative', marginBottom: vh(28) }}>

                {message.reactions && message.reactions.length > 0 && (
                    <View style={[styles.reactionContainer]}>
                        {message.reactions.map((reactionObj, index) => (
                            <Text key={index} style={styles.reactionText}>
                                {reactionObj.reaction}
                            </Text>
                        ))}
                    </View>
                )}

                <Bubble
                    {...props}
                    containerStyle={{
                        left: {
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 10,
                            marginBotoom: vh(12)
                        },
                        right: {
                            // backgroundColor: 'green',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 10,
                            marginBotoom: vh(12)

                        },
                    }}
                    wrapperStyle={{
                        left: {
                            backgroundColor: message.deleted ? '#E5E8EA' : '#F8F9F9',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 10,
                            paddingVertical: vw(8),
                            paddinHorizontal: vh(12),
                            marginBotoom: vh(12),
                            borderWidth: 1,
                            borderColor: 'white'
                        },
                        right: {
                            backgroundColor: message.deleted ? '#E5E8EA' : '#2A7CBC',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 10,
                            paddingVertical: vw(8),
                            paddinHorizontal: vh(12),
                            marginBotoom: vh(12)

                        },
                    }}
                    textStyle={{
                        right: {
                            color: 'white',
                            fontSize: vw(14),
                            fontWeight: '500',
                        },
                    }}
                />
            </View>
        );
    };





    // Custom input toolbar rendering
    const renderInputToolbar = (props) => {
        return (
            <View style={styles.inputToolbarContainer}>
                <TouchableOpacity style={styles.addIconContainer}>
                    <Image source={Icons.plus} style={styles.addIcon} />
                </TouchableOpacity>

                <InputToolbar
                    {...props}
                    containerStyle={styles.inputToolbar}
                    text={inputText}
                    onTextChanged={(text) => setInputText(text)}
                />

                <TouchableOpacity onPress={() => {
                    if (inputText.trim()) {
                        onSend([{ text: inputText }]);
                        setInputText('');
                    }
                }}>
                    <View style={styles.imgContainer}>
                        <Image source={Icons.send} style={styles.sendIcon} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{ _id: userId }}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                inverted={true}
                renderSend={() => <></>}
                onLongPress={handleLongPress}
                renderTime={() => <></>}
                renderAvatar={() => <></>}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback onPress={() => { }}>

                            <View style={styles.modalContainerlongpress}>

                                <View style={{ flexDirection: 'row', marginBottom: vw(21.5), alignItems: 'center', justifyContent: 'space-between' }}>
                                    {reactions.map(reaction => (
                                        <TouchableOpacity key={reaction} onPress={() => addReaction(reaction)}>
                                            <Text style={styles.modalText1}>{reaction}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>



                                <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.06)', marginBottom: vh(21.5) }} />


                                <View style={{ flexDirection: 'row', marginBottom: vw(21.5), alignItems: 'center' }}>
                                    <Image source={Icons.reply} style={{ width: vw(24), height: vh(24), resizeMode: 'contain', marginRight: vw(12) }} />
                                    <Text style={styles.modalText}>Reply</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.06)', marginBottom: vh(21.5) }} />

                                <View style={{ flexDirection: 'row', marginBottom: vw(21.5), alignItems: 'center' }}>
                                    <Image source={Icons.forward} style={{ width: vw(24), height: vh(24), resizeMode: 'contain', marginRight: vw(12) }} />
                                    <Text style={styles.modalText}>Forward</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.06)', marginBottom: vh(21.5) }} />

                                <View style={{ flexDirection: 'row', marginBottom: vw(21.5), alignItems: 'center' }}>
                                    <Image source={Icons.copy} style={{ width: vw(24), height: vh(24), resizeMode: 'contain', marginRight: vw(12) }} />
                                    <Text style={styles.modalText}>Copy</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.06)', marginBottom: vh(21.5) }} />

                                <View style={{ flexDirection: 'row', marginBottom: vw(21.5), alignItems: 'center' }}>
                                    <Image source={Icons.star} style={{ width: vw(24), height: vh(24), resizeMode: 'contain', marginRight: vw(12) }} />
                                    <Text style={styles.modalText}>Star</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.06)', marginBottom: vh(21.5) }} />


                                <View style={{ flexDirection: 'row', marginBottom: vw(21.5), alignItems: 'center' }}>
                                    <Image source={Icons.report} style={{ width: vw(24), height: vh(24), resizeMode: 'contain', marginRight: vw(12) }} />
                                    <Text style={styles.modalText}>Report</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.06)', marginBottom: vh(21.5) }} />


                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleDeleteMessage}>
                                    <Image source={Icons.delete} style={{ width: vw(24), height: vh(24), resizeMode: 'contain', marginRight: vw(12) }} />
                                    <Text style={styles.modalText}>Delete</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>

    );
};

export default ChatBody;

const styles = StyleSheet.create({
    reactionText: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5,
    },
    inputToolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: vw(20),
        paddingRight: vw(20),
        paddingBottom: vh(10),
        paddingTop: vh(10),
        height: vh(98),
        backgroundColor: '#F8F9F9',
    },
    addIconContainer: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        width: vw(24),
        height: vh(24),
        // borderWidth:1
    },
    sendIcon: {
        width: vw(20),
        height: vh(20),
        // borderWidth:1

    },
    imgContainer: {
        padding: vh(10),
        borderRadius: vw(30),
        // borderWidth:1,
        backgroundColor: '#2A7BBB',
    },
    inputToolbar: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        borderTopWidth: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    deleteButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        paddingBottom: 36,
        height: vh(303),
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'medium',

    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2A7CBC',
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    modalContainerlongpress: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        paddingBottom: 36,
        height: vh(513),
    },
    modalText1: {
        fontSize: 32,
    },
    reactionContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'center',
        zIndex: 999,
        position: 'absolute',
        width: vw(26),
        height: vh(25),
        borderRadius: vw(8),
        // resizeMode: 'contain',
        backgroundColor: '#F8F9F9',
        borderColor: '#FFFFFF',
        top: -vh(14),
        // paddingVertical: vh(4),
        // paddingHorizontal: vw(6),
        left: vh(55),
        alignItems: 'center',
        borderWidth: 1
    },
});
