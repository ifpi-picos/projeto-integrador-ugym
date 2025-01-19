import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from '../../components/Input';
import { Button } from '../../components/button'; // Botão reutilizável
import { Feather } from '@expo/vector-icons';
import { temas } from '../../global/temas';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderVariable } from '@/global/variables';

const PreferencesScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Masculino');
  const [goal, setGoal] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [experience, setExperience] = useState('Iniciante');
  const [loading, setLoading] = useState(false);

  const savePreferences = async () => {
    try {
      setLoading(true);

      setLoading(true);

      // Verifica e converte a data para DD/MM/YYYY
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
        Alert.alert("Erro", "Por favor, insira a data no formato DD/MM/AAAA");
        setLoading(false);
        return;
      }

      const preferences = {
        birthDate,
        gender,
        goal,
        healthCondition,
        experience,
      };

      console.log('Preferences to save:', preferences);

      // Puxando o token do usuário
      const token = await AsyncStorage.getItem('userToken');
      console.log('User token:', token);

      // Enviando as preferências para o backend
      const response = await fetch(`${renderVariable}/preferences`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        Alert.alert("Sucesso", "Preferências salvas com sucesso!");
        navigation.reset({
          index: 0,
          routes: [{ name: "BottonRoutes" }],
        });

      } else {
        throw new Error("Não foi possível salvar as preferências.");
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      Alert.alert("Erro", "Não foi possível salvar as preferências. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxTop}>
        <Text style={styles.text}>Configurar Preferências</Text>
      </View>

      <View style={styles.boxMid}>
        {/* Campo de entrada para data de nascimento */}
        <Input
          value={birthDate}
          onChangeText={setBirthDate}
          title="DATA DE NASCIMENTO"
          placeholder="Ex: DD/MM/AAAA"
          IconRigth={Feather}
          iconRightName="calendar"
        />
        {/* Campo de entrada para objetivo */}
        <Input
          value={goal}
          onChangeText={setGoal}
          title="OBJETIVO"
          placeholder="Ex: Ganhar massa muscular"
        />

        {/* Campo de entrada para condição de saúde */}
        <Input
          value={healthCondition}
          onChangeText={setHealthCondition}
          title="CONDIÇÃO DE SAÚDE"
          placeholder="Ex: Nenhuma"
        />
        {/* Picker para Gênero */}
        <View>
          <Text style={styles.inputLabel}>GÊNERO</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue: React.SetStateAction<string>) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Feminino" value="Feminino" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Não Binário" value="Não Binário" />
              <Picker.Item label="Não Quero Informar" value="Não Quero Informar" />
            </Picker>
          </View>
        </View>
        <Text style={styles.inputLabel}>Experiencia</Text>
        <View style={styles.pickerContainer}>
          {/* Campo de entrada para experiência */}
          <Picker
            selectedValue={experience}
            onValueChange={(itemValue: React.SetStateAction<string>) => setExperience(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Iniciante" value="Iniciante" />
            <Picker.Item label="Intermediário" value="Intermediário" />
            <Picker.Item label="Avançado" value="Avançado" />
          </Picker>
        </View>
      </View>

      <View style={styles.boxBotton}>
        <Button text="SALVAR PREFERÊNCIAS" loading={loading} onPress={savePreferences} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: temas.cores.bgScreen,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  boxTop: {
    marginBottom: 20,
    alignItems: 'center',
  },
  boxMid: {
    width: '100%',
  },
  boxBotton: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: temas.cores.primaria,
    fontSize: 22,
  },
  inputLabel: {
    marginLeft: 5,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: temas.cores.primaria,
    marginBottom: 5,
  },
  pickerContainer: {
    width: '100%',
    height: 50, // Aumenta a altura para melhor visibilidade
    borderBottomWidth: 1,
    backgroundColor: temas.cores.darkgray,
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 5, // Adiciona espaçamento interno
  },
  picker: {
    height: '100%',
    fontSize: 17,
    color: temas.cores.gray,
  },
});

export default PreferencesScreen;
