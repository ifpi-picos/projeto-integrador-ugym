import React from "react";
import { Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlightProps } from "react-native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { temas } from "../../global/temas";
import { style } from "./styles";

type Props = TouchableHighlightProps & { 
    text: string;
    loading?: boolean;
}

export function Button({...rest}: Props) {
    return(
        <TouchableOpacity 
        style={style.button}
        {...rest}
        activeOpacity={0.7}
        >
            {rest.loading ? <ActivityIndicator size="small" color={temas.cores.bgScreen} /> : <Text style={style.buttonText}>{rest.text}</Text>}
        </TouchableOpacity>

    )
}

