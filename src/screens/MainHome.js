import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View,Button} from 'react-native';

export default class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'BLack'}}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Inventory')}
        />
      </View>
    );
  }
}