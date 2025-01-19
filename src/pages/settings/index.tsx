import React from "react";
import { View, ScrollView, Text, Alert, StyleSheet, Platform } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ListItem from "../../components/listItem";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importação do AsyncStorage
import { temas } from "../../global/temas";

export default function Settings() {
  const navigation = useNavigation<NavigationProp<any>>(); // Hook para navegação

  // Função para realizar o logout
  const handleLogout = async () => {
    if (Platform.OS === "web") {
      const confirm = window.confirm("Você tem certeza de que deseja sair?");
      if (confirm) {
        try {
          console.log("Removendo token...");
          await AsyncStorage.removeItem("userToken");
          console.log("Token removido com sucesso!");
  
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } catch (error) {
          console.error("Erro ao realizar logout:", error);
          window.alert("Erro: Não foi possível realizar o logout.");
        }
      }
    } else {
      Alert.alert(
        "Confirmação",
        "Você tem certeza de que deseja sair?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sair",
            style: "destructive",
            onPress: async () => {
              try {
                console.log("Removendo token...");
                await AsyncStorage.removeItem("userToken");
                console.log("Token removido com sucesso!");
  
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              } catch (error) {
                console.error("Erro ao realizar logout:", error);
                Alert.alert("Erro", "Não foi possível realizar o logout.");
              }
            },
          },
        ]
      );
    }
  };

  return (
    <View style={style.container}>
      <View style={style.content}>
        {/* Seção de Lista de Itens */}
        <View style={style.boxMid}>
          <Text style={style.sectionTitle}>Configurações</Text>

          <ListItem
            title="Notificações"
            onPress={() => console.log("Notificações")}
          />
          <ListItem
            title="Configurações da conta"
            onPress={() => console.log("Configurações da conta")}
          />
          <ListItem
            title="Segurança"
            onPress={() => console.log("Segurança")}
          />
          <ListItem
            title="Privacidade"
            onPress={() => console.log("Privacidade")}
          />
          <ListItem
            title="Linguagem"
            onPress={() => console.log("Linguagem")}
          />
          <ListItem
            title="Sobre o Meu personal Closet"
            onPress={() => console.log("Sobre o Meu personal Closet")}
          />
          <ListItem
            title="Termos de serviço"
            onPress={() => console.log("Termos de serviço")}
          />

          {/* Botão de Logout */}
          <ListItem
            title="Sair"
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: temas.cores.bgScreen, // Cor de fundo para a tela
    justifyContent: 'center',
    
  },
  content: {
    padding: 20,
    flexGrow: 1,
    marginTop: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: temas.cores.textoPrimario,
    marginBottom: 10,
    textAlign: 'center',
  },
  boxMid: {
    backgroundColor: temas.cores.quasePreto, // Cor de fundo para a seção
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    elevation: 5, // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
