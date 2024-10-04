import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { vh, vw } from '../../utils/Dimensions';
import { Icons } from '../../assets/Index';

const Header = () => {
    return (
        <SafeAreaView style={styles.safeareaview}>

            <View style={styles.container}>

                <TouchableOpacity style={styles.leftarrow}>
                    <Image source={Icons.backArrow} style={{ height: vh(20), width: vw(20), resizeMode: 'contain' }} />
                </TouchableOpacity>

                <View style={styles.title}>

                    <View style={styles.chats}>
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
                            Chats
                        </Text>
                    </View>

                    <View style={styles.contacts}>
                        <Text style={{ opacity: .6, color: 'white', fontSize: 13, letterSpacing: -.02 }}>
                            45 Contacts
                        </Text>

                    </View>

                </View>

                <TouchableOpacity style={styles.search}>
                    <Image source={Icons.search} style={{ height: vh(20), width: vw(20), resizeMode: 'contain' }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bell}>
                    <Image source={Icons.bell} style={{ height: vh(20), width: vw(20), resizeMode: 'contain' }} />
                </TouchableOpacity>

            </View>
        </SafeAreaView >
    );
};

export default Header;

const styles = StyleSheet.create({
    safeareaview: {
        // borderWidth: 1,
        height: vh(123),
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#2a7bbb',


    },
    container: {
        // borderWidth: 2,
        height: vh(40),
        width: vw(361),
        marginTop:vh(7),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftarrow: {
        height: vh(40),
        width: vw(40),
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3e88c2',
        borderRadius: 8
    },
    title: {
        width: vw(197),
        // borderWidth: 1,
        height: vh(40),
    },
    search: {
        height: vh(40),
        width: vw(40),
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3e88c2',
        borderRadius: 8
    },
    bell: {
        height: vh(40),
        width: vw(40),
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3e88c2',
        borderRadius: 8
    },
    chats: {
        height: vh(20),
        // borderWidth: 1,
        marginBottom: vh(2),
    },
    contacts: {
        height: vh(18),
        // borderWidth: 1,
    },
});
