import React, { Component } from 'react'
import {StyleSheet, Text, View ,FlatList,TouchableOpacity,PermissionsAndroid,Alert} from 'react-native'
import {typography, colors} from '../styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import * as Helping from '../utils/Helping';
import * as Constant from '../utils/Constants';
import RNFetchBlob from 'react-native-fetch-blob';

 

export default class Inventory extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
           isloading:true,
           InventoryData:[]
        }

        this.props.navigation.setOptions({ 
            headerRight: () => ( 
            <TouchableOpacity style={mstyles.buttonBlue} onPress={this.requestPermission}>
             <Text style={[mstyles.textStyleExportBtn,{paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10}]}>
               Export
             </Text>
           </TouchableOpacity>) 
         })
        
        this.getInventoryList()
     }


    render() {
        return (
            <View  style={mstyles.container}>
                <FlatList  contentContainerStyle={{paddingBottom:15}}
                    data={this.state.InventoryData}
                    visible={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <Loader
                    loading={this.state.isloading} />
            </View>
        )
    }
 
    getInventoryList(){
        this.setState({isloading: !this.state.isloading});
        /* firestore().collection(Constant.DbInventory)
        .orderBy('createdAt', 'asc')
        .get()
        .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot.size);
                const arrTemp = this.state.InventoryData.slice()
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arrTemp.push(documentSnapshot.data())
                });
                this.setState({InventoryData: arrTemp});
                //console.log('Last Item: ', this.state.InventoryData[0]);
        })
        .catch((error) => {
            Helping.showToastMessage("Unable to Connect to Server"+error)
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
                //console.log('Total users: ', querySnapshot.size);
                this.setState({isloading: false})
                const arrTemp = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arrTemp.push(documentSnapshot.data())
                });
                this.setState({InventoryData: arrTemp});
                //console.log('Last Item: ', this.state.InventoryData[0]);
            },
        });
        
    }


    requestPermission = async () => {
        try {
          if (Platform.OS === "android") {
              const granted = await PermissionsAndroid.requestMultiple(
                  [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
              );
              if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] && 
                  granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
                  this.getInventoryListAndExportInExcel() 
              } else {
                  Helping.showToastMessage("permission denied")
              }
          }
        } catch (err) {
            Helping.showToastMessage("permission error"+err)
        }
    }
    
    getInventoryListAndExportInExcel(){
      this.setState({isloading: !this.state.isloading});
      firestore().collection(Constant.DbInventory)
      .orderBy('createdAt', 'asc')
      .get()
      .then(querySnapshot => {
              //console.log('Total users: ', querySnapshot.size);
              const arrTemp = this.state.InventoryData.slice()
              querySnapshot.forEach(documentSnapshot => {
                  console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                  arrTemp.push(documentSnapshot.data())
              });
              this.setState({InventoryData: arrTemp});
              this.exportDataToCsvn()
              //console.log('Last Item: ', this.state.InventoryData[0]);
      })
      .catch((error) => {
          Helping.showToastMessage("Unable to Connect to Server"+error)
      })
      .done(()=>{
          console.log('Completed');
          this.setState({isloading: !this.state.isloading});
      });
    }
    
    exportDataToCsvn = () => {
          const data = this.state.InventoryData.slice()
          // construct csvString
          const headerString = 'NAME,TIME_TO_REFILL,DATE_TO_REFILL,WEIGHT\n';
          const rowString = data.map(item => `${item.name},${item.timeToRefill},${item.dateToRefill},${item.weight}\n`).join('');
          const csvString = `${headerString}${rowString}`;
          
          // write the current list of answers to a local csv file
          const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/inventory.csv`;
          console.log('pathToWrite', pathToWrite);
          // pathToWrite /storage/emulated/0/Download/data.csv
          RNFetchBlob.fs
            .writeFile(pathToWrite, csvString, 'utf8')
            .then(() => {
              console.log(`wrote file ${pathToWrite}`);
              Alert.alert(
                "Exported Successfully",
                "Inventory list data exported successfully \n\nFile location : "+pathToWrite,
                [
                  { text: "OK", onPress: () => {
                      console.log("OK Pressed")
                      //RNFetchBlob.android.actionViewIntent(pathToWrite, "*");
    
                    } 
                  }
                ]
              );
            })
            .catch(error => Helping.showToastMessage("Error in exporting data. please try again"));
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
                                {Helping.convertUtcDateIntoLocalTime(item.timeToRefill)}
                            </Text>
                        </View>
                        <View style={{flex:0.2}}></View>
                        <View style={{flex:0.4}}>
                            <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                                Date To Refil
                            </Text>
                            <Text style={[mstyles.textStyleSmall,{marginLeft:5}]}>
                                { Helping.convertUtcDateIntoLocalDate(item.dateToRefill+'T'+item.timeToRefill)}
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'100%'}}>
                    <Text style={[mstyles.textStyle,{fontSize: typography.FONT_SIZE_16}]}>
                        Weight 
                    </Text>
                    </View>
                    <MultiSlider
                        values={[parseInt(item.weight)]}
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
                        enabledOne={false}
                        customMarker={MySeekbarMarker}
                        allowOverlap={false}
                        min={0}
                        max={100}
                    />
                    <View   style={{flexDirection:'row'}}>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 0 && item.weight < 10)  ? { color: 'white' } : null ]}>
                             0 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 10 && item.weight < 20) ? { color: 'white' } : null ]}>
                             10 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 20 && item.weight < 30) ? { color: 'white' } : null ]}>
                             20 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 30 && item.weight < 40) ? { color: 'white' } : null ]}>
                             30 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 40 && item.weight < 50) ? { color: 'white' } : null ]}>
                             40 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 50 && item.weight < 60) ? { color: 'white' } : null ]}>
                             50 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 60 && item.weight < 70) ? { color: 'white' } : null ]}>
                             60 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 70 && item.weight < 80) ? { color: 'white' } : null ]}>
                             70 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 80 && item.weight < 90) ? { color: 'white' } : null ]}>
                             80 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 90 && item.weight < 100) ? { color: 'white' } : null ]}>
                             90 </Text>
                        <Text style={[mstyles.seekBarLabelStyle, (item.weight >= 100 && item.weight < 110) ? { color: 'white' } : null ]}>
                             100 </Text>
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
    buttonBlue: {
        borderRadius:4,
        marginRight:10,
        backgroundColor: colors.BLUEDARK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyleExportBtn: {
        fontFamily: typography.FONT_FAMILY_BOLD,
        fontWeight: typography.FONT_WEIGHT_REGULAR,
        fontSize: typography.FONT_SIZE_14,
        color: colors.WHITE,
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
      },
      spinnerStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center' 
      }
  });
