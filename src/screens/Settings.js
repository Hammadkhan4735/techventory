import React, { Component } from 'react'
import {StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView} from 'react-native'
import {typography, colors, spacing} from '../styles';
import Images from '../assets/Images';
import SvgUri from 'react-native-svg-uri';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class Settings extends Component {
    constructor() {
        super()
        this.state = {
           clientName: '',
           blynkToken: ''
        }
     }


    render() {
        return (
            <View style={mstyles.container}>
                <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
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
                    <View style={[mstyles.cardView,{flexDirection:'column'}]}>
                        <Text style={[mstyles.textStyle, {marginLeft:2,marginRight:10,marginBottom:10}]}>
                            Old Name
                        </Text>
                        <TextInput  style={mstyles.textInputStyle} 
                            underlineColorAndroid='rgba(0,0,0,0)'
                            defaultValue={this.state.clientName}
                            placeholder="" 
                            onChangeText = {this.updateClientname}       
                        />
                        <Text style={[mstyles.textStyle, {marginLeft:2,marginRight:10,marginBottom:10,marginTop:15}]}>
                            New Name
                        </Text>
                        <TextInput  style={mstyles.textInputStyle} 
                            underlineColorAndroid='rgba(0,0,0,0)'
                            defaultValue={this.state.clientName}
                            placeholder="" 
                            onChangeText = {this.updateClientname}       
                        />
                        <TouchableOpacity style={[mstyles.buttonBlue, {marginBottom:5,marginTop:20}]}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Save Name
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                   
                    <View style={[mstyles.cardView,{flexDirection:'column',marginTop:20,marginBottom:20}]}>
                       
                        <Text style={[mstyles.textStyle, {marginLeft:2,marginRight:10,marginBottom:10,marginTop:5}]}>
                            Blynk Token
                        </Text>
                        <TextInput  style={mstyles.textInputStyle} 
                            underlineColorAndroid='rgba(0,0,0,0)'
                            defaultValue={this.state.clientName}
                            placeholder="" 
                            onChangeText = {this.updateClientname}       
                        />
                        <TouchableOpacity style={[mstyles.buttonBlue, {marginBottom:5,marginTop:20}]}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Save Token
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>
              
                </ScrollView>
            </View>
        )
    }

    //this fuction triggers on each input clientName valus has changed
    updateContainerName = (text) => {
        this.setState({clientName: text})
    }

    updateBlynkToken = (text) => {
        this.setState({blynkToken: text})
    }
}

// these are the styles that is to apply on react elements in this js file
const mstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY,
      
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
    buttonBlue: {
        width: '100%',
        borderRadius:4,
        backgroundColor: colors.BLUEDARK,
        alignItems: 'center',
        justifyContent: 'center',
        height:40
      },
    textInputStyle: {
        width: '100%', 
        paddingLeft:10 , 
        paddingRight : 10, 
        backgroundColor: colors.PRIMARY,
        fontFamily: typography.FONT_FAMILY_REGULAR,
        fontWeight: typography.FONT_WEIGHT_REGULAR,
        fontSize: typography.FONT_SIZE_16,
        color: colors.WHITE,
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
