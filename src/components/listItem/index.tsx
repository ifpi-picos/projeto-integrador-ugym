import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { temas } from '@/global/temas';
interface ListItemProps {
  title: string;
  onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={style.item} onPress={onPress}>
      <Text style={style.bullet}>•</Text>
      <Text style={style.title}>{title}</Text>
      <Text style={style.arrow}>&gt;</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: temas.cores.lightgray, // Cor da linha inferior
  },
  bullet: {
    fontSize: 16,
    color: temas.cores.primaria, // Cor do bullet
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: temas.cores.textoSecundario, // Texto principal
  },
  arrow: {
    fontSize: 20,
    color: temas.cores.primaria, // Cor do ícone de seta
  },
});

export default ListItem;
