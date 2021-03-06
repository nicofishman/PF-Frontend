import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Svg, { Image } from 'react-native-svg';

const NavBar = (props) => {
    const { name: routeName } = useRoute();
    if (!props.navigation) return null
    return (

        <View style={styles.navbar}>
            <TouchableOpacity style={styles.button}
                onPress={() => props.navigation.navigate('Config')}
            >
                <MaterialCommunityIcons style={[styles.icon, routeName === 'Config' && styles.active]} name="account-circle" /></TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => props.navigation.navigate('Match')}
            >
                <Svg width={50} height={50} style={[styles.icon, styles.daioLogo]}>
                    <Image
                        href={require('../../Assets/logo.png')}
                        width={50}
                        height={50}
                        style={[routeName === 'Match' && styles.active]}
                    />
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => props.navigation.navigate('Chat')}
            >
                <Ionicons style={[styles.icon, routeName === 'Chat' && styles.active]} name="chatbubbles" />
            </TouchableOpacity>


        </View>
    )
}

export default NavBar

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    navbar: {
        width: windowWidth,
        height: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#ffffff',
        // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 50,
        color: '#aaa'
    },
    active: {
        color: '#888',
    },
    daioLogo: {
        //make saturation 0
        tintColor: 'gray',
    }

})