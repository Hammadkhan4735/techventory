import React, { Component } from 'react'
import {StyleSheet, Text, View ,FlatList,TouchableOpacity, 
    ToastAndroid,Platform,Alert} from 'react-native'
import {typography, colors} from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Constant from '../utils/Constants';
import * as Helping from '../utils/Helping';
import Loader from '../components/Loader';
import firestore from '@react-native-firebase/firestore';
import Inventory from './Inventory';




export default class Search extends Component {
    constructor() {
        super()
        this.state = {
           selectedContainer:'',
           isloading:true,
           InventoryData:[],
           DropDownArray:[],
           InventoryFlatListData:[]
        }

        this.getInventoryList()
     }


    render() {
        return (
            <View style={mstyles.container}>
                <View style={{flexDirection:'row',height: 45,width:'90%',alignSelf:'center',marginTop:20,marginBottom:5}}>
                    <View style={{flex:0.7,marginRight:5}}>
                    <DropDownPicker style={mstyles.textInputStyle}
                            items={this.state.DropDownArray}
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
                    <TouchableOpacity style={[mstyles.buttonBlue, {flex:0.3,marginLeft:5}]} 
                        onPress={this.searchButtonClick}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Search
                            </Text>
                    </TouchableOpacity>
                </View>
                <FlatList  contentContainerStyle={{paddingBottom:15}}
                    data={this.state.InventoryFlatListData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <Loader
                    loading={this.state.isloading} />
            </View>
        )
    }

    
    searchButtonClick = () => {
        if(this.state.selectedContainer!=""){
            const arrTempSearch = []
            this.state.InventoryData.map((item, i) => {
                if(item.name==this.state.selectedContainer){
                    arrTempSearch.push(item)
                    this.setState({InventoryFlatListData: arrTempSearch});
                }
            });
        }
        else{
            Helping.showToastMessage("Please select any container")
        }
    }



    getInventoryList(){
        this.setState({isloading: !this.state.isloading});
        /* firestore().collection(Constant.DbInventory)
        .orderBy('createdAt', 'asc')
        .get()
        .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot.size);
                const arrTemp = this.state.InventoryData.slice()
                const arrDDownTemp = this.state.DropDownArray.slice()
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arrTemp.push(documentSnapshot.data())
                    arrDDownTemp.push({"label":documentSnapshot.data().name,value:documentSnapshot.data().name})
                });
                this.setState({InventoryData: arrTemp});
                this.setState({InventoryFlatListData: arrTemp});
                this.setState({DropDownArray: arrDDownTemp});
                //console.log('Last Item: ', this.state.InventoryData[0]);
        })
        .catch((error) => {
            console.log('Unable to Connect to Server'+error)
        })
        .done(()=>{
            console.log('Completed');
            this.setState({isloading: !this.state.isloading});
        }); */

        firestore().collection(Constant.DbInventory)
        .orderBy('createdAt', 'asc') 
        .onSnapshot({
            error: (e) => {
                this.setState({isloading: false})
                Helping.showToastMessage("Unable to Connect to Server "+e)
            },
            next: (querySnapshot) => {
                this.setState({isloading: false})
                const arrTemp = []
                const arrDDownTemp = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arrTemp.push(documentSnapshot.data())
                    arrDDownTemp.push({"label":documentSnapshot.data().name,value:documentSnapshot.data().name})
                });
                this.setState({InventoryData: arrTemp});
                this.setState({InventoryFlatListData: arrTemp});
                this.setState({DropDownArray: arrDDownTemp});
                //console.log('Last Item: ', this.state.InventoryData[0]);
            },
        });
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
                                    Time Of Refil
                                </Text>
                                <Text style={[mstyles.textDropDownStyle,{fontSize: typography.FONT_SIZE_14,color:colors.HINT}]}>
                                    {Helping.convertUtcDateIntoLocalTime(item.timeToRefill)}
                                </Text>
                            </View>
                            <View style={{flex:0.4}}>
                                <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                    Date Of Refil
                                </Text>
                                <Text style={[mstyles.textDropDownStyle,{fontSize: typography.FONT_SIZE_14,color:colors.HINT}]}>
                                    {Helping.convertUtcDateIntoLocalDate(item.dateToRefill+'T'+item.timeToRefill)}
                                </Text>
                            </View>
                        </View>
                        <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                            Weight (lbs)
                        </Text>
                        <Text style={[mstyles.textDropDownStyle,{fontSize: typography.FONT_SIZE_14,color:colors.HINT}]}>
                            {item.weight}
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

