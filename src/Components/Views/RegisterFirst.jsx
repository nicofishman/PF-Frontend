import { StyleSheet, TextInput, View, Alert, Text } from 'react-native'
import React from 'react'
import { useRegisterContext } from '../../Context/RegisterContext'
import ButtonContinue from '../pochi/ButtonContinue'
import Svg, { Image } from 'react-native-svg';


const RegisterFirst = ({ navigation }) => {
    const { nombre, descripcion, handleChangeNombre, handleChangeDesc, username, charsLeft } = useRegisterContext();

    const continuar = () => {
        if (nombre.length > 0 && descripcion.length > 0) {
            navigation.navigate('RegisterSecond')
        }
    }

    return (
        <View style={styles.container}>
            <Svg width={100} height={100}>
                <Image
                    href={require('../../Assets/Avatars/Default.png')}
                    width={100}
                    height={100}
                />
            </Svg>
            <TextInput
                style={[styles.input, styles.inputNombre, nombre.length <= 0 && styles.inputWarning]}
                onChangeText={handleChangeNombre}
                value={nombre}
                caretHidden={true}
                placeholder={username}
                placeholderTextColor="#999"
            />
            <TextInput
                style={[styles.input, styles.inputDesc, descripcion.length <= 0 && styles.inputRed]}
                placeholder={`Descripción`}
                onChangeText={handleChangeDesc}
                value={descripcion}
                multiline={true}
                numberOfLines={8}
            />
            {
                descripcion.length <= 0 &&
                <Text style={styles.error}>El campo no puede estar vacío</Text>
            }
            <ButtonContinue onPress={continuar} />
        </View>
    )
}

export default RegisterFirst

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
    },
    input: {
        marginTop: 47,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        padding: 10,
    },
    inputNombre: {
        width: 264,
        height: 51,
    },
    inputDesc: {
        width: 264,
        height: 185,
        textAlignVertical: 'top',
    },
    button: {
        width: 264,
        height: 47,
        marginTop: 40,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1
    },
    buttonText: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    error: {
        color: '#eb4034',
        width: 264,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    inputRed: {
        borderColor: '#eb4034',
        borderWidth: 2,
    },
    inputWarning: {
        borderColor: '#FFCC00',
        borderWidth: 1,
    },
    warning: {
        color: '#FFCC00',
        width: 264,
        fontWeight: 'bold',
        textAlign: 'right',
    }
})