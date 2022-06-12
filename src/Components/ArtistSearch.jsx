import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ArtistSearch = ({ artist }) => {
    return (
        <View style={[styles.container, styles.shadowBox]}>
            {artist.images[0].url &&
                <Image style={styles.image} source={{ "uri": artist.images[0].url }} />
            }
            <View style={styles.textSong}>
                <Text style={styles.title}>{artist.name}</Text>
            </View>
        </View>
    )
}

export default ArtistSearch

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        width: 300,
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#615e5e',
        borderRadius: 5,
        marginBottom: 15,
    },
    textSong: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    box: {
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#e0e0e0'
    },
    artists: {
        fontSize: 12,
        color: '#999',
    },
    image: {
        height: 60,
        width: 60,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 4,
    }
})