import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationrRef } from '../utils/NavigationUtils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../tabs/Tabs';
import SearchScreen from './SearchScreen';
import ChatRoom from './ChatRoom';



const Stack = createNativeStackNavigator();





const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationrRef}>


            <Stack.Navigator
                initialRouteName="Tabs"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
                {/* <Stack.Screen
                    options={{
                        animation: 'fade',
                    }}
                    name="DeliveryLogin"
                    component={DeliveryLogin} /> */}
                {/* <Stack.Screen
                    options={{
                        animation: 'fade',
                    }}
                    name="CustomerLogin"
                    component={CustomerLogin} /> */}
            </Stack.Navigator>


        </NavigationContainer>
    );
};

export default Navigation;

// const styles = StyleSheet.create({});
