/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import QuizScreen from './components/QuizScreen';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {Home} from './components/Home';

const Stack = createStackNavigator();

const continents = [
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Asia',
];

const checkAnswer = () => {
  console.log('check answer!');
};

const homeScreen = ({navigation}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Text style={styles.header}>Quiz me on:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContinentSelect')}>
        <Text style={styles.buttonText}>CAPITALS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>FLAGS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const continentSelectScreen = ({navigation}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Text style={styles.header}>Choose continent:</Text>
      {continents.map(continent => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('QuizScreen')}>
          <Text style={styles.buttonText}>{continent}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={homeScreen} />
          <Stack.Screen
            name="ContinentSelect"
            component={continentSelectScreen}
          />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
        </Stack.Navigator>
      </SafeAreaView>
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
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#666',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
  },
});

export default App;
