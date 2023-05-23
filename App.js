import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, NavigateContainer } from 'react-native';
import LoginComp from './components/Login';
import RegistrationComp from './components/Registration';
import FirstViewComp from './components/FirstView';
import HomeNavigator from './components/HomeNavigator';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  return (
    <View style={styles.container}>
      <HomeNavigator></HomeNavigator>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
})
