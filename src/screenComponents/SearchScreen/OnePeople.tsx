import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { vh, vw } from '../../utils/Dimensions'
import { colors } from '../../utils/RandomColors';

const OnePeople = ({ firstName, lastName }) => {

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0).toUpperCase()}${lastName
            .charAt(0)
            .toUpperCase()}`;
    };

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const backgroundColor = getRandomColor(); 
    

    return (
        <View style={styles.container}>
            <View style={[styles.defProfImg, {backgroundColor}]}>
                <Text style={{ color: 'white', fontWeight:'bold', fontSize:13 }}>
                    {getInitials(firstName, lastName)}
                </Text>
            </View>

            <View>
                <Text style={{ color: '#3A4F5F', fontSize: 14, fontWeight: '600', lineHeight: 19.6, marginBottom: vh(6) }}>{firstName} {lastName}</Text>
                <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 15.6, color: '#60707D' }}>You: i don't remember anything </Text>
            </View>
        </View>
    )
}

export default OnePeople

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    defProfImg: {
        height: vh(40),
        width: vw(40),
        borderRadius: 100,
        marginRight: vw(12),
        justifyContent: 'center',
        alignItems: 'center'
    },

})