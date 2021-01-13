import React, { Component } from 'react';
import {colors} from '../styles';
import {
  StyleSheet,Modal,View,
  ActivityIndicator
} from 'react-native';

const Loader = props => {
  const {loading} = props;

  return (
    <ActivityIndicator  size="large" 
                    style={styles.spinnerStyle}
                    color={colors.WHITE}
                    animating={loading}
                />
  )
}

const styles = StyleSheet.create({

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

export default Loader;