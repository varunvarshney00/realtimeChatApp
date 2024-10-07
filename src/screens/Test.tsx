
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';


const ChatEmptyScreen = () => {

    const getUserData = async ()=>{
        const userRef = await firestore().collection('users').doc('Gu3FW98uSdNFmqtH92LG').get();
        // console.log('userRef==>', userRef);
    };


    useEffect(() => {
      getUserData();
    }, []);


  return (
    <View>
      <Text>ChatEmptyScreen</Text>
    </View>
  );
};

export default ChatEmptyScreen;

const styles = StyleSheet.create({});
