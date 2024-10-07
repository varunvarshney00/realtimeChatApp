import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { vh, vw } from '../../utils/Dimensions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icons } from '../../assets/Index'
import useKeyboardOffsetHeight from '../../utils/useKeyboardOffsetHeight'
import { Animated } from 'react-native'
import { useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const ChatFooter = ({ chatRef, userId }) => {

    const [message, setMessage] = useState('');
    // const [sendEnable, setSendEnable] = useState(false);

    const onChange = value => {
        setMessage(value);
        // setSendEnable(value.trim().length > 0);
    };

    const onSend = () => {
        if (message.trim()) {
            chatRef.collection('messages').add({
                body: message,
                sender: userId,
                timestamp: firestore.FieldValue.serverTimestamp(),
            });
            setMessage(''); // Clear message after sending
        }
    };

    const keyboardOffsetHeight = useKeyboardOffsetHeight();
    // const [inputText, setInputText] = useState('');
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedInputWidth = useRef(new Animated.Value(vw(333))).current;

    useEffect(() => {
        if (keyboardOffsetHeight == 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 1,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.9,
                duration: 1,
                useNativeDriver: true,
            }).start();
        }
    }, [keyboardOffsetHeight]);




    useEffect(() => {
        if (message.length > 0) {
            Animated.timing(animatedInputWidth, {
                toValue: vw(285), // Shrink TextInput
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedInputWidth, {
                toValue: vw(333), // Expand TextInput
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [message]);


    return (
        <Animated.View style={[styles.footer, { transform: [{ translateY: animatedValue }] }]}>
            <View style={styles.container}>
                <Image source={Icons.plus} style={{ width: 20, height: 20, resizeMode: 'contain' }} />



                <Animated.View style={{ width: animatedInputWidth }}>
                    <TextInput
                        placeholder='Message...'
                        style={styles.texinput}
                        value={message}
                        onChangeText={onChange}
                    />
                </Animated.View>


                {message.trim().length > 0 && (
                    <TouchableOpacity style={styles.send} onPress={onSend}>
                        <Image source={Icons.send} style={{ height: vh(20), width: vw(20), resizeMode: 'contain' }} />
                    </TouchableOpacity>
                )}


            </View>
        </Animated.View>
    )
}

export default ChatFooter

const styles = StyleSheet.create({
    footer: {
        // position: 'absolute',
        bottom: 0,
        // borderWidth:1,
        width: '100%',
        alignItems: 'center',
        height: vh(98),
        backgroundColor: '#f8f9f9',
        paddingTop: vh(12)
    },
    container: {
        // borderWidth:1,
        width: vw(361),
        height: vh(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    texinput: {
        // width: vw(333),
        // borderWidth:1,
        backgroundColor: '#ffffff',
        height: vh(40),
        fontSize: 14,
        padding: 12,
        maxWidth:vw(333)
    },
    send: {
        // borderWidth:1,
        backgroundColor: '#2A7BBB',
        borderRadius: 100,
        height: vh(40),
        width: vw(40),
        alignItems: 'center',
        justifyContent: 'center'
    }
})