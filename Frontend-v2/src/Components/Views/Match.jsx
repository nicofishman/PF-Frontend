import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../NavBar";
import CardMatch from "../pochi/CardMatch";
import SwipeCards from "react-native-swipe-cards-deck";
import { getUsers } from "../../Handlers/AuthHandler";

const Match = ({ navigation, route }) => {
    const [cardToMatch, setCardToMatch] = useState();

    useEffect(() => {
        (async() => {
            const users = await getUsers()
            console.log(users)
            setCardToMatch(users);
        })()
    }, []);

    function handleYup(card) {
        console.log(`Yup for ${card.username}`);
        return true; // return false if you wish to cancel the action
    }
    function handleNope(card) {
        console.log(`Nope for ${card.username}`);
        return true;
    }
    function StatusCard({ text }) {
        return (
        <View>
            <Text style={styles.cardsText}>{text}</Text>
        </View>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <SwipeCards 
                    cards={cardToMatch}
                    renderCard={(cardData) => <CardMatch data={cardData} />}
                    keyExtractor={(cardData) => String(cardData.spotifyId)}
                    renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                    actions={{
                        nope: { onAction: handleNope },
                        yup: { onAction: handleYup },
                    }}

                stack={true}
                stackDepth={2}
                stackOffsetX={0}
                />
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    );
};

export default Match;
0
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafa",
        alignItems: "center",
        justifyContent: "center",
    },
});
