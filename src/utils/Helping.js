import {ToastAndroid,Platform,Alert} from 'react-native'


export const showToastMessage = (msg) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.LONG)
    } else {
        Alert.alert(msg);
    }
}

export const getCurrentDateTimeInUtcFormat = () => {
    var mDate = new Date();
    var offset= mDate.getTimezoneOffset() / 60;

    const year = mDate.getFullYear().toString()
    const month = ("0" + (mDate.getMonth() + 1)).slice(-2)
    const day = ("0" + mDate.getDate()).slice(-2)
    const hour = ("0" + mDate.getHours()).slice(-2)
    const minute = ("0" + mDate.getMinutes()).slice(-2)
    const second = ("0" + mDate.getSeconds()).slice(-2)
    console.log('year: ',year);
    console.log('Month: ',month);
    console.log('day: ',day);
    console.log('hour: ',hour);
    console.log('minute: ',minute);
    console.log('minute: ',`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    // Step: 2 Make a JS date object with the data
    const dateObject = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
  
    // Step 3: Get the current hours from the object
    const currentHours = dateObject.getHours()
  
    // Step 4: Add the offset to the date object
    dateObject.setHours(currentHours + offset)
  
    // Step 5: stringify the date object, replace the T with a space and slice off the seconds.
    const newDateString = dateObject
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19)
  
    // Step 6: Return the new formatted date string with the added offset
    return `${newDateString}`
  }


  export const convertUtcDateIntoLocalTime = (UtcTimeString) => {
    if(UtcTimeString=='') return 'NONE'

    var mDate = new Date();
    var offset= mDate.getTimezoneOffset() / 60;
    var offsetReverse=offset*-1
    console.log('time: ',UtcTimeString);
    const dateObject = new Date('0000-01-01T'+UtcTimeString)
  
    // Step 3: Get the current hours from the object
    const currentHours = dateObject.getHours()
  
    // Step 4: Add the offset to the date object
    dateObject.setHours(currentHours + offsetReverse)
  
    // Step 5: stringify the date object, replace the T with a space and slice off the seconds.
    const newDateString = dateObject
      .toISOString()
      .replace('T', ' ')
      .slice(11, 19)
  
    // Step 6: Return the new formatted date string with the added offset
    return `${newDateString}`
  }


  export const convertUtcDateIntoLocalDate = (UtcDateString) => {
    if(UtcDateString=='') return 'NONE'
    
    var mDate = new Date();
    var offset= mDate.getTimezoneOffset() / 60;
    var offsetReverse=offset*-1
    console.log('date: ',UtcDateString);
    const dateObject = new Date(UtcDateString)
  
    // Step 3: Get the current hours from the object
    const currentHours = dateObject.getHours()
  
    // Step 4: Add the offset to the date object
    dateObject.setHours(currentHours + offsetReverse)
  
    // Step 5: stringify the date object, replace the T with a space and slice off the seconds.
    const newDateString = dateObject
      .toISOString()
      .replace('T', ' ')
      .slice(0, 10)
  
    // Step 6: Return the new formatted date string with the added offset
    return `${newDateString}`
  }
