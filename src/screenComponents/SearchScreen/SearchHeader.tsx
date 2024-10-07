import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '../../assets/Index'
import { vh, vw } from '../../utils/Dimensions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { goBack } from '../../utils/NavigationUtils'

const SearchHeader = () => {
    return (
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', gap:16}}>

            
            <TouchableOpacity style={styles.leftarrow} onPress={()=>goBack()}>
                <Image source={Icons.backArrow} style={{ height: vh(20), width: vw(20), resizeMode: 'contain', tintColor:'#3A4F5F'  }} />
            </TouchableOpacity>


            <View style={styles.searchBarContainer}>
                <TextInput style={styles.searchBar} placeholder="Search here..." placeholderTextColor="#ABB3BA" />
            </View>


        </View>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        height: vh(48),
        width: vw(297),
        borderRadius: 8,
        backgroundColor: '#ffffff',
        fontWeight: '500',
        alignItems: 'center',
        // borderWidth:1
    },
    searchBar: {
        fontSize: vh(15),
        // borderWidth:1,
        marginLeft:vw(20),
        width:vw(258),

    },
    leftarrow: {
        height: vh(48),
        width: vw(48),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        // borderWidth:1

    },
})