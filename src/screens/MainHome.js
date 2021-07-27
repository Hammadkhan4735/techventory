import React, {Component} from 'react';
import {typography, colors, spacing} from '../styles';
import Images from '../assets/Images';
import {StyleSheet,Image, TouchableOpacity, Text, View, Button,PermissionsAndroid,Alert} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Loader from '../components/Loader';
import * as Constant from '../utils/Constants';
import firestore from '@react-native-firebase/firestore';
import * as Helping from '../utils/Helping';
import RNFetchBlob from 'react-native-fetch-blob';

export default class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading:false,
      InventoryData:[]
    };

    //this.getInventoryListAndExportInExcel()
  }

  

  render() {
    return (
      <View style={mstyles.container}>
        <View style={[mstyles.layerDivide, {flex:0.45}]}>
          <View style={mstyles.circleShape}>
            <Image source={Images.logo2} style={mstyles.imageStyle}/>
          </View>
        </View>
        <View style={[mstyles.layerDivide, {flex:0.55}]}>
        <View style={mstyles.horizontallayerGrid}>
          <TouchableOpacity style={[mstyles.boxView, {marginRight:'4%', backgroundColor:colors.BROWN}]}
          onPress={() => /* this.props.navigation.navigate('Inventory') */this.requestCameraPermission()}>
            <SvgUri style={{marginBottom:10}} width="40" height="40" svgXmlData={Images.ic_inventory} />
            <Text style={mstyles.textStyle}>
              Inventory
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[mstyles.boxView, {marginLeft:'4%', backgroundColor:colors.BLUE}]}
          onPress={() => this.props.navigation.navigate('Search')}>
            <SvgUri style={{marginBottom:10}} width="40" height="40" svgXmlData={Images.ic_search} />
            <Text style={mstyles.textStyle}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <View style={mstyles.horizontallayerGrid}>
          <TouchableOpacity style={[mstyles.boxView, {marginRight:'4%', backgroundColor:colors.PURPLE}]}
          onPress={() => this.props.navigation.navigate('PlaceOrder')}>
            <SvgUri style={{marginBottom:10}} width="40" height="40" svgXmlData={Images.ic_placeorder} />
            <Text style={mstyles.textStyle}>
              Place Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[mstyles.boxView, {marginLeft:'4%', backgroundColor:colors.GREEN}]}
          onPress={() => this.props.navigation.navigate('Settings')}>
            <SvgUri style={{marginBottom:10}} width="40" height="40" svgXmlData={Images.ic_settings} />
            <Text style={mstyles.textStyle}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:0.2}}>

        </View>

        </View>
        <Loader
              loading={this.state.isloading} />
      </View>
    );
  }




  requestCameraPermission = async () => {
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
      const headerString = 'NAME,TIMETOREFILL,DATETOREFILL,WEIGHT\n';
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
            "Inventory list exported successfully \n\nFile location : "+pathToWrite,
            [
              { text: "OK", onPress: () => {
                  console.log("OK Pressed")
                } 
                }
            ]
          );
          //Helping.showToastMessage("Data exported successfully \n\nFile location : "+pathToWrite)
          // wrote file /storage/emulated/0/Download/data.csv
        })
        .catch(error => Helping.showToastMessage("Error in exporting data. please try again"));
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

    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontallayerGrid: {
    margin:'8%',
    flex: 0.4,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    flex: 0.5,
    width: 130,
    height:130,
    borderRadius:4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleShape: {
    width:150,
    height:150,
    backgroundColor: colors.WHITE,
    borderRadius: 160/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width:110,
    height:92,
    marginBottom:spacing.SCALE_18,
    resizeMode: 'contain'
  },
  textStyle: {
    fontFamily: typography.FONT_FAMILY_BOLD,
    fontWeight: typography.FONT_WEIGHT_REGULAR,
    fontSize: typography.FONT_SIZE_18,
    color: colors.WHITE,
  }
});
