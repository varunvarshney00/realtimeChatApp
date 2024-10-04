import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '../../assets/Index'
import { vh, vw } from '../../utils/Dimensions'
import { push } from '../../utils/NavigationUtils'

const NoChatsYet = () => {
  return (
    <View style={{flex:1, width:'100%', justifyContent:'center', alignItems:'center'}}>
        <Image source={Icons.noChatsYet} style={{width:vw(166), height:vh(129.14), resizeMode:'contain'}}/>
        <Text style={{fontSize:16, fontWeight:'700', lineHeight:20.8, color:'#3A4F5F'}}>No chats, yet!</Text>
        <TouchableOpacity style={{paddingVertical:14, paddingHorizontal:32, backgroundColor:'#2A7BBB', borderRadius:8, marginTop:vh(24)}} onPress={()=>{
            push('SearchScreen')
        }}>
            <Text style={{color:'white', fontSize:16, fontWeight:'500', lineHeight:20.8}}>Start chat</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NoChatsYet

const styles = StyleSheet.create({})