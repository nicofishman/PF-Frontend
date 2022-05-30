import React, { useState, useEffect } from 'react';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getSpotifyCredentials, getUserData, getUserTopArtists, getUserTopTracks, addUser } from '../../Handlers/AuthHandler'
import * as SecureStore from 'expo-secure-store';
import SpotifyLogin from '../SpotifyLogin';
import { initalizeFirebase } from '../../Handlers/FirebaseHandler'
import { NavigationRouteContext } from '@react-navigation/native';


async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function addUserToDatabase(data) {
    const userData = {
        spotifyId: data.id,
        username: data.display_name,
        avatarId: Math.floor(Math.random() * 15),
        description: data.email
    }
    await addUser(userData)
}

async function makeLogin(key, setData, setUserTopArtists, setUserTopTracks) {
    let result = await SecureStore.getItemAsync(key);
    if (result && result.length > 0) {
        const data = await getUserData(result);
        setData(data);
        await addUserToDatabase(data);
        const topArtists = await getUserTopArtists(result);
        setUserTopArtists(topArtists)
        const topTracks = await getUserTopTracks(result);
        setUserTopTracks(topTracks)
        return result;
    } else {
        setData(null);
        return;
    }
}

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


export default function Login({ navigation }) {
    const [data, setData] = useState('User is not logged in');
    const [userTopArtists, setUserTopArtists] = useState([]);
    const [accessToken, setAccessToken] = useState(undefined);
    const [userTopTracks, setUserTopTracks] = useState([]);

    const [credentials, setCredentials] = useState({})

    useEffect(async () => {
        const spotifyCredentials = await getSpotifyCredentials()
        setCredentials(spotifyCredentials)
        const access_token = await makeLogin('access_token', setData, setUserTopArtists, setUserTopTracks);
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
        SecureStore.setItemAsync('access_token', '').then(() => {
            setAccessToken(undefined);
        }).catch(err => {
            console.log(err);
        });
    }

    const getAccessToken = async () => {
        navigation.navigate("Pochi")
    }

    // useEffect(() => {
    //     console.log('accessToken: ', accessToken);
    // }, [accessToken]);

    useEffect(async () => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            await save('access_token', access_token)
            setAccessToken(access_token)
            await makeLogin('access_token', setData, setUserTopArtists, setUserTopTracks);
        }
    }, [request, response]);


    return (
        <>
            {accessToken && data ?
                (
                    <View style={styles.container}>
                        <Text>{JSON.stringify(data, null, "\t")}</Text>
                        {/* <Text>{JSON.stringify(userTopArtists) + '\n'}</Text> */}
                        {/* <Text>{JSON.stringify(userTopTracks)}</Text> */}
                        <SpotifyLogin title='Log Out' request={request} fnOnPress={logOut} />
                        <Button title='Match' onPress={() => navigation.navigate('Match')} />
                    </View>
                ) :
                <View style={styles.container}>
                    <SpotifyLogin title='Spotify Login' request={request} fnOnPress={spotifyPromptAsync} />
                    {/* <SpotifyLogin title='Google Login' request={request} fnOnPress={getAccessToken} /> */}
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
