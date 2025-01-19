import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { temas } from '../../global/temas';

interface ExerciseCardProps {
    tipo: string;
    titulo: string;
    detalhes: string;
    imagem: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ tipo, titulo, detalhes, imagem }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: imagem }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.tipo}>{tipo}<Text style={styles.title}>-{titulo}</Text></Text>
                <Text style={styles.details}>{detalhes}</Text>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: temas.cores.bgCard,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: temas.cores.darkgray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3, // Para sombra no Android
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    title: {
        color: temas.cores.textoPrimario,
        fontSize: 16,
        fontWeight: 'bold',
    },
    tipo: {
        color: temas.cores.primaria,
        fontSize: 16,
        fontWeight: 'bold',
    },

    details: {
        color: temas.cores.textoSecundario,
        fontSize: 14,
    },
});

export default ExerciseCard;
