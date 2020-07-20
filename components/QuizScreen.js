import React, {Component} from 'react';
import {styles} from './../styles/Styles';
import {ScrollView, Text, Image, View} from 'react-native';
import {Button} from 'react-native-elements';
import {countries} from '../assets/countries';

export default class QuizScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestionNumber: 1,
      timeLeft: 10,
      showAnswer: false,
      questions: [],
      answers: [],
      alternatives: [],
      alternativeType: '',
    };
    this.alternativeTypes = {
      flags: 'country',
      capitals: 'city',
    };
    this.timer = null;
    this.t1 = null;
  }

  componentDidMount() {
    this.setAlternativeType();
    this.setState(
      {
        questions: this.shuffleArray(
          countries.filter(
            x => x.continent === this.props.route.params.continent,
          ),
        ),
      },
      this.startRound,
    );
  }

  setAlternativeType() {
    this.setState({
      alternativeType:
        this.props.route.params.mode === 'capitalsAndFlags'
          ? Math.random() > 0.5
            ? 'city'
            : 'country'
          : this.alternativeTypes[this.props.route.params.mode],
    });
  }

  componentWillUnmount() {
    this.clearAllTimers();
  }

  startRound = () => {
    this.getAlternatives();
    this.restartTimer();
  };

  getAlternatives = () => {
    const numberOfAlternatives =
      parseInt(this.props.route.params.settings.alternatives) - 1;
    let alternatives = [];

    while (alternatives.length < numberOfAlternatives) {
      let randNum = Math.floor(Math.random() * this.state.questions.length);
      const alternative = this.state.questions[randNum][
        this.state.alternativeType
      ];

      if (
        alternatives.indexOf(alternative) === -1 &&
        randNum !== this.state.currentQuestionNumber - 1
      ) {
        alternatives = [...alternatives, alternative];
      }
    }

    // insert right answer in random position
    alternatives.splice(
      Math.floor(Math.random() * (alternatives.length + 1)),
      0,
      this.state.questions[this.state.currentQuestionNumber - 1][
        this.state.alternativeType
      ],
    );

    this.setState({alternatives: alternatives});
  };

  nextQuestion = () => {
    this.restartTimer();
    this.setAlternativeType();
    this.setState(
      {
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
        showAnswer: false,
      },
      this.getAlternatives,
    );
  };

  restartTimer() {
    if (this.props.route.params.settings.timer > -1) {
      this.setState({timeLeft: this.props.route.params.settings.timer});
      this.timer = setInterval(() => {
        this.setState({timeLeft: this.state.timeLeft - 1});
        if (this.state.timeLeft === 0) {
          this.showAnswer('Time-out');
        }
      }, 1000);
    }
  }

  showAnswer = answer => {
    clearInterval(this.timer);
    if (!this.state.showAnswer) {
      this.setState({showAnswer: true});
      this.t1 = setTimeout(() => {
        this.setState(
          {
            answers: [
              ...this.state.answers,
              {
                answer,
                correctAnswer: this.state.questions[
                  this.state.currentQuestionNumber - 1
                ][this.state.alternativeType],
                country: this.state.questions[
                  this.state.currentQuestionNumber - 1
                ]?.country,
              },
            ],
          },
          this.state.currentQuestionNumber !== this.state.questions.length
            ? this.nextQuestion
            : this.completeRound,
        );
      }, 1000);
    }
  };

  completeRound() {
    this.clearAllTimers();
    this.props.navigation.navigate('ScoreScreen', {
      answers: this.state.answers,
    });
  }

  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  clearAllTimers() {
    clearInterval(this.timer);
    clearTimeout(this.t1);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text>
            Question {this.state.currentQuestionNumber}/
            {this.state.questions.length}
          </Text>
          {this.props.route.params.settings.timer > -1 && (
            <Text>Time: {this.state.timeLeft}s</Text>
          )}

          <Text style={styles.header}>
            {this.state.alternativeType === 'city'
              ? "What's the capital of " +
                this.state.questions[this.state.currentQuestionNumber - 1]
                  ?.country +
                '?'
              : 'What country does this flag belong to?'}
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
              source={
                this.state.questions[this.state.currentQuestionNumber - 1]?.flag
              }
            />
          </View>
        </ScrollView>
        <View>
          {this.state.alternatives.map(alternative => (
            <Button
              title={alternative}
              buttonStyle={
                this.state.showAnswer &&
                alternative ===
                  this.state.questions[this.state.currentQuestionNumber - 1][
                    this.state.alternativeType
                  ]
                  ? styles.buttonAnswer
                  : styles.buttonQuiz
              }
              onPress={() => {
                this.showAnswer(alternative);
              }}
            />
          ))}
        </View>
      </View>
    );
  }
}
