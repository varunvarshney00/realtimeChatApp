import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../screenComponents/chatEmptyScreen/Header'
import SearchBar from '../screenComponents/chatEmptyScreen/SearchBar'
import Announcements from '../screenComponents/chatEmptyScreen/Announcements'
import NoChatsYet from '../screenComponents/chatEmptyScreen/NoChatsYet'
import ReadContacts from '../screenComponents/SearchScreen/ReadContacts'
import ChattetUsersBody from '../screenComponents/chatEmptyScreen/ChattetUsersBody'

const ChatEmptyScreen = () => {
  return (
    <>
      <View style={styles.bigContainer}>
        <Header />
        <SearchBar />
        <Announcements />
        <NoChatsYet />
        {/* <ChattetUsersBody/> */}
      </View>
    </>
  )
}

export default ChatEmptyScreen

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: '#e7edf3',
    height: '100%',
    zIndex: -999,
    alignItems: 'center'
  }
})