import React, {Component} from 'react';
import {styles} from './../styles/Styles';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {countriesByCapital} from '../assets/countries-by-capital';
import {countriesByContinent} from '../assets/countries-by-continent';

export default class QuizScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      correctAnswers: 0,
      numberOfQuestions: 0,
      questions: [],
      alternatives: [],
    };
  }

  componentDidMount() {
    console.log(JSON.stringify(this.props, null, 2));
    let res = countriesByCapital
      .map(x =>
        Object.assign(x, {
          continent: countriesByContinent.find(y => y.country === x.country)
            ? countriesByContinent.find(y => y.country === x.country).continent
            : undefined,
        }),
      )
      .filter(x => x.continent === this.props.route.params.continent);

    this.setState(
      {
        continent: this.props.params,
        numberOfQuestions: res.length,
        questions: res,
      },
      this.getAlternatives,
    );
  }

  getAlternatives = () => {
    console.log(this.state.currentQuestion);
    let alternatives = [];
    while (alternatives.length < 3) {
      let randomItem = Math.floor(Math.random() * this.state.numberOfQuestions);

      if (
        alternatives.indexOf(this.state.questions[randomItem].city) === -1 &&
        randomItem !== this.state.currentQuestion
      ) {
        alternatives.push(this.state.questions[randomItem].city);
      }
    }

    // insert right answer in random position
    alternatives.splice(
      Math.floor(Math.random() * (alternatives.length + 1)),
      0,
      this.state.questions[this.state.currentQuestion]
        ? this.state.questions[this.state.currentQuestion].city
        : 'asdf',
    );

    this.setState({alternatives: alternatives});
  };

  nextQuestion = () => {
    this.setState(
      {currentQuestion: this.state.currentQuestion + 1},
      this.getAlternatives,
    );
  };

  showAnswer = () => {
    this.setState({
      correctAnswers: this.state.correctAnswers + 1,
    }, this.nextQuestion);
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
        <Text style={styles.header}>
          {this.state.questions[this.state.currentQuestion]
            ? this.state.questions[this.state.currentQuestion].country
            : ''}
        </Text>
        {this.state.alternatives.map(alternative => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showAnswer()}>
            <Text style={styles.buttonText}>{alternative}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}
