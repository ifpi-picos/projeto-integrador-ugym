
import { Dimensions, StyleSheet } from "react-native";
import { temas } from "../../global/temas"


export const style = StyleSheet.create({

    tabArea: {
        flexDirection: "row",
        height: 60,
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.29 ,
        shadowRadius: 4.65,
        elevation: 7,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabItemButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        top: -30,
        backgroundColor: temas.cores.primaria,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});