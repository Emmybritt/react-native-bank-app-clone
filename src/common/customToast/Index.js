import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../helpers/theme/constantstyles'

const CustomToast = ({style, message, icon}) => {
  return (
    <View style={[styles.ToastContainer, style]}>
      <Text style={styles.toastText}>{message ? message : 'Custom toast'}</Text>
      <TouchableOpacity>
        <Text style={styles.icon}>{icon && icon}</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  ToastContainer: {
    flexDirection:'row',
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 10,
    paddingLeft:20,
    paddingRight: 22,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center'
  },
  toastText: {
    color: COLORS.white,
    fontWeight: "500",
    marginRight:10,
  },
  
})

export default CustomToast