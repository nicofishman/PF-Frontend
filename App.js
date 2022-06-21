import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBottomTabNavigator from './src/Navigators/MainBottomTabNavigator';

import RegisterNavigation from './src/Navigators/RegisterNavigation';
import LoginStackNavigator from './src/Navigators/LoginStackNavigator';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='LoginStackNavigator' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginNavigator" component={LoginStackNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name='Main' component={MainBottomTabNavigator} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Register" component={RegisterNavigation} options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>

            <StatusBar style="auto" />
        </>
    );
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
