import { Dimensions, StyleSheet } from "react-native";
import { temas } from "../../global/temas";

export const style = StyleSheet.create({
    button: {
        width: 250,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: temas.cores.primaria,
        borderRadius: 10,
        textAlign: "center", // Center the text inside the button
        marginTop: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16.00,

        elevation: 24,

    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18 // Increased font
    }
})
