import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from '../../components/Input';
import { Button } from '../../components/button'; // Botão reutilizável
import { temas } from '../../global/temas';
import { NavigationProp, useNavigation } from '@react-navigation/core';

const colorOptions = [
    { label: 'Cor 1 - #f8e4d9 (Bege Claro)', value: '#f8e4d9' },
    { label: 'Cor 2 - #fcf1ea (Rosa Claro)', value: '#fcf1ea' },
    { label: 'Cor 3 - #fac5a4 (Laranja Claro)', value: '#fac5a4' },
    { label: 'Cor 4 - #c4e5e2 (Verde Água Claro)', value: '#c4e5e2' },
    { label: 'Cor 5 - #d4afc9 (Rosa Médio)', value: '#d4afc9' },
    { label: 'Cor 6 - #f9f9f9 (Branco)', value: '#f9f9f9' },
    { label: 'Cor 7 - #e0f7fa (Azul Claro)', value: '#e0f7fa' },
    { label: 'Cor 8 - #ffeb3b (Amarelo)', value: '#ffeb3b' },
    { label: 'Cor 9 - #ff5722 (Laranja)', value: '#ff5722' },
    { label: 'Cor 10 - #4caf50 (Verde)', value: '#4caf50' },
    { label: 'Cor 11 - #9c27b0 (Roxo)', value: '#9c27b0' },
    { label: 'Cor 12 - #3f51b5 (Azul)', value: '#3f51b5' },
];

const AddActivityScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const [activityName, setActivityName] = useState('');
    const [status, setStatus] = useState('');
    const [lightColor, setLightColor] = useState(colorOptions[0].value);
    const [color, setColor] = useState(colorOptions[1].value);
    const [darkColor, setDarkColor] = useState(colorOptions[2].value);
    const [loading, setLoading] = useState(false);

    const saveActivity = () => {
        // Lógica para salvar a atividade
        console.log({
            activityName,
            status,
            lightColor,
            color,
            darkColor,
        });
        navigation.navigate('Home'); // Navega para a tela inicial
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.boxTop}>
                <Text style={styles.title}>Adicionar Nova Atividade</Text>
            </View>

            <View style={styles.boxMid}>
                {/* Campo para nome da atividade */}
                <Input
                    value={activityName}
                    onChangeText={setActivityName}
                    title="NOME DA ATIVIDADE"
                    placeholder="Ex: Ciclismo"
                />

                {/* Campo para status */}
                <Input
                    value={status}
                    onChangeText={setStatus}
                    title="STATUS"
                    placeholder="Ex: 85"
                    keyboardType="numeric"
                />

                {/* Picker para Light Color */}
                <Text style={styles.inputLabel}>COR CLARA</Text>
                <View style={[styles.pickerContainer, { backgroundColor: lightColor }]}>
                    <Picker
                        selectedValue={lightColor}
                        onValueChange={(itemValue) => setLightColor(itemValue)}
                        style={styles.picker}
                    >
                        {colorOptions.map((color) => (
                            <Picker.Item label={color.label} value={color.value} key={color.value} />
                        ))}
                    </Picker>
                </View>

                {/* Picker para Color */}
                <Text style={styles.inputLabel}>COR MÉDIA</Text>
                <View style={[styles.pickerContainer, { backgroundColor: color }]}>
                    <Picker
                        selectedValue={color}
                        onValueChange={(itemValue) => setColor(itemValue)}
                        style={styles.picker}
                    >
                        {colorOptions.map((color) => (
                            <Picker.Item label={color.label} value={color.value} key={color.value} />
                        ))}
                    </Picker>
                </View>

                {/* Picker para Dark Color */}
                <Text style={styles.inputLabel}>COR ESCURA</Text>
                <View style={[styles.pickerContainer, { backgroundColor: darkColor }]}>
                    <Picker
                        selectedValue={darkColor}
                        onValueChange={(itemValue) => setDarkColor(itemValue)}
                        style={styles.picker}
                    >
                        {colorOptions.map((color) => (
                            <Picker.Item label={color.label} value={color.value} key={color.value} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.boxBotton}>
                <Button
                    text="SALVAR ATIVIDADE"
                    loading={loading}
                    onPress={saveActivity}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: temas.cores.bgScreen,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: temas.cores.primaria,
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
        borderColor: temas.cores.primaria,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default AddActivityScreen;
