

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'



export default class MainHome extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentWillMount() {
      
    }

    render() {
    	return (
			<Text style={{color : 'black'}}>
            	SET ME to The MAinHOme
        	</Text>
    	);
	}

    
}

