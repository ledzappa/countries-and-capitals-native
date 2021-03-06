/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {styles} from './styles/Styles';
import QuizScreen from './components/QuizScreen';
import SettingsScreen from './components/SettingsScreen';

import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';

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
  'Oceania',
];

const checkAnswer = () => {
  console.log('check answer!');
};

const homeScreen = ({navigation, route}) => {
  const alternatives = route.params?.alternatives || 4;
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Text style={styles.header}>Quiz me on:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ContinentSelect', {
            alternatives,
            mode: 'capitals',
          })
        }>
        <Text style={styles.buttonText}>CAPITALS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ContinentSelect', {alternatives, mode: 'flags'})
        }>
        <Text style={styles.buttonText}>FLAGS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('SettingsScreen', {alternatives})}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const continentSelectScreen = ({navigation, route}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Text style={styles.header}>Choose continent:</Text>
      {continents.map(continent => (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('QuizScreen', {
              continent,
              mode: route.params.mode,
              alternatives: route.params.alternatives,
            })
          }>
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
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
