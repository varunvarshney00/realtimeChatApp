import { FlatList, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contacts from 'react-native-contacts';
import { Platform } from 'react-native';
import SearchBar from '../chatEmptyScreen/SearchBar';
import OnePeople from './OnePeople';
import { vh, vw } from '../../utils/Dimensions';
import { navigate, push } from '../../utils/NavigationUtils';



const ReadContacts = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
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
                        console.log(contacts);
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

    return (
        <View>
            {contacts.length > 0 && (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.recordID}
                    style={styles.flatlist}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.contactContainer} onPress={()=>navigate('ChatRoom')}>
                            <OnePeople firstName={item.givenName} lastName={item.familyName} />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}

export default ReadContacts

const styles = StyleSheet.create({
    contactContainer: {
        height:vh(56),
        justifyContent:'center',
        borderWidth:1
    },
    flatlist: {
        borderWidth: 1,
        marginTop: vh(16),
        borderColor: '#ffffff',
        backgroundColor: '#f8f9f9',
        borderRadius: 8,
        width: vw(361),
        padding: 16,
    }
})