import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';

import Routes from './src/routes/index.routes';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
      // <Login />

  );
}

const styles = StyleSheet.create({
  container: {
   
  },
});
