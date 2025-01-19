import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/header';
import ExerciseCard from '../../components/ExerciseCard';
import { temas } from '../../global/temas';
import Calendar from '@/components/calendar';
import moment from 'moment';

type Day = 'segunda' | 'terça' | 'quarta' | 'quinta' | 'sexta' | 'sábado' | 'domingo';

const dailyWorkouts: Record<Day, { id: string; titulo: string; detalhes: string; imagem: string; tipo: string }[]> = {
    segunda: [
        { id: '1', titulo: 'Puxada Frontal', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Costas' },
        { id: '2', titulo: 'Remada Curvada', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Costas' },
    ],
    terça: [
        { id: '3', titulo: 'Rosca Direta', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Bíceps' },
        { id: '4', titulo: 'Rosca Martelo', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Bíceps' },
    ],
    quarta: [
        { id: '5', titulo: 'Tríceps Pulley', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Tríceps' },
        { id: '6', titulo: 'Tríceps Coice', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Tríceps' },
    ],
    quinta: [
        { id: '7', titulo: 'Desenvolvimento com Halteres', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Ombros' },
        { id: '8', titulo: 'Elevação Lateral', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Ombros' },
    ],
    sexta: [
        { id: '9', titulo: 'Agachamento Livre', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Pernas' },
        { id: '10', titulo: 'Leg Press', detalhes: '3 séries x 12 repetições', imagem: 'https://via.placeholder.com/150', tipo: 'Pernas' },
    ],
    sábado: [
        { id: '11', titulo: 'Corrida', detalhes: '30 minutos', imagem: 'https://via.placeholder.com/150', tipo: 'Cardio' },
        { id: '12', titulo: 'Bicicleta', detalhes: '30 minutos', imagem: 'https://via.placeholder.com/150', tipo: 'Cardio' },
    ],
    domingo: [
        { id: '13', titulo: 'Descanso', detalhes: '', imagem: 'https://via.placeholder.com/150', tipo: 'Descanso' },
    ],
};

const getDayOfWeek = (date: string): Day => {
    const days: Day[] = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    return days[moment(date).day()] as Day;
};

const DailyExercicices = () => {
    const [selectedDay, setSelectedDay] = useState<Day>('segunda');

    const handleDateChange = (date: string) => {
        setSelectedDay(getDayOfWeek(date));
    };

    return (
        <View style={styles.container}>
            <Header nome="Rodrigo Gonçalves" imagem="https://via.placeholder.com/150" />
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Calendar onDayChange={handleDateChange} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.sectionTitle}>Exercícios de {selectedDay.toUpperCase()}</Text>
                        </View>
                    </>
                }
                data={dailyWorkouts[selectedDay]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExerciseCard tipo={item.tipo} titulo={item.titulo} detalhes={item.detalhes} imagem={item.imagem} />
                )}
                style={styles.exerciseList}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: temas.cores.bgScreen,
    },
    sectionTitle: {
        color: temas.cores.textoPrimario,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
    },
    exerciseList: {
        paddingHorizontal: 10,
    },
});

export default DailyExercicices;
