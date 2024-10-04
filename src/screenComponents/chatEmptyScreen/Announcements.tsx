import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { vh, vw } from '../../utils/Dimensions';
import { Icons } from '../../assets/Index';

const Announcements = () => {
    return (
        <View style={styles.container}>
            <View style={styles.smallContainer}>
                <TouchableOpacity style={{backgroundColor:'#2A7BBB', height:vh(48), width:vw(48), alignItems:'center', justifyContent:'center', borderRadius:30, marginBottom:vh(8)}}>
                    <Image source={Icons.speaker} style={{ height: vh(20), width: vw(20), resizeMode: 'contain' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 10, color: '#60707D' }}>
                    Announcement
                </Text>
            </View>

        </View>
    );
};

export default Announcements;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        width: vw(361),
        height: vh(69),
        marginTop: vh(19),
        justifyContent: 'center',
    },
    smallContainer: {
        // borderWidth: 1,
        width: vw(79),
        alignItems: 'center',
        marginLeft: vw(7),
    },
});
