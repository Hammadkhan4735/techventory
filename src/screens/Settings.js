import React, { Component } from 'react'
import {StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import {typography, colors, spacing} from '../styles';
import Images from '../assets/Images';
import SvgUri from 'react-native-svg-uri';


export default class Settings extends Component {
    render() {
        return (
            <View style={mstyles.container}>
                <View style={mstyles.layerView}>
                    <Text style={[mstyles.textStyleHeading, {marginTop:20,marginLeft:5,marginBottom:10}]}>
                        Total Containers
                    </Text>
                    <View style={mstyles.cardView}>
                        <TouchableOpacity style={mstyles.buttonPurple}>
                            <SvgUri  width="10" height="10" source={Images.ic_minus} />
                        </TouchableOpacity>
                        <Text style={[mstyles.textStyle, {marginLeft:10,marginRight:10}]}>
                            80
                        </Text>
                        <TouchableOpacity style={mstyles.buttonPurple}>
                            <SvgUri  width="10" height="10" source={Images.ic_plus} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={mstyles.layerView}>
                    <Text style={[mstyles.textStyleHeading, {marginTop:20,marginLeft:5,marginBottom:10}]}>
                        Change Container Name
                    </Text>
                    <View style={mstyles.cardView}>
                        <TouchableOpacity style={mstyles.buttonPurple}>
                            <SvgUri  width="10" height="10" source={Images.ic_minus} />
                        </TouchableOpacity>
                        <Text style={[mstyles.textStyle, {marginLeft:10,marginRight:10}]}>
                            80
                        </Text>
                        <TouchableOpacity style={mstyles.buttonPurple}>
                            <SvgUri  width="10" height="10" source={Images.ic_plus} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

// these are the styles that is to apply on react elements in this js file
const mstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY,
     
      alignItems: 'center',
    },
    layerView: {
        width:'85%',
      marginLeft:'5%',
      marginRight:'5%',
    },
    cardView: {
        flexDirection:'row',
        backgroundColor: colors.PRIMARYLIGHT,
        padding:15,
        borderRadius:4,
     
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
   
    buttonPurple: {
      width: 55,
      height:30,
      borderRadius:4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.PURPLE,
    },

    textStyle: {
      fontFamily: typography.FONT_FAMILY_REGULAR,
      fontWeight: typography.FONT_WEIGHT_BOLD,
      fontSize: typography.FONT_SIZE_18,
      color: colors.WHITE,
    },
    textStyleHeading: {
        fontFamily: typography.FONT_FAMILY_REGULAR,
        fontWeight: typography.FONT_WEIGHT_BOLD,
        fontSize: typography.FONT_SIZE_22,
        color: colors.WHITE,
      }
  });
