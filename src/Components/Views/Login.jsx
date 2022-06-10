import React, { useState, useEffect } from 'react';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getSpotifyCredentials, getUserData, getUserTopArtists, getUserTopTracks, addUser, getUsers } from '../../Handlers/AuthHandler'
import SpotifyLogin from '../SpotifyLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRegisterContext } from '../../Context/RegisterContext';


async function save(key, value) {
    await AsyncStorage.setItem(key, value);
}

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


export default function Login({ navigation }) {
    const [data, setData] = useState('User is not logged in');
    const [accessToken, setAccessToken] = useState(undefined);

    const [credentials, setCredentials] = useState({})

    const { setUsername, handleChangeNombre } = useRegisterContext()

    useEffect(async () => {
        const spotifyCredentials = await getSpotifyCredentials();
        setCredentials(spotifyCredentials)
        const access_token = await AsyncStorage.getItem('access_token');
        if (access_token) {
            setAccessToken(access_token)
        } else {
            setAccessToken(undefined)
        }
    }, []);


    const [request, response, spotifyPromptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: credentials.clientId,
            scopes: ['user-read-email', 'playlist-modify-public'],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: makeRedirectUri(credentials.redirectUri),
        },
        discovery
    );


    const logOut = async () => {
        console.log('Logging out');
        await AsyncStorage.setItem('access_token', '').then(() => {
            setAccessToken(undefined);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(async () => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            await save('access_token', access_token)
            setAccessToken(access_token)
            handleLogin(access_token)
            // await makeLogin('access_token', setData, setUserTopArtists, setUserTopTracks);
        }
    }, [request, response]);

    const handleLogin = async (token) => {
        const user = await getUserData(token);
        console.log(user.display_name);
        const usersInDb = await getUsers();
        const isUserInDb = usersInDb.some(userInDb => userInDb.spotifyId === user.id);
        if (!isUserInDb) {
            setUsername(user.id)
            handleChangeNombre(user.id)
            navigation.navigate('RegisterFirst', { user, accessToken });
        } else {
            navigation.navigate('Match');
        }
    }


    return (
        <>
            {accessToken && data ?
                (
                    <View style={styles.container}>
                        <Text>{JSON.stringify(data, null, "\t")}</Text>
                        <SpotifyLogin title='Log Out' fnOnPress={logOut} />
                        <Button title='Match' onPress={handleLogin} />
                    </View>
                ) :
                <View style={styles.container}>
                    <SpotifyLogin title='Spotify Login' fnOnPress={spotifyPromptAsync} />
                </View>
            }

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
