import React, {Component} from 'react';
import {styles} from './../styles/Styles';
import {ScrollView, Text, TouchableOpacity, Image, View} from 'react-native';
import {countries} from '../assets/countries';

export default class QuizScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      correctAnswers: 0,
      numberOfQuestions: 0,
      timeLeft: 10,
      showAnswer: false,
      questions: [],
      alternatives: [],
    };
    this.timer = null;
  }

  componentDidMount() {
    let res = countries.filter(
      x => x.continent === this.props.route.params.continent,
    );

    this.setState(
      {
        continent: this.props.params,
        numberOfQuestions: res.length,
        questions: res,
      },
      this.startRound,
    );
  }

  startRound = () => {
    this.getAlternatives();
    this.restartTimer();
  };

  getAlternatives = () => {
    const numberOfAlternatives =
      parseInt(this.props.route.params.alternatives) - 1;
    let alternatives = [];
    while (alternatives.length < numberOfAlternatives) {
      let randNum = Math.floor(Math.random() * this.state.numberOfQuestions);
      const alternative = this.state.questions[randNum].city;

      if (
        alternatives.indexOf(alternative) === -1 &&
        randNum !== this.state.currentQuestion
      ) {
        alternatives = [...alternatives, alternative];
      }
    }

    // insert right answer in random position
    alternatives.splice(
      Math.floor(Math.random() * (alternatives.length + 1)),
      0,
      this.state.questions[this.state.currentQuestion]?.city,
    );

    this.setState({alternatives: alternatives});
  };

  nextQuestion = () => {
    this.setState(
      {currentQuestion: this.state.currentQuestion + 1, showAnswer: false},
      this.getAlternatives,
    );
    this.restartTimer();
  };

  restartTimer() {
    clearInterval(this.timer);
    this.setState({timeLeft: 10});
    this.timer = setInterval(() => {
      this.setState({timeLeft: this.state.timeLeft - 1});
      if (this.state.timeLeft === 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  showAnswer = () => {
    if (!this.state.showAnswer) {
      this.setState({showAnswer: true});
      setTimeout(() => {
        this.setState(
          {
            correctAnswers: this.state.correctAnswers + 1,
          },
          this.nextQuestion,
        );
      }, 1000);
    }
  };

  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Text>
          Question {this.state.currentQuestion + 1}/
          {this.state.numberOfQuestions + 1}
        </Text>
        <Text>Time: {this.state.timeLeft}s</Text>
        <Text style={styles.header}>
          {this.state.questions[this.state.currentQuestion]?.country}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}>
          <Image
            resizeMode="contain"
            style={{width: 300, height: 150}}
            source={this.state.questions[this.state.currentQuestion]?.flag}
          />
        </View>
        {this.state.alternatives.map(alternative => (
          <TouchableOpacity
            style={
              this.state.showAnswer &&
              alternative ===
                this.state.questions[this.state.currentQuestion]?.city
                ? styles.buttonAnswer
                : styles.button
            }
            onPress={() => this.showAnswer()}>
            <Text style={styles.buttonText}>{alternative}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}
