import React, { forwardRef, LegacyRef } from "react";
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    StyleProp,
    TextStyle,
    TextInputProps,
} from "react-native";
import { MaterialIcons, FontAwesome, Octicons, Feather } from "@expo/vector-icons";
import { temas } from "../../global/temas";
import { style } from "./styles";



type IconComponent =
    | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
    | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
    | React.ComponentType<React.ComponentProps<typeof Octicons>>
    | React.ComponentType<React.ComponentProps<typeof Feather>>;


type Props = TextInputProps & {
    IconLeft?: IconComponent;
    IconRigth?: IconComponent;
    iconLeftName?: string;
    iconRightName?: string;
    title?: string;
    onIconLeftPress?: () => void;
    onIconRigthPress?: () => void;
    height?: number;
    labelStyle?: StyleProp<TextStyle>;
};

export const Input = forwardRef((props: Props, ref: LegacyRef<TextInput> | null) => {
    const {
        IconLeft,
        IconRigth,
        iconLeftName,
        iconRightName,
        title,
        onIconLeftPress,
        onIconRigthPress,
        height,
        labelStyle,
        value, // Adicionado para vincular corretamente o valor
        onChangeText, // Adicionado para capturar alterações no texto
        ...rest
    } = props;

    const calculateSizeWidth = () => {
        if (IconLeft && IconRigth) {
            return "80%";
        } else if (IconLeft || IconRigth) {
            return "90%";
        } else {
            return "100%";
        }
    };

    const calculateSizePaddingLeft = () => {
        if (IconLeft && IconRigth) {
            return 0;
        } else if (IconLeft || IconRigth) {
            return 10;
        } else {
            return 20;
        }
    };

    return (
        <>
            {title && <Text style={[style.titleInput, labelStyle]}>{title}</Text>}
            <View
                style={[
                    style.boxInput,
                    {
                        paddingLeft: calculateSizePaddingLeft(),
                        height: height ? height : 50,
                        padding: 5,
                    },
                ]}
            >
                {IconLeft && iconLeftName && (
                    <TouchableOpacity onPress={onIconLeftPress} style={style.Button}>
                        <IconLeft
                            name={iconLeftName as any}
                            size={20}
                            color={temas.cores.gray}
                            style={style.Icon}
                        />
                    </TouchableOpacity>
                )}
                <TextInput
                    style={[style.input, { width: calculateSizeWidth(), height: "100%" }]}
                    ref={ref}
                    value={value} // Certifique-se de que o valor é passado
                    onChangeText={onChangeText} // Certifique-se de que as alterações são capturadas
                    {...rest}
                />
                {IconRigth && iconRightName && (
                    <TouchableOpacity onPress={onIconRigthPress} style={style.Button}>
                        <IconRigth
                            name={iconRightName as any}
                            size={20}
                            color={temas.cores.gray}
                            style={style.Icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
});
