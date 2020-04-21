/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as countriesByCapitals from './assets/countries-by-capital';
import * as countriesByContinents from './assets/countries-by-continent';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {Home} from './components/Home';

const Stack = createStackNavigator();

const onPress = () => {
  console.log(countriesByCapitals);
};

const homeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Text style={styles.header}>Quiz me on:</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContinentSelect')}>
          <Text style={styles.buttonText}>CAPITALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>FLAGS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const continentSelect = () => {
  return <Text>Continent Select Screen</Text>;
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="ContinentSelect" component={continentSelect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#555',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
  },
});

export default App;
