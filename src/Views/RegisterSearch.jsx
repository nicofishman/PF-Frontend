import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { searchTrack, searchArtist } from '../Handlers/AuthHandler';
import { getUserTopArtists, getUserTopTracks } from '../Handlers/AuthHandler';
import SongSearch from '../Components/SongSearch';
import ArtistSearch from '../Components/ArtistSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Buttons from '../Components/Search/Buttons';
import ButtonContinue from '../Components/pochi/ButtonContinue';

const RegisterSearch = ({ navigation }) => {
    const [text, setText] = useState("");
    const [search, setSearch] = useState(undefined)
    const [type, setType] = useState('cancion')
    const [accessToken, setAccessToken] = useState(null)
    const [topTracks, setTopTracks] = useState([])
    const [topArtists, setTopArtists] = useState([])

    useEffect(() => {
        (async () => {
            let result = await AsyncStorage.getItem("access_token");
            setAccessToken(result)
            const userArtists = await getUserTopArtists(result);
            setTopArtists(userArtists);
            const userTracks = await getUserTopTracks(result);
            setTopTracks(userTracks);
        })();
    }, [])

    useEffect(() => {
        setSearch(undefined)
        setText(undefined)
    }, [type])

    const onChangeText = async (e) => {
        setText(e);
        console.log(`"${e}"`);
        if (text.length === 0 || !e) {
            setSearch(undefined);
            console.log('vaciooooooooo');
            return;
        }
        if (type === 'cancion') {
            const res = await searchTrack(e, accessToken);
            setSearch(res);
        } else if (type === 'artista') {
            const res = await searchArtist(e, accessToken);
            setSearch(res);
        }
    }

    return (
        <>
            <View style={styles.container}>
                {/* <Text>{JSON.stringify(user?.display_name || 'null')}</Text> */}
                <View style={styles.buttonGroup}>
                    <Buttons active={type} setActive={setType} />
                </View>
                <View style={styles.inputBar}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        caretHidden={true}
                        placeholder={`Buscar ${type}...`}
                        placeholderTextColor="#999"
                    />
                    <Ionicons style={styles.iconSearch} name="search-outline"></Ionicons>
                </View>
                <View style={styles.line}></View>
                {search ?
                    type === 'cancion' ? search?.tracks.items.map((item, index) => {
                        return index <= 4 ? (
                            <SongSearch song={item} key={index} />
                        ) : null
                    }) : search?.artists.items.map((item, index) => {
                        return index <= 4 ? (
                            <ArtistSearch artist={item} key={index} />
                        ) : null
                    })
                    : null
                }
                <ButtonContinue onPress={() => navigation.navigate("Match")} />
            </View>
        </>
    )
}

export default RegisterSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    input: {
        height: 40,
        padding: 5,
        color: '#e0e0e0',
        fontSize: 18,
    },
    inputBar: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between'
    },
    card: {
        height: 100,
        width: 300,
        backgroundColor: '#ccc',
        flexDirection: 'column',
    },
    line: {
        width: 300,
        height: 4,
        backgroundColor: 'black',
        marginBottom: 40,
        borderRadius: 5
    },
    iconSearch: {
        fontSize: 30,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 10
    }
})