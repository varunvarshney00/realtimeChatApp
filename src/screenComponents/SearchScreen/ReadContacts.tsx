import { FlatList, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contacts from 'react-native-contacts';
import { Platform } from 'react-native';
import SearchBar from '../chatEmptyScreen/SearchBar';
import OnePeople from './OnePeople';
import { vh, vw } from '../../utils/Dimensions';
import { navigate, push } from '../../utils/NavigationUtils';
import { getDeviceId } from '../../utils/Helper';
import firestore from '@react-native-firebase/firestore';
import SearchHeader from './SearchHeader';


const ReadContacts = () => {

    const [contacts, setContacts] = useState([]);
    const [userId, setUserId] = useState('');
    const [searchText, setSearchText] = useState('');





    useEffect(() => {
        getDeviceId().then(id => setUserId(id));
        Platform.OS === 'ios' ?
            (
                Contacts.getAll()
                    .then((contacts) => {
                        setContacts(contacts);

                    })
                    .catch((e) => {
                        console.log(e);
                    })
            ) : (
                readContacts()
            );
    }, []);








    const readContacts = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
        })
            .then((res) => {
                console.log('Permission: ', res);
                Contacts.getAll()
                    .then((contacts) => {
                        // console.log(contacts.id);
                        setContacts(contacts);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((error) => {
                console.error('Permission error: ', error);
            });
    };


    const filteredContacts = contacts.filter(contact =>
        `${contact.givenName} ${contact.familyName}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );





    const onNavigate = async (contact) => {
        try {
            // Check if the contact already exists in Firestore
            const existingUserSnapshot = await firestore()
                .collection('users')
                .where('contactId', '==', contact.recordID)
                .get();

            let contactId;

            if (!existingUserSnapshot.empty) {
                // If the user already exists, get the first user's Firestore ID
                contactId = existingUserSnapshot.docs[0].id;
            } else {
                // Add contact data to the Firestore 'users' collection if it doesn't exist
                const newUser = await firestore().collection('users').add({
                    contactName: contact.givenName + ' ' + contact.familyName, // The contact's full name
                    contactId: contact.recordID, // The contact's system ID from the phone
                });

                // Get the newly created user's unique ID from Firestore
                contactId = newUser.id;
            }

            // Navigate to the 'ChatRoom' screen, passing the device ID and the Firestore-generated or existing user ID
            navigate('ChatScreen', {
                contactId: contactId,    // Firestore-generated or existing unique user ID
                userId: userId           // User's device ID
            });

        } catch (error) {
            console.error('Error in Firestore operations: ', error);
        }
    };







    return (
        <View style={{ flex: 1 }}>
            {/* <SearchHeader searchText={searchText} setSearchText={setSearchText} /> */}
            {filteredContacts.length > 0 ? (
                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.recordID}
                    style={styles.flatlist}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.contactContainer} onPress={() => onNavigate(item)}>
                            <OnePeople firstName={item.givenName} lastName={item.familyName} />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.noResults}>No contacts found</Text>
            )}
        </View>
    )
}

export default ReadContacts

const styles = StyleSheet.create({
    contactContainer: {
        height: vh(72),
        justifyContent: 'center',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e9eaea',
    },
    flatlist: {
        borderWidth: 1,
        marginTop: vh(16),
        borderColor: '#ffffff',
        backgroundColor: '#f8f9f9',
        borderRadius: 8,
        width: vw(361),
        padding: 16,
    },
    straightLine: {
        borderWidth: 1,
        width: vw(329),
    }
})