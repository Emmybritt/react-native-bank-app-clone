import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import styles from '../../styles/others/phoneverification';
import Button from '../../component/Button';
import CustomButton from '../../common/button/Index';

const PhoneVerification = () => {
      return (
            <View style={styles.container}>
                
                  <View style={styles.imageContainer}>

                    <Image style={styles.image} source={require('../../../assets/images/phone.png')} />

                  </View>
              
                  
                  <Text style={styles.header}>Phone Verification</Text>

                  <View style={styles.containerInput}>
                        <TextInput style={styles.input} />
                        <TextInput style={styles.input} />
                        <TextInput style={styles.input} />
                        <TextInput style={ styles.input}/>
                  </View>

                  <Text style={styles.subheading}>To verify your phone , enter 4 digit pin , sent to your phone number</Text>

                  {/* <Button text='Verify Phone Number' /> */}
                  <CustomButton text='Verify Phone Number'/>
                  
                  <Text style={styles.footerText}>Already have an account?</Text>

            </View>
      )
}

export default PhoneVerification;