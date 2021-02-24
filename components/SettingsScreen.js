import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.buttons = [4, 6, 8];
    this.state = {
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedIndex: this.buttons.indexOf(this.props.route.params.alternatives),
    });
  }

  updateIndex(selectedIndex) {
    this.props.navigation.navigate('Home', {
      alternatives: this.buttons[selectedIndex],
    });
    this.setState({ selectedIndex });
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <View>
        <Text>Number of alternatives:</Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={this.buttons}
          containerStyle={{ height: 100 }}
        />
      </View>
    );
  }
}
