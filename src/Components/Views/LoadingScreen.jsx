import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({ navigation }) => {
    useEffect(() => {
        (async () => {
            const accessToken = await AsyncStorage.getItem("access_token");
            navigation.navigate(accessToken ? 'Match' : 'Login');
        })()
    }, []);
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#000' />
            {/* <Text>LoadingScreen</Text> */}
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffaf',
        alignItems: 'center',
        justifyContent: 'center',
    }
})