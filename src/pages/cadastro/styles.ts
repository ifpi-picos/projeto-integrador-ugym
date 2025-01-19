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
        height: Dimensions.get("window").height / 6,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        
    },
    boxMid: {
        height: Dimensions.get("window").height / 1.8,
        width: "100%",
        //backgroundColor: "yellow",
        paddingHorizontal: 37
    },
    boxBotton: {
        top: 35,
        height: Dimensions.get("window").height / 6.6,
        width: "100%",
        //backgroundColor: "blue",
        alignItems: "center",
        //justifyContent: "center"

    },
    logo: {
        width: 120,
        height: 70
    },
    text: {
        fontWeight: "bold",
        marginTop: 25,
        color: temas.cores.gray,
        fontSize: 18 // Increased font size
    },
    findPassword: {
        color: temas.cores.gray,
        marginTop: 10,
        textAlign: "right",
        marginRight: 5
    },
    textBotton: {
        color: temas.cores.gray,
        top: 20,
        textAlign: "center"
    }

})
