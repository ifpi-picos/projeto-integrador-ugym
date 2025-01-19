import React from "react";
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { temas } from "../../global/temas";
import { Input } from "../../components/Input";
import { Button } from "../../components/button";
import { renderVariable } from "../../global/variables";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cadastro() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(true);
    // const [confirmpassword, setconfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    async function registerUser() {
        console.log("Início da função registerUser");
    
        if (!email || !password) {
            console.log("Erro: Campos obrigatórios não preenchidos");
            alert("Preencha todos os campos");
            return;
        }
    
        
    
        try {
            console.log("Preparando para enviar dados ao servidor");
            setLoading(true);
    
            console.log("Dados sendo enviados:", {
                name: name,
                email: email,
                password: password,
            });
    
            const response = await fetch(`${renderVariable}/cadastro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });
    
            console.log("Resposta do servidor recebida", response);
    
            const result = await response.json();
            console.log("Dados processados da resposta:", result);
    
            if (response.status === 201) {
                console.log("Cadastro realizado com sucesso");
                alert("Cadastro realizado com sucesso");

                // Se usar armazenamento local descomentado, logue o que será salvo
                console.log("Token sendo armazenado:", result.token);
                await AsyncStorage.setItem('userToken', result.token)

                // navigation.reset({
                //     index: 0,
                //     routes: [{ name: "PreferencesScreen" }],
                // });
                navigation.navigate("PreferencesScreen");
            } else {
                console.log("Erro no cadastro, status não é 201:", result.error);
                alert(`Erro no cadastro: ${result.error}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert(`Erro ao se conectar com o servidor. URL: ${renderVariable}/cadastro   ERRO: ${error}`);
        } finally {
            console.log("Finalizando execução da função registerUser");
            setLoading(false);
        }
    }
    
    async function redirectCadastro() {
        console.log("Redirecionando para a tela de login");
        navigation.navigate("Login");
    }
    




    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
                <Text style={style.text}>Crie sua conta</Text>
            </View>

            <View style={style.boxMid}>
                <Input
                    value={name}
                    onChangeText={(text) => setName(text)}
                    title="NOME COMPLETO"
                    IconRigth={MaterialIcons}
                    iconRightName="person"
                />
                <Input
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    title="ENDEREÇO DE E-MAIL"
                    IconRigth={MaterialIcons}
                    iconRightName="email"
                />


                <Input
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    title="SENHA"
                    IconRigth={Octicons}
                    iconRightName={showPassword ? "eye" : "eye-closed"}
                    secureTextEntry={showPassword}
                    onIconRigthPress={() => setShowPassword(!showPassword)}
                />


                {/* <Input
                    value={confirmpassword}
                    onChangeText={(text) => setconfirmPassword(text)}
                    title="CONFIRME SUA SENHA"
                    IconRigth={Octicons}
                    iconRightName={showPassword ? "eye" : "eye-closed"}
                    secureTextEntry={showPassword}
                    onIconRigthPress={() => setShowPassword(!showPassword)}
                /> */}
            </View>

            <View style={style.boxBotton}>
                <Button
                    text="CADASTRAR- SE"
                    loading={loading}
                    onPress={registerUser}
                />

            </View>


            <Text style={style.textBotton}>Já tem uma conta? <Text onPress={redirectCadastro} style={{ color: temas.cores.primaria }}>Entre agora!</Text> </Text>
        </View>

    )
}


