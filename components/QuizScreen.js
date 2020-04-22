import React, {Component} from 'react';
import {styles} from './../styles/Styles';
import {ScrollView, Text, TouchableOpacity} from 'react-native';

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

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.checkAnswer()}>
          <Text style={styles.buttonText}>Answer 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.checkAnswer()}>
          <Text style={styles.buttonText}>Answer 2</Text>
        </TouchableOpacity>
        <Text>{this.state.correctAnswers}</Text>
      </ScrollView>
    );
  }
}
