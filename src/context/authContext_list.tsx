import React, { createContext, useContext, useRef, useEffect } from "react";
import { Dimensions, Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export const authContextList = createContext<any>({});

export const AuthProvider_list = (props: any): any => {
  const modalizeRef = useRef<Modalize>(null);

  // Função para abrir o modal
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  // Lista de exercícios
  const _exerciseList = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Exercícios do Dia</Text>

          {/* Botão de Fechar */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
              <AntDesign name="closecircle" style={styles.closeIcon} />

            </TouchableOpacity>

            {/* Botão de Adicionar Exercício */}
            <TouchableOpacity>
              <AntDesign name="pluscircle" style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Exercício 1: Flexões</Text>
            <Text style={styles.cardDescription}>
              Complete 3 séries de 15 repetições. Lembre-se de manter a postura correta.
            </Text>
            <Text style={styles.cardTime}>Tempo Sugerido: 10 min</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Exercício 2: Abdominais</Text>
            <Text style={styles.cardDescription}>
              Faça 4 séries de 20 repetições, focando na respiração.
            </Text>
            <Text style={styles.cardTime}>Tempo Sugerido: 15 min</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Exercício 3: Corrida</Text>
            <Text style={styles.cardDescription}>
              Corra 2km na intensidade moderada, mantendo o ritmo constante.
            </Text>
            <Text style={styles.cardTime}>Tempo Sugerido: 20 min</Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <authContextList.Provider value={{ onOpen }}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        disableScrollIfPossible={false}
        onOverlayPress={() => { }}
        closeOnOverlayTap={false}
        panGestureEnabled={false}
      >
        {_exerciseList()}
      </Modalize>
    </authContextList.Provider>
  );
};

export const useAuth = () => useContext(authContextList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addIcon: {
    fontSize: 28,
    color: "#4CAF50",
  },
  closeIcon: {
    fontSize: 28,
    color: "#F44336", // Vermelho para indicar fechar
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  cardTime: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
});
