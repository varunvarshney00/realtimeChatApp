import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchHeader from '../screenComponents/SearchScreen/SearchHeader'
import SearchBar from '../screenComponents/chatEmptyScreen/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReadContacts from '../screenComponents/SearchScreen/ReadContacts'

const SearchScreen = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#E6EDF3', flex: 1, alignItems: 'center' }}>
            <SearchHeader />
            <ReadContacts />
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})