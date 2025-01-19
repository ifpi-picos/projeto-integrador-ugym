import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { temas } from '../../global/temas';
import UserInfo from '../../components/UserInfo';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import GenericChart from '@/components/chart';
import Header from '@/components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderVariable } from '@/global/variables';
const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [userName, setUserName] = useState('Usuário');
  const [userInfo, setUserInfo] = useState({
    email: '',
    dataNascimento: '',
    genero: '',
    objetivo: '',
    experiencia: '',
    condiçaodesaude: '',
  });

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

                // Agora buscar as preferências do usuário
                const preferencesResponse = await fetch(`${renderVariable}/preferences`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (preferencesResponse.ok) {
                    const preferencesData = await preferencesResponse.json();
                    setUserInfo({
                        email: data.email,
                        dataNascimento: preferencesData.birthDate, 
                        genero: preferencesData.gender,
                        objetivo: preferencesData.goal,
                        experiencia: preferencesData.experience,
                        condiçaodesaude: preferencesData.healthCondition,
                    });
                } else {
                    console.error("Erro ao buscar preferências:", preferencesResponse.status);
                }
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


  // Dados para gráficos
  const weightData = [80, 78, 76, 74, 73, 72]; // Pesos fictícios (em Kg)
  const heightData = [1.75, 1.76, 1.77, 1.78, 1.79, 1.80]; // Alturas fictícias (em metros)

  // Calcula IMC dinamicamente
  const bmiData = weightData.map((weight, index) => {
    const height = heightData[index];
    return +(weight / (height * height)).toFixed(2); // Calcula IMC com uma 2 decimal
  });

  const chartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#0d0d0d',
    backgroundGradientTo: '#1a1a1a',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(229, 57, 53, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const editButton = () => {
    navigation.navigate('PreferencesScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header com a foto do perfil */}
      <Header nome={userName} imagem="https://via.placeholder.com/150" />

      {/* Detalhes do usuário */}
      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        <UserInfo label="Email" value={userInfo.email} />
        <UserInfo label="Data de Nascimento" value={userInfo.dataNascimento} />
        <UserInfo label="Gênero" value={userInfo.genero} />

        <Text style={styles.sectionTitle}>Objetivos e Experiência</Text>
        <UserInfo label="Objetivo" value={userInfo.objetivo} />
        <UserInfo label="Condição de Saúde" value={userInfo.condiçaodesaude} />
        <UserInfo label="Experiência" value={userInfo.experiencia} />

        {/* Gráficos */}
        <GenericChart
          title="Evolução de Peso"
          data={{
            labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
            datasets: [
              {
                data: weightData,
                color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
              },
            ],
            legend: ['Peso (Kg)'],
          }}
          chartType="line"
          width={350}
          height={220}
          chartConfig={chartConfig}
        />

        <GenericChart
          title="Evolução de Altura"
          data={{
            labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
            datasets: [
              {
                data: heightData.map((height) => height * 100), // Converte para cm
                color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
              },
            ],
            legend: ['Altura (cm)'],
          }}
          chartType="line"
          width={350}
          height={220}
          chartConfig={chartConfig}
        />

        <GenericChart
          title="Evolução de IMC"
          data={{
            labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
            datasets: [
              {
                data: bmiData,
                color: (opacity = 1) => `rgba(193, 24, 91, ${opacity})`,
              },
            ],
            legend: ['IMC'],
          }}
          chartType="line"
          width={350}
          height={220}
          chartConfig={chartConfig}
        />

        {/* Botão de edição */}
        <TouchableOpacity style={styles.editButton} onPress={editButton}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: temas.cores.bgScreen,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: temas.cores.primaria,
    marginBottom: 10,
  },
  editButton: {
    marginTop: 30,
    backgroundColor: temas.cores.primaria,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
