import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { vh, vw } from '../../utils/Dimensions';
import { Icons } from '../../assets/Index';

const Announcements = () => {
    return (
        <View style={styles.container}>
            <View style={styles.smallContainer}>
                <TouchableOpacity style={styles.speakerButton}>
                    <Image source={Icons.speaker} style={styles.speakerImage} />
                </TouchableOpacity>
                <Text style={styles.announcementText}>
                    Announcement
                </Text>
            </View>
        </View>
    );
};

export default Announcements;

const styles = StyleSheet.create({
    container: {
        width: vw(361),
        height: vh(69),
        marginTop: vh(19),
        justifyContent: 'center',
    },
    smallContainer: {
        width: vw(79),
        alignItems: 'center',
        marginLeft: vw(7),
    },
    speakerButton: {
        backgroundColor: '#2A7BBB',
        height: vh(48),
        width: vw(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginBottom: vh(8),
    },
    speakerImage: {
        height: vh(20),
        width: vw(20),
        resizeMode: 'contain',
    },
    announcementText: {
        fontSize: 10,
        color: '#60707D',
    },
});
