import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAll } from './backend'
import { useState, useEffect } from 'react';

import Login from './src/Components/Views/Login';
import LoadingScreen from './src/Components/Views/LoadingScreen';
import Home from './src/Components/Views/Home';
import Config from './src/Components/Views/Config';
import Chat from './src/Components/Views/Chat';
import NavBar from './src/Components/NavBar';
import Pochi from './src/Components/Views/Pochi';


export default function App() {
    const Stack = createNativeStackNavigator();
    const [peliculas, setPeliculas] = useState()
    useEffect(async () => {
        getAll(setPeliculas)
    }, [])

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Pochi' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Pochi" component={Pochi}/>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </>
    );
    {/* <View>

    {/* <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Chat"
                        component={Chat}
                        options={{ title: 'Welcome' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <NavigationContainer>*/}
    // );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});