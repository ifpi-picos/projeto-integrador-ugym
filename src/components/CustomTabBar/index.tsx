import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { AntDesign, Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { temas } from "../../global/temas";
import { authContextList } from "../../context/authContext_list";

interface Props {
  state: any;
  navigation: any;
}

enum TabIndex {
  Home = 0,
  List = 1,
  User = 2,
}

const CustomTabBar: React.FC<Props> = ({ state, navigation }) => {

  const { onOpen } = useContext<any>(authContextList);

  const goTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={style.tabArea}>

      {/* Tab de Exercícios */}
      <TouchableOpacity style={style.tabItem} onPress={() => goTo("DailyExercicices")}>
        <AntDesign
          name="bars"
          style={{ opacity: state.index === TabIndex.List ? 1 : 0.5, color: temas.cores.primaria, fontSize: 32 }}
        />
      </TouchableOpacity>

      {/* Botão central para abrir o modal */}
      {/* <TouchableOpacity style={style.tabItemButton} onPress={() => onOpen && onOpen()}>
        <View style={{ width: "100%", left: 10, top: 4 }}>
          <Entypo name="plus" style={{ fontSize: 35, color: "#fff" }} />
        </View>
        <View style={{ width: "100%", flexDirection: "row-reverse", right: 10, bottom: 10 }}>
          <MaterialIcons name="edit" style={{ fontSize: 30, color: "#fff" }} />
        </View>
      </TouchableOpacity> */}

      {/* Tab de Home */}
      <TouchableOpacity style={style.tabItem} onPress={() => goTo("Home")}>
        <AntDesign
          name="home"
          style={{ opacity: state.index === TabIndex.Home ? 1 : 0.5, color: temas.cores.primaria, fontSize: 32 }}
        />
      </TouchableOpacity>

      {/* Tab de Perfil */}
      <TouchableOpacity style={style.tabItem} onPress={() => goTo("Profile")}>
        <FontAwesome
          name="user"
          style={{ opacity: state.index === TabIndex.User ? 1 : 0.2, color: temas.cores.primaria, fontSize: 32 }}
        />
      </TouchableOpacity>

    </View>
  );
};

export default CustomTabBar;
