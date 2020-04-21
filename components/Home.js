import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Home extends Component {
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}


/* <StatusBar barStyle="dark-content" />
<SafeAreaView style={styles.container}>
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
    <Text style={styles.header}>Quiz me on:</Text>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>CAPITALS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>FLAGS</Text>
    </TouchableOpacity>
  </ScrollView>
</SafeAreaView> */