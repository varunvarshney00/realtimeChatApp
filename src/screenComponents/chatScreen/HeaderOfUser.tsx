import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { vh, vw } from '../../utils/Dimensions'
import { Icons } from '../../assets/Index'
import { doc, getDoc } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { goBack } from '../../utils/NavigationUtils'
import { colors } from '../../utils/RandomColors'


const HeaderOfUser = ({contactName}) => {

    // console.log("contactName==>",contactName)

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

                <TouchableOpacity style={styles.leftarrow} onPress={()=>goBack()}>
                    <Image source={Icons.backArrow} style={{ tintColor: '#3a4f5f', height: vh(20), width: vw(20), resizeMode: 'contain' }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', }}>



                    <View style={styles.titlecontainer}>
                        <View style={{height:vh(40), width:vw(40), backgroundColor, borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'white', fontWeight:'700', lineHeight:16.9, letterSpacing:-0.26, fontSize:13}}>{getInitials(contactName)}</Text>
                        </View>
                        <Text style={{width:vw(217), color:'#3A4F5F', fontSize:14, fontWeight:'600', lineHeight:19.6, letterSpacing:-0.14}}>{contactName}</Text>
                    </View>



                    <View style={styles.leftarrow}>
                        <Image source={Icons.threeDots} style={{ tintColor: '#3a4f5f', height: vh(20), width: vw(20), resizeMode: 'contain' }} />
                    </View>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default HeaderOfUser

const styles = StyleSheet.create({
    SafeAreaView: {
        borderWidth: 1,
        width: '100%',
        height: vh(123),
        alignItems: 'center',
        backgroundColor: '#f8f9f9',
        borderColor:'white',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    container: {
        // borderWidth: 1,
        width: vw(361),
        height: vh(40),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftarrow: {
        height: vh(40),
        width: vw(40),
        // borderWidth: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8
    },
    titlecontainer: {
        height: vh(40),
        width: vw(265),
        // borderWidth: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    rightone: {
        height: vh(40),
        width: vw(40),
    }
})