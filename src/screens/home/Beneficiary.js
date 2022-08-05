import { View, Image, Text, StyleSheet } from 'react-native';
import Button from '../../component/Button';
import React from 'react'
import { COLORS ,SIZES } from '../../helpers/theme/constantstyles';

const Beneficiary = () => {
      return (
            <View style={styles.container} >
                  <View style={styles.containerPrimary}>
                        <Image style={styles.image} source={require('../../../assets/images/Check.png')} />
                        <Text style={styles.heading}>Beneficiary Added</Text>
                        <Text style={styles.paragraph}>New Beneficiary is added successfully , All details of the new beneficiary are sent to your registered mail id. You can send money now.</Text>
                        <Button text='Transfer Now'/>

                  </View>
            </View>
            
      )
}

const styles = StyleSheet.create({
      container: {
            backgroundColor: 'rgb(245, 243 ,243)',
            height:"100%"
            
      },
      containerPrimary: {
            backgroundColor: '#E7EFF2',
            marginTop: '30%',
            borderRadius:32,
            paddingHorizontal: 32,
            paddingVertical: 80,
            marginHorizontal: 8,
            justifyContent:"center"
            
      },
      heading: {
            fontWeight: '600',
            marginVertical: 16,
            textAlign: 'center',
            color: COLORS.primary,
            fontSize:SIZES.h2
            
      },
      paragraph: {
            textAlign: 'center',
            color: COLORS.primary, 
            paddingBottom:48
      },
      image: {
            height: 90,
            width: 90,
            marginHorizontal: 'auto',
            alignSelf:"center"
      }

})

export default Beneficiary;