import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { temas } from '../../global/temas';
import { renderVariable } from '@/global/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from "@react-navigation/native";

type HeaderProps = {
  nome: string;
  imagem: string;
};
const Header = ({ imagem }: HeaderProps) => {
    const navigation = useNavigation<NavigationProp<any>>();
  
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setUserName("Usuário");
          return;
        }

        // Buscar nome do usuário
        const response = await fetch(`${renderVariable}/me`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || "Usuário");

        } else {
          setUserName("Usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar as informações.");
        setUserName("Usuário");
      }
    };

    fetchUserData();
  }, []);


  const handleSettingsPress = () => {
    // Navegar para a tela de configurações
    console.log("Navegar para a tela de configurações");
    navigation.navigate("Settings");
    
  }
  return (
    <LinearGradient
      colors={[temas.cores.primaria, temas.cores.secundaria]}
      style={styles.headerContainer}
    >
      <View style={styles.profileContainer}>
        <Image source={{ uri: imagem }} style={styles.profileImage} />
        <Text style={styles.profileName}>Olá, {userName}!</Text>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
          <MaterialIcons name="settings" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para sombra no Android
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#fff',
    marginRight: 15,
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',  // Para posicionar o botão de configurações no canto superior direito
    top: 20,               // Distância do topo
    right: 20,             // Distância da borda direita
    padding: 10,           // Tamanho do padding ao redor do ícone
    backgroundColor: temas.cores.secundaria, // Cor de fundo do botão (secundária)
    borderRadius: 50,      // Bordas arredondadas
    elevation: 5,          // Sombra para dispositivos Android
    shadowColor: '#000',   // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 2 },  // Deslocamento da sombra
    shadowOpacity: 0.3,    // Opacidade da sombra
    shadowRadius: 4,      // Raio da sombra
  }
  
});

export default Header;
