import React, {Component} from 'react';
import {styles} from './../styles/Styles';
import {Text, View} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

export default class ScoreScreen extends Component {
  constructor() {
    super();
    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    this.setState({
      answers: this.props.route.params.answers,
    });
  }

  correctAnswers = () =>
    this.state.answers.filter(answer => answer.answer === answer.correctAnswer)
      .length;

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={styles.header}>Score</Text>
          <Text style={styles.headerSecondary}>
            {this.correctAnswers()} / {this.state.answers.length}
          </Text>
          {this.state.answers.map((item, i) => (
            <ListItem
              key={i}
              containerStyle={{
                backgroundColor:
                  item.answer === item.correctAnswer ? '#bcffbc' : '#ffc1c1',
              }}
              leftIcon={{name: 'av-timer'}}
              title={item.country}
              subtitle={
                item.answer +
                ' ' +
                (item.answer !== item.correctAnswer
                  ? '(Correct: ' + item.correctAnswer + ')'
                  : '')
              }
              bottomDivider
              chevron
            />
          ))}
        </ScrollView>
        <View>
          <Button
            title="Back to menu"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}
