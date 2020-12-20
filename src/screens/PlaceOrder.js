import React, { Component } from 'react'
import {StyleSheet, Text, View ,FlatList,TouchableOpacity,ScrollView} from 'react-native'
import {typography, colors} from '../styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const InventoryData = [
    { id: 'bd7acbea', name: 'Flour'},
    { id: '58694s0f', name: 'Powder'},
    { id: '586941d0f', name: 'Maze'},
    { id: '594a0f', name: 'Container 4'},
    { id: '5869411a0f', name: 'Container 5'},
    { id: '3ac68afc', name: 'Rice'},
    { id: '58694a0f', name: 'Vegetables'},
    { id: '586asdqqf', name: 'Beans'},
  ];

export default class PlaceOrder extends Component {
    
    constructor() {
        super()
        this.state = {
           clientName: '',
           blynkToken: '',
           selectedContainer:''
        }
     }
     
    render() {
        return (
            <View  style={mstyles.container}>
                <FlatList  contentContainerStyle={{paddingBottom:15}}
                    data={InventoryData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    } 
}

const renderItem = ({ item }) => (
    <View style={[mstyles.layerView,{ alignSelf:'center'}]}>
                <Text style={[mstyles.textStyleHeading, {marginTop:15,marginLeft:5,marginBottom:10}]}>
                    {item.name}
                </Text>
                <View style={mstyles.cardView}>
                    <View style={{flexDirection:'row',marginBottom:15}}>
                        <View style={{flex:0.4}}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Time To Refil
                            </Text>
                            <Text style={[mstyles.textStyleSmall,{marginLeft:5}]}>
                                04:30 PM
                            </Text>
                        </View>
                        <View style={{flex:0.2}}></View>
                        <View style={{flex:0.4}}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Date To Refil
                            </Text>
                            <Text style={[mstyles.textStyleSmall,{marginLeft:5}]}>
                                11/23/2020
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'100%'}}>
                    <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                        Weight 
                    </Text>
                    </View>
                    <MultiSlider
                        snapped={true}
                        step={10}
                        selectedStyle={{backgroundColor: colors.SECONDARY}}
                        unselectedStyle={{backgroundColor: colors.SECONDARY}} 
                        sliderLength={250}
                        trackStyle={{height: 16,
                            backgroundColor: colors.SECONDARY,
                            borderRadius: 10}}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 10,
                            slipDisplacement: 10}}
                        customMarker={MySeekbarMarker}
                        allowOverlap={false}
                        min={0}
                        max={100}
                    />
                    <View   style={{flexDirection:'row'}}>
                        <Text style={mstyles.seekBarLabelStyle}> 0 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 10 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 20 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 30 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 40 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 50 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 60 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 70 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 80 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 90 </Text>
                        <Text style={mstyles.seekBarLabelStyle}> 100 </Text>
                    </View>
                </View>
            </View>
);

const MySeekbarMarker = () => {
    return <View style={mstyles.markerStyle}>
        </View>;
};


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
          alignItems:'center',
          backgroundColor: colors.PRIMARYLIGHT,
          padding:15,
          borderRadius:4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,  
          elevation: 5
      },
      markerStyle: {
        width: 15,
        height:28,
        marginTop:13,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.SECONDARYLIGHT,
        
      },
      seekBarLabelStyle: {
        fontFamily: typography.FONT_FAMILY_BOLD,
        fontWeight: typography.FONT_WEIGHT_REGULAR,
        fontSize: typography.FONT_SIZE_12,
        flex:0.09,
        color:colors.HINT,
        textAlign:'center'
      },

    textStyle: {
      fontFamily: typography.FONT_FAMILY_BOLD,
      fontWeight: typography.FONT_WEIGHT_REGULAR,
      fontSize: typography.FONT_SIZE_18,
      color: colors.WHITE,
    },
    textStyleHeading: {
        fontFamily: typography.FONT_FAMILY_BOLD,
        fontWeight: typography.FONT_WEIGHT_REGULAR,
        fontSize: typography.FONT_SIZE_22,
        color: colors.WHITE,
      },
    textStyleSmall: {
        fontFamily: typography.FONT_FAMILY_REGULAR,
        fontWeight: typography.FONT_WEIGHT_REGULAR,
        fontSize: typography.FONT_SIZE_14,
        color: colors.HINT,
      }
  });

