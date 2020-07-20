import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ButtonGroup, Button} from 'react-native-elements';

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.buttonsAlternatives = [4, 6, 8];
    this.buttonsTimer = ['Off', '5s', '10s', '15s', '20s'];
    this.buttonsTimerVal = [-1, 5, 10, 15, 20];
    this.state = {
      selectedIndexAlternatives: 0,
      selectedIndexTimer: 0,
      timer: false,
    };
    this.updateIndexAlternatives = this.updateIndexAlternatives.bind(this);
    this.updateIndexTimer = this.updateIndexTimer.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedIndexAlternatives: this.buttonsAlternatives.indexOf(
        this.props.route.params.settings.alternatives,
      ),
      selectedIndexTimer: this.buttonsTimerVal.indexOf(
        this.props.route.params.settings.timer,
      ),
      timer: false,
    });
  }

  updateIndexAlternatives(selectedIndexAlternatives) {
    this.setState({selectedIndexAlternatives});
  }

  updateIndexTimer(selectedIndexTimer) {
    this.setState({selectedIndexTimer});
  }

  render() {
    const {selectedIndexAlternatives, selectedIndexTimer} = this.state;
    return (
      <View>
        <Text>Number of alternatives:</Text>
        <ButtonGroup
          onPress={this.updateIndexAlternatives}
          selectedIndex={selectedIndexAlternatives}
          buttons={this.buttonsAlternatives}
          containerStyle={{height: 50}}
        />
        <Text>Timer:</Text>
        <ButtonGroup
          onPress={this.updateIndexTimer}
          selectedIndex={selectedIndexTimer}
          buttons={this.buttonsTimer}
          containerStyle={{height: 50}}
        />
        <Button
          title="Done"
          buttonStyle={{marginTop: 40}}
          onPress={() =>
            this.props.navigation.navigate('Home', {
              settings: {
                alternatives: this.buttonsAlternatives[
                  selectedIndexAlternatives
                ],
                timer: this.buttonsTimerVal[selectedIndexTimer],
              },
            })
          }
        />
      </View>
    );
  }
}
