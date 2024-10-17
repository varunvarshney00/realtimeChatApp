import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icons } from '../../assets/Index';
import { vh, vw } from '../../utils/Dimensions';
import { goBack } from '../../utils/NavigationUtils';

const SearchHeader = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftarrow} onPress={() => goBack()}>
                <Image source={Icons.backArrow} style={styles.backArrow} />
            </TouchableOpacity>

            <View style={styles.searchBarContainer}>
                <TextInput style={styles.searchBar} placeholder="Search here..." placeholderTextColor="#ABB3BA" />
            </View>
        </View>
    );
}

export default SearchHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    searchBarContainer: {
        flexDirection: 'row',
        height: vh(48),
        width: vw(297),
        borderRadius: 8,
        backgroundColor: '#ffffff',
        fontWeight: '500',
        alignItems: 'center',
    },
    searchBar: {
        fontSize: vh(15),
        marginLeft: vw(20),
        width: vw(258),
    },
    leftarrow: {
        height: vh(48),
        width: vw(48),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    backArrow: {
        height: vh(20),
        width: vw(20),
        resizeMode: 'contain',
        tintColor: '#3A4F5F',
    },
});
