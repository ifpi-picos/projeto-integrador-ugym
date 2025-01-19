import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { temas } from '../../global/temas';

interface UserInfoProps {
  label: string;
  value: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ label, value }) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: temas.cores.gray,
  },
  infoValue: {
    fontSize: 16,
    color: temas.cores.gray,
  },
});

export default UserInfo;
