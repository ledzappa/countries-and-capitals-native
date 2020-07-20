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
import ScoreScreen from './components/ScoreScreen';

import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Text, Divider} from 'react-native-elements';

const Stack = createStackNavigator();

const continents = [
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Asia',
  'Oceania',
];

const homeScreen = ({navigation, route}) => {
  const settings = route.params?.settings || {alternatives: 4, timer: -1};
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Text h4>Quiz me on:</Text>
      <Button
        title="CAPITALS"
        buttonStyle={styles.button}
        onPress={() =>
          navigation.navigate('ContinentSelect', {
            settings,
            mode: 'capitals',
          })
        }
      />
      <Button
        title="FLAGS"
        buttonStyle={styles.button}
        onPress={() =>
          navigation.navigate('ContinentSelect', {settings, mode: 'flags'})
        }
      />
      <Button
        title="SETTINGS"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('SettingsScreen', {settings})}
      />
    </ScrollView>
  );
};

const continentSelectScreen = ({navigation, route}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Text h4>Choose continent:</Text>
      {continents.map(continent => (
        <Button
          title={continent}
          buttonStyle={styles.button}
          onPress={() =>
            navigation.navigate('QuizScreen', {
              continent,
              mode: route.params.mode,
              settings: route.params.settings,
            })
          }
        />
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
          <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
