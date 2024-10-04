import { Image, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatEmptyScreen from '../screens/ChatEmptyScreen';
import { vh, vw } from '../utils/Dimensions';
import { Icons } from '../assets/Index';

const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false, tabBarStyle: {
                    height: vh(80),
                },
            }}
        >
            <Tab.Screen name="HOME" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', marginTop: vh(12) }}>


                        {focused && <View style={{ borderWidth: 1, width: vw(32), height: vh(2), borderColor: focused ? '#46A4BA' : '#85929c' }} />}

                        <Image source={Icons.homeBT} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: focused ? '#46a4ba' : '#85929c', marginTop: vh(12) }} />

                        <Text style={{ color: focused ? 'black' : '#85929C', fontWeight: focused ? '700' : '500', marginTop: vh(11), fontSize: 10, lineHeight: 16 }}>HOME</Text>

                    </View>
                ),
            }} />



            <Tab.Screen name="ACCOUNT" component={SettingsScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', marginTop: vh(12) }}>


                        {focused && <View style={{ borderWidth: 1, width: vw(32), height: vh(2), borderColor: focused ? '#46A4BA' : '#85929c' }} />}

                        <Image source={Icons.personBT} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: focused ? '#46a4ba' : '#85929c', marginTop: vh(12) }} />

                        <Text style={{ color: focused ? 'black' : '#85929C', fontWeight: focused ? '700' : '500', marginTop: vh(11), fontSize: 10, lineHeight: 16 }}>ACCOUNT</Text>

                    </View>
                ),
            }} />



            <Tab.Screen name="FAVORITES" component={Varun} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', marginTop: vh(12) }}>


                        {focused && <View style={{ borderWidth: 1, width: vw(32), height: vh(2), borderColor: focused ? '#46A4BA' : '#85929c' }} />}

                        <Image source={Icons.favoritesBT} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: focused ? '#46a4ba' : '#85929c', marginTop: vh(12) }} />

                        <Text style={{ color: focused ? 'black' : '#85929C', fontWeight: focused ? '700' : '500', marginTop: vh(11), fontSize: 10, lineHeight: 16 }}>FAVORITES</Text>

                    </View>
                ),
            }} />


            
            <Tab.Screen name="MENU" component={ChatEmptyScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', marginTop: vh(12) }}>


                        {focused && <View style={{ borderWidth: 1, width: vw(32), height: vh(2), borderColor: focused ? '#46A4BA' : '#85929c' }} />}

                        <Image source={Icons.menuBT} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: focused ? '#46a4ba' : '#85929c', marginTop: vh(12) }} />

                        <Text style={{ color: focused ? 'black' : '#85929C', fontWeight: focused ? '700' : '500', marginTop: vh(11), fontSize: 10, lineHeight: 16 }}>MENU</Text>

                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
};

export default Tabs;

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function Varun() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Varun!</Text>
        </View>
    );
}
