import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import BottonRoutes from "./bottom.routes";
import Cadastro from "../pages/cadastro";
import PreferencesScreen from "../pages/PreferencesScreen";
import { temas } from "../global/temas";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Routes() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Estado para controle de autenticação
    const Stack = createStackNavigator();

    useEffect(() => {
        // Verifica se existe um token no AsyncStorage
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                console.log("Token encontrado:", token);
                setIsAuthenticated(true); // Token encontrado, usuário autenticado
            } else {
                setIsAuthenticated(false); // Nenhum token, precisa fazer login
            }
        };

        checkToken(); // Chama a função para verificar o token
    }, []);

    if (isAuthenticated === null) {
        return null; // Ou um carregando, até que a verificação do token seja concluída
    }

    return (
        <Stack.Navigator
            initialRouteName={isAuthenticated ? "BottonRoutes" : "Login"} // Roteamento condicional baseado no estado
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: temas.cores.darkgray, // darkgray
                },
            }}
        >
            <Stack.Screen
                name="BottonRoutes"
                component={BottonRoutes} />
            <Stack.Screen
                name="Login"
                component={Login} />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro} />
            <Stack.Screen
                name="PreferencesScreen"
                component={PreferencesScreen} />

            
        </Stack.Navigator>
    );
}
