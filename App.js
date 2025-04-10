import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/constants/theme';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <View style={{ flex: 1 }}>
            <AppNavigator />
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
