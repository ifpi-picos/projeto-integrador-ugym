import { Dimensions, StyleSheet } from "react-native";
import { temas } from "../../global/temas";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: temas.cores.bgScreen,
        alignItems: "center",
        justifyContent: "center",

    },
    boxTop: {
        height: Dimensions.get("window").height / 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    boxMid: {
        height: Dimensions.get("window").height / 4,
        width: "100%",
        //backgroundColor: "yellow",
        paddingHorizontal: 37
    },
    boxBotton: {
        height: Dimensions.get("window").height / 3,
        width: "100%",
        //backgroundColor: "blue",
        alignItems: "center",
        //justifyContent: "center"

    },
    logo: {
        width: 120,
        height: 120
    },
    text: {
        fontWeight: "bold",
        marginTop: 25,
        color: temas.cores.gray,
        fontSize: 22 // Increased font size
    },
    findPassword: {
        color: temas.cores.gray,
        marginTop: 10,
        textAlign: "right",
        marginRight: 5
    },
    textBotton: {
        color: temas.cores.gray,
        marginTop: 10,
        textAlign: "center"
    }

})
