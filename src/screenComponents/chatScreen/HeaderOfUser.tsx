import { Alert, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vh, vw } from '../../utils/Dimensions';
import { Icons } from '../../assets/Index';
import { doc, getDoc } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { goBack } from '../../utils/NavigationUtils';
import { colors } from '../../utils/RandomColors';
import { Modal } from 'react-native';

const HeaderOfUser = ({ contactName, chatId }) => {

    const deleteAllMessages = async () => {
        Alert.alert(
            "Delete Messages",
            `Are you sure you want to delete all messages with ${contactName}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const messagesCollection = firestore()
                                .collection('chats')
                                .doc(chatId)
                                .collection('messages');

                            const snapshot = await messagesCollection.get();

                            const batch = firestore().batch();

                            snapshot.forEach((doc) => {
                                batch.delete(doc.ref);
                            });

                            await batch.commit();
                            console.log(`All messages for chat ${chatId} deleted successfully`);
                            closeModal();
                        } catch (error) {
                            console.error("Error deleting messages: ", error);
                        }
                    }
                }
            ]
        );
    };

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const getInitials = (fullName: string): string => {
        if (typeof fullName !== 'string' || !fullName.trim()) {
            return '';
        }

        const names = fullName.split(' ').filter(name => name.trim() !== '');

        if (names.length === 0) {
            return '';
        } else if (names.length === 1) {
            return `${names[0].charAt(0).toUpperCase()}`;
        } else {
            return `${names[0].charAt(0).toUpperCase()}${names[names.length - 1].charAt(0).toUpperCase()}`;
        }
    };

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const backgroundColor = getRandomColor();

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.leftarrow} onPress={() => goBack()}>
                    <Image source={Icons.backArrow} style={styles.backArrow} />
                </TouchableOpacity>

                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <View style={[styles.initialsContainer, { backgroundColor }]}>
                            <Text style={styles.initialsText}>{getInitials(contactName)}</Text>
                        </View>
                        <Text style={styles.contactNameText}>{contactName}</Text>
                    </View>

                    <TouchableOpacity style={styles.leftarrow} onPress={openModal}>
                        <Image source={Icons.threeDots} style={styles.threeDots} />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalRow}>
                                    <Image source={Icons.eye} style={styles.modalIcon} />
                                    <Text style={styles.modalText}>View details</Text>
                                </View>

                                <View style={styles.modalDivider} />

                                <View style={styles.modalRow}>
                                    <Image source={Icons.pin} style={styles.modalIcon} />
                                    <Text style={styles.modalText}>Pin chat</Text>
                                </View>

                                <View style={styles.modalDivider} />

                                <View style={styles.modalRow}>
                                    <Image source={Icons.blackSearch} style={styles.modalIcon} />
                                    <Text style={styles.modalText}>Search chat</Text>
                                </View>

                                <View style={styles.modalDivider} />

                                <TouchableOpacity style={styles.modalRow} onPress={deleteAllMessages}>
                                    <Image source={Icons.delete} style={styles.modalIcon} />
                                    <Text style={styles.modalText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}

export default HeaderOfUser;

const styles = StyleSheet.create({
    SafeAreaView: {
        borderWidth: 1,
        width: '100%',
        height: vh(123),
        alignItems: 'center',
        backgroundColor: '#f8f9f9',
        borderColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    container: {
        width: vw(361),
        height: vh(40),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftarrow: {
        height: vh(40),
        width: vw(40),
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8
    },
    backArrow: {
        tintColor: '#3a4f5f',
        height: vh(20),
        width: vw(20),
        resizeMode: 'contain'
    },
    rowContainer: {
        flexDirection: 'row',
    },
    titleContainer: {
        height: vh(40),
        width: vw(265),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    initialsContainer: {
        height: vh(40),
        width: vw(40),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        color: 'white',
        fontWeight: '700',
        lineHeight: 16.9,
        letterSpacing: -0.26,
        fontSize: 13
    },
    contactNameText: {
        width: vw(217),
        color: '#3A4F5F',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 19.6,
        letterSpacing: -0.14
    },
    threeDots: {
        tintColor: '#3a4f5f',
        height: vh(20),
        width: vw(20),
        resizeMode: 'contain'
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
        height: vh(303)
    },
    modalRow: {
        flexDirection: 'row',
        marginBottom: vw(21.5),
        alignItems: 'center'
    },
    modalIcon: {
        width: vw(24),
        height: vh(24),
        resizeMode: 'contain',
        marginRight: vw(12)
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'medium',
    },
    modalDivider: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.06)',
        marginBottom: vh(21.5)
    },
})
