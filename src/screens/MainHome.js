import React, {Component} from 'react';
import {typography, colors, spacing} from '../styles';
import Images from '../assets/Images';
import {StyleSheet,Image, TouchableOpacity, Text, View, Button} from 'react-native';
import SvgUri from 'react-native-svg-uri';

export default class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={mstyles.container}>
        <View style={mstyles.layerDivide}>
          <View style={mstyles.circleShape}>
            <Image source={Images.logo2} style={mstyles.imageStyle}/>
          </View>
        </View>
        <View style={mstyles.layerDivide}>
        <View style={mstyles.horizontallayerGrid}>
          <View style={mstyles.boxView}>
            <SvgUri width="40" height="40" source={Images.ic_inventory} />
            <Text style={mstyles.textStyle}>
              Inventory
            </Text>
          </View>
          <View style={mstyles.boxView}>
            <SvgUri width="40" height="40" source={Images.ic_inventory} />
            <Text style={mstyles.textStyle}>
              Inventory
            </Text>
          </View>
        </View>
        <View style={mstyles.horizontallayerGrid}>

        </View>
        <View style={{flex:0.3}}>

        </View>
          <Text style={{fontFamily: typography.FONT_FAMILY_BOLD}}>
            Details Screen
          </Text>
          <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.navigate('Inventory')}
          />
        </View>
      </View>
    );
  }
}

// these are the styles that is to apply on react elements in this js file
const mstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerDivide: {
    backgroundColor:colors.BLUE,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontallayerGrid: {
    flex: 0.5,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    flex: 0.5,
    width: '90%',
    height:'90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleShape: {
    width:160,
    height:160,
    backgroundColor: colors.WHITE,
    borderRadius: 160/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width:119,
    height:98,
    marginBottom:spacing.SCALE_18,
    resizeMode: 'contain'
  },
  textStyle: {
    fontFamily: typography.FONT_FAMILY_REGULAR,
    fontWeight: typography.FONT_WEIGHT_BOLD,
    fontSize: typography.FONT_SIZE_18,
    color: colors.WHITE,
  }
});
