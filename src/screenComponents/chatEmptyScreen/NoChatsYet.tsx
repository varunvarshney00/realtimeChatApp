import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icons } from '../../assets/Index';
import { vh, vw } from '../../utils/Dimensions';
import { push } from '../../utils/NavigationUtils';

const NoChatsYet = () => {
  return (
    <View style={styles.container}>
      <Image source={Icons.noChatsYet} style={styles.image} />
      <Text style={styles.noChatsText}>No chats, yet!</Text>
      <TouchableOpacity style={styles.chatButton} onPress={() => push('SearchScreen')}>
        <Text style={styles.buttonText}>Start chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoChatsYet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: vw(166),
    height: vh(129.14),
    resizeMode: 'contain',
  },
  noChatsText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20.8,
    color: '#3A4F5F',
  },
  chatButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: '#2A7BBB',
    borderRadius: 8,
    marginTop: vh(24),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20.8,
  },
});
