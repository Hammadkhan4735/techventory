import React, { Component } from 'react'
import {StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'
import {typography, colors} from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const InventoryData = [
    { id: 'bd7acbea', name: 'Flour'},
    { id: '3ac68afc', name: 'Rice'},
    { id: '58694a0f', name: 'Vegetables'},
    { id: '594a0f', name: 'Container 4'},
    { id: '5869411a0f', name: 'Container 5'},
  ];

export default class Search extends Component {
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
            <View style={mstyles.container}>
                <View style={{flexDirection:'row',height: 45,width:'90%',alignSelf:'center',marginTop:20,marginBottom:5}}>
                    <View style={{flex:0.7,marginRight:5}}>
                    <DropDownPicker style={mstyles.textInputStyle}
                            items={[
                                {label: 'Container 1', value: '1'},
                                {label: 'Container 2', value: '2'},
                                {label: 'Container 3', value: '3'},
                                {label: 'Container 4', value: '4'},
                            ]}
                            defaultValue={this.state.selectedContainer}
                            containerStyle={{height: 60}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={mstyles.textDropDownStyle}
                            arrowColor={colors.WHITE}
                            activeLabelStyle={{color: colors.BROWN}}
                            placeholder={'Select Container'}
                            placeholderStyle={{color:colors.GRAY_DARK}}
                            dropDownStyle={{backgroundColor: colors.PRIMARYLIGHT,
                                borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                                borderColor:colors.PRIMARY,borderWidth:2}}
                            onChangeItem={item => this.setState({
                                selectedContainer: item.value
                            })}
                    />
                    </View>
                    <TouchableOpacity style={[mstyles.buttonBlue, {flex:0.3,marginLeft:5}]}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Search
                            </Text>
                    </TouchableOpacity>
                </View>
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
                        <View style={{flexDirection:'row',marginBottom:20}}>
                            <View style={{flex:0.6}}>
                                <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                    Time To Refil
                                </Text>
                                <Text style={[mstyles.textDropDownStyle,{fontSize: typography.FONT_SIZE_14,color:colors.HINT}]}>
                                    04:30 PM
                                </Text>
                            </View>
                            <View style={{flex:0.4}}>
                                <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                    Date To Refil
                                </Text>
                                <Text style={[mstyles.textDropDownStyle,{fontSize: typography.FONT_SIZE_14,color:colors.HINT}]}>
                                    11/23/2020
                                </Text>
                            </View>
                        </View>
                        <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                            Weight (lbs)
                        </Text>
                        <Text style={[mstyles.textDropDownStyle,{fontSize: typography.FONT_SIZE_14,color:colors.HINT}]}>
                            10
                        </Text>
                    </View>
                </View>
);

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
        
        backgroundColor: colors.PRIMARYLIGHT,
        padding:15,
        borderRadius:4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
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
        flex: 0.6, 
        paddingLeft:10 , 
        paddingRight : 10, 
        backgroundColor: colors.PRIMARYLIGHT,
        borderTopLeftRadius: 4, borderTopRightRadius: 4,
        borderBottomLeftRadius: 4, borderBottomRightRadius: 4,
        borderColor:colors.PRIMARY,
        fontFamily: typography.FONT_FAMILY_REGULAR,
        fontWeight: typography.FONT_WEIGHT_REGULAR,
        fontSize: typography.FONT_SIZE_16,
        color: colors.WHITE,
        
    },
    textDropDownStyle:{
        fontFamily: typography.FONT_FAMILY_REGULAR,
        fontWeight: typography.FONT_WEIGHT_REGULAR,
        fontSize: typography.FONT_SIZE_16,
        color: colors.WHITE,
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
  });

