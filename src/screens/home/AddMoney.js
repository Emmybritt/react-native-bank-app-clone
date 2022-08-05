import { View, Text, TextInput, StyleSheet , StatusBar } from 'react-native';
import React from 'react'
import Button from '../../component/Button';
import { COLORS } from '../../helpers/theme/constantstyles';


const AddMoney = () => {

      return (
            
            <View style={styles.container}>
                  <StatusBar/>
                 

                  <View style={styles.containerSecondary}>
                        <TextInput
                              placeholder='Enter Amount'
                              style={styles.input}
                        
                        />
                        <Text style={styles.text}>Minimum for this transaction is #100</Text>

                        <Button text='Proceed' name='card details'/>
                        <Text style={styles.footertext}>Secured by interswitch </Text>

                  </View>

            </View>
      )
}

const styles = StyleSheet.create({
      container: {
            backgroundColor: COLORS.background,
            height:'100%'
            
      },
      containerPrimary: {
            backgroundColor: COLORS.primary,
            height: '10%',

      },
      containerSecondary: {
            backgroundColor: COLORS.background,
            height: '60%',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            marginTop: -24 ,
            paddingHorizontal: '10%',
            paddingTop:'5%'
      },
   
      input: {
            borderWidth: 1.5,
            borderBottomColor: COLORS.black,
            marginTop: '15%',
            borderColor: COLORS.background,
            paddingVertical: 8,
            paddingHorizontal: '50%',
            marginBottom:8    
      },
      heading: {
            textAlign: 'center',
            color: 'white',
            marginTop:16
          
      },
      main: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop:32,
            marginHorizontal:32,
          
      },
      icon: {
            width: 12,
            height: 12,
            position: 'absolute',
            left: '10%',
            top:'25%'
         
      },
      text: {
            marginBottom:'15%'
      },
      footertext: {
            textAlign: 'center',
            marginTop:8
      }

})

export default AddMoney;