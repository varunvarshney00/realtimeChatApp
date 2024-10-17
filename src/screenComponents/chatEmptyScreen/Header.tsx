import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { vh, vw } from '../../utils/Dimensions';
import { Icons } from '../../assets/Index';

const Header = () => {
    return (
        <SafeAreaView style={styles.safeareaview}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.leftarrow}>
                    <Image source={Icons.backArrow} style={styles.iconImage} />
                </TouchableOpacity>

                <View style={styles.title}>
                    <View style={styles.chats}>
                        <Text style={styles.chatsText}>Chats</Text>
                    </View>

                    <View style={styles.contacts}>
                        <Text style={styles.contactsText}>45 Contacts</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.search}>
                    <Image source={Icons.search} style={styles.iconImage} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bell}>
                    <Image source={Icons.bell} style={styles.iconImage} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    safeareaview: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#2a7bbb',
    },
    container: {
        width: vw(361),
        marginTop: vh(7),
        marginBottom: vh(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftarrow: {
        height: vh(40),
        width: vw(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3e88c2',
        borderRadius: 8,
    },
    title: {
        width: vw(197),
        height: vh(40),
    },
    chats: {
        height: vh(20),
        marginBottom: vh(2),
    },
    contacts: {
        height: vh(18),
    },
    search: {
        height: vh(40),
        width: vw(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3e88c2',
        borderRadius: 8,
    },
    bell: {
        height: vh(40),
        width: vw(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3e88c2',
        borderRadius: 8,
    },
    iconImage: {
        height: vh(20),
        width: vw(20),
        resizeMode: 'contain',
    },
    chatsText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    contactsText: {
        opacity: 0.6,
        color: 'white',
        fontSize: 13,
        letterSpacing: -0.02,
    },
});
