import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { temas } from '../../global/temas';
import moment from 'moment';

interface CalendarProps {
    onDayChange: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDayChange }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const onDateChange = (date: Date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectedDate(formattedDate);
        onDayChange(formattedDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CALENDARIO DE TREINO</Text>
            <CalendarPicker
                onDateChange={onDateChange}
                textStyle={styles.textStyle}
                selectedDayStyle={styles.selectedDayStyle}
                selectedDayTextColor={temas.cores.textoSecundario}
                todayBackgroundColor={temas.cores.secundaria}
                todayTextStyle={styles.todayTextStyle}
                dayShape="circle"
                weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
                months={[
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro',
                ]}
                nextComponent={
                    <Text style={styles.navButton}>{'>'}</Text>
                }
                previousComponent={
                    <Text style={styles.navButton}>{'<'}</Text>
                }
            />
            {selectedDate && (
                <Text style={styles.selectedDate}>
                    Data Selecionada: {moment(selectedDate).format('DD/MM/YYYY')}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: temas.cores.bgScreen,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: temas.cores.textoPrimario,
        marginBottom: 20,
    },
    textStyle: {
        color: temas.cores.textoPrimario,
        fontSize: 16,
    },
    selectedDayStyle: {
        backgroundColor: temas.cores.primaria,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    todayTextStyle: {
        fontWeight: 'bold',
        color: temas.cores.textoPrimario,
    },
    navButton: {
        fontSize: 24,
        fontWeight: 'bold',
        color: temas.cores.primaria,
    },
    selectedDate: {
        marginTop: 20,
        fontSize: 18,
        color: temas.cores.textoSecundario,
        fontWeight: 'bold',
    },
});

export default Calendar;
