import React from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { temas } from "../../global/temas";
import { Input } from "../../components/Input";
import { Button } from "../../components/button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { renderVariable } from "../../global/variables";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();

    // Estado para armazenar email, senha, visibilidade da senha e status de carregamento
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    // Função simulada para login
    async function getLogin() {
        console.log("Início da função getLogin");
    
        if (!email || !password) {
            console.log("Erro: Campos obrigatórios não preenchidos");
            alert("Preencha todos os campos");
            return;
        }
    
        try {
            console.log("Preparando para enviar os dados ao servidor");
            setLoading(true);
    
            console.log("Dados sendo enviados:", { email, password });
    
            const response = await fetch(`${renderVariable}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            console.log("Resposta do servidor recebida:", response);
    
            const result = await response.json();
            console.log("Dados processados da resposta:", result);
    
            if (response.status === 200) {
                console.log("Login bem-sucedido");
                alert("Login bem-sucedido!");
                
                // Se usar armazenamento local descomentado, logue o que será salvo
                console.log("Token sendo armazenado:", result.token);
                await AsyncStorage.setItem('userToken', result.token);
    
                navigation.reset({
                    index: 0,
                    routes: [{ name: "BottonRoutes" }],
                });
            } else {
                console.log("Erro no login, status diferente de 200:", result.error);
                alert(`Erro no login: ${result.error}`);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao se conectar com o servidor.");
        } finally {
            console.log("Finalizando execução da função getLogin");
            setLoading(false);
        }
    }
    
    // Redireciona para a tela de cadastro
    async function redirectRegister() {
        console.log("Início da função redirectRegister");
    
        try {
            console.log("Navegando para a tela de Cadastro");
            navigation.navigate("Cadastro");
            console.log("Navegação para Cadastro concluída");
        } catch (error) {
            console.error("Erro ao redirecionar para a tela de Cadastro:", error);
        }
    
        console.log("Finalizando a execução da função redirectRegister");
    }
    

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
                <Text style={style.text}>Bem vindo de volta!</Text>
            </View>

            <View style={style.boxMid}>
                {/* Input para o e-mail */}
                <Input
                    value={email}
                    onChangeText={setEmail}
                    title="ENDEREÇO DE E-MAIL"
                    IconRigth={MaterialIcons}
                    iconRightName="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Input para a senha com alternância de visibilidade */}
                <Input
                    value={password}
                    onChangeText={setPassword}
                    title="SENHA"
                    IconRigth={Octicons}
                    iconRightName={showPassword ? "eye" : "eye-closed"}
                    secureTextEntry={showPassword}
                    onIconRigthPress={() => setShowPassword(!showPassword)}
                />
            </View>

            <View style={style.boxBotton}>
                {/* Botão para login */}
                <Button text="ENTRAR" loading={loading} onPress={getLogin} />
            </View>

            {/* Link para cadastro */}
            <Text style={style.textBotton}>
                Ainda não tem uma conta?{" "}
                <Text onPress={redirectRegister} style={{ color: temas.cores.primaria }}>
                    Crie uma agora mesmo!
                </Text>
            </Text>
        </View>
    );
}
