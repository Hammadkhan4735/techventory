import React, { Component } from 'react'
import {StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView,
    ToastAndroid,Platform,Alert} from 'react-native'
import {typography, colors} from '../styles';
import Images from '../assets/Images';
import SvgUri from 'react-native-svg-uri';
import * as Helping from '../utils/Helping';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Constant from '../utils/Constants';
import Loader from '../components/Loader';
import firestore from '@react-native-firebase/firestore';



export default class Settings extends Component {
    
    constructor() {
        super()
        this.state = {
           newName: '',
           blynkToken: '',
        
           isloading:true,
           selectedContainer:'',
           selectedContainerID:'',
           InventoryData:[],
           DropDownArray:[],
        }
        this.controller;
        this.getInventoryList()
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
                        <TouchableOpacity style={mstyles.buttonPurple}
                        onPress={this.removeContainer}>
                            <SvgUri  width="10" height="10" svgXmlData={Images.ic_minus} />
                        </TouchableOpacity>
                        <Text style={[mstyles.textStyle, {marginLeft:10,marginRight:10}]}>
                            {this.state.InventoryData.length}
                        </Text>
                        <TouchableOpacity style={mstyles.buttonPurple} 
                        onPress={this.addContainer}>
                            <SvgUri  width="10" height="10" svgXmlData={Images.ic_plus} />
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
                        <DropDownPicker style={mstyles.textInputStyle}
                            items={this.state.DropDownArray}
                            controller={instance => this.controller = instance}
                            defaultValue={this.state.selectedContainer}
                            containerStyle={{height: 50}}
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
                               
                                selectedContainerID: item.value,
                            })}
                            onChangeList={(items, callback) => {
                                this.setState({
                                    DropDownArray:items // items: items
                                }, callback);
                            }}
                        />
                        <Text style={[mstyles.textStyle, {marginLeft:2,marginRight:10,marginBottom:10,marginTop:15}]}>
                            New Name
                        </Text>
                        <TextInput  style={mstyles.textInputStyle} 
                            underlineColorAndroid='rgba(0,0,0,0)'
                            defaultValue={this.state.newName}
                            placeholder="" 
                            onChangeText = {this.typeContainerName}       
                        />
                        
                        <TouchableOpacity style={[mstyles.buttonBlue, {marginBottom:5,marginTop:20}]}
                        onPress={this.saveContainerName}>
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
                            onChangeText = {this.typeBlynkToken}       
                        />
                        <TouchableOpacity style={[mstyles.buttonBlue, {marginBottom:5,marginTop:20}]}
                        onPress={this.saveBlynkToken}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Save Token
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>
              
                </ScrollView>
                { this.state.isloading && 
                <Loader
                    loading={this.state.isloading} />
                }
            </View>
        )
    }


    getInventoryList(){
        this.setState({isloading: !this.state.isloading});
        firestore().collection(Constant.DbInventory)
        .orderBy('createdAt', 'asc')
        .get()
        .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot.size);
                const arrTemp = this.state.InventoryData.slice()
                const arrDDownTemp = this.state.DropDownArray.slice()
                querySnapshot.forEach(documentSnapshot => {
                    //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arrTemp.push(documentSnapshot.data())
                    arrDDownTemp.push({label:documentSnapshot.data().name,value:documentSnapshot.data().id})
                });
                this.setState({InventoryData: arrTemp,DropDownArray: arrDDownTemp});
        
                //console.log('Last Item: ', this.state.InventoryData[0]);
        })
        .catch((error) => {
            console.log('Unable to Connect to Server'+error)
        })
        .done(()=>{
            console.log('Completed');
            this.setState({isloading: !this.state.isloading});
        });
    }

    //this fuction triggers on each input clientName valus has changed
    typeContainerName = (text) => {
        this.setState({newName: text})
    }

    typeBlynkToken = (text) => {
        this.setState({blynkToken: text})
    }

    saveContainerName = () => {
        
            
        if(this.state.selectedContainerID!=""&&this.state.newName!=""){
            this.setState({isloading: !this.state.isloading});
            firestore().collection(Constant.DbInventory).doc(this.state.selectedContainerID)
            .update({name: this.state.newName})
            .then(() => {
                let arrTemp = this.state.InventoryData.slice()
                let arrDDownTemp = this.state.DropDownArray.slice()
                this.state.InventoryData.map((item, i) => {
                    if(item.id==this.state.selectedContainerID){
                        arrTemp[i].name=this.state.newName
                        arrDDownTemp[i].label=this.state.newName
                        console.log('Last Item: ', arrDDownTemp[i]);
                        //this.setState({selectedContainer: arrDDownTemp[i]});
                    }
                });
                
                
                //this.mcontroller.selectItem(this.state.newName);
              
              
                
                this.setState({InventoryData: arrTemp,
                    DropDownArray: arrDDownTemp,
                    newName:''
                });

                //this.controller.selectItem(this.state.DropDownArray[0]);
                //this.controller.reset();
               
                Helping.showToastMessage("Updated successfully")
            })
            .catch((error) => {
                Helping.showToastMessage("Unable to Connect to Server"+error)
            })
            .done(()=>{
                this.setState({isloading: !this.state.isloading});
            });
        }
        else{
            if(this.state.selectedContainerID==""){
                Helping.showToastMessage("Please select any container")
            }
            else{
                Helping.showToastMessage("Please enter new name")
            }
        }
    }

    addContainer = () => {
        if(this.state.InventoryData.length<50){
            this.setState({isloading: !this.state.isloading});
           
            var utcString = Helping.getCurrentDateTimeInUtcFormat()

            var ref=firestore().collection(Constant.DbInventory).doc();
         
            
            var containerObj={
                id:ref.id,
                name: 'Container '+(this.state.InventoryData.length+1),
                timeToRefill:'',
                dateToRefill:'',
                weight:'0',
                createdAt:utcString //'2021-01-03 00:00:00'
              }
            firestore().collection(Constant.DbInventory).doc(ref.id)
            .set(containerObj)
            .then(() => {
                let arrTemp = this.state.InventoryData.slice()
                let arrDDownTemp = this.state.DropDownArray.slice()
                arrTemp.push(containerObj)
                arrDDownTemp.push({ label:containerObj.name, value:containerObj.id})
                this.setState({InventoryData: arrTemp,DropDownArray: arrDDownTemp});
                
               
                Helping.showToastMessage("Container added successfully")
            })
            .catch((error) => {
                Helping.showToastMessage("Unable to Connect to Server"+error)
            })
            .done(()=>{
                this.setState({isloading: !this.state.isloading});
            });
        }
        else{
            Helping.showToastMessage("You have reached maximum container limit")
        }
    }

    removeContainer = () => {
        if(this.state.InventoryData.length>1){
            this.setState({isloading: !this.state.isloading});

            var lastDocId=this.state.InventoryData[this.state.InventoryData.length-1].id
            firestore().collection(Constant.DbInventory).doc(lastDocId)
            .delete()
            .then(() => {
                let arrTemp = this.state.InventoryData.slice()
                let arrDDownTemp = this.state.DropDownArray.slice()
                arrTemp.splice(this.state.InventoryData.length-1, 1);
                arrDDownTemp.splice(this.state.InventoryData.length-1, 1);
                this.setState({InventoryData: arrTemp,DropDownArray: arrDDownTemp});
                
               
                Helping.showToastMessage("Container removed successfully")
            })
            .catch((error) => {
                Helping.showToastMessage("Unable to Connect to Server"+error)
            })
            .done(()=>{
                this.setState({isloading: !this.state.isloading});
            });
        }
    }

    saveBlynkToken = () => {
        
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
        height: 50,
        backgroundColor: colors.PRIMARY,
        borderTopLeftRadius: 0, borderTopRightRadius: 0,
        borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
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
