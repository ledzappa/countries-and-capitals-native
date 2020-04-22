import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

export default class QuizScreen extends Component {
  constructor() {
    super();
    this.state = {
      correctAnswers: 0,
    };
  }

  checkAnswer = () => {
    this.setState({
      correctAnswers: this.state.correctAnswers + 1,
    });
  };

  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Text style={styles.header}>What's the capital of</Text>

        <TouchableOpacity style={styles.button} onPress={() => this.checkAnswer()}>
          <Text style={styles.buttonText}>Answer 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.checkAnswer()}>
          <Text style={styles.buttonText}>Answer 2</Text>
        </TouchableOpacity>
        <Text>{this.state.correctAnswers}</Text>
      </ScrollView>
    );
  }
}

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
