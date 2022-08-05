import { Text, TextInput, StyleSheet, View } from "react-native";

import Button from "../../component/Button";
import { COLORS, SIZES } from "../../helpers/theme/constantstyles";

const Card = () => {
      return (
            <View style={ styles.container }>
                  {/* <View style={ styles.containerPrimary }>
                        <Image style={styles.icon} source={require('../assets/images/arrow.png')}/>
                        <Text style={ styles.heading } >Add Money from Card</Text>

                  </View> */}
                  
                  <View style={ styles.containerSecondary }>
                        <View style={styles.main}>
                              <Text style={ styles.subheading }>Enter Card Details </Text>
                        </View>

                        <View style={ styles.inputContainer }>

                        <TextInput style={ styles.input }
                              placeholder="Card Number"
                        
                        />
                        <TextInput
                                    placeholder="Expiration Date"
                                    style={ styles.input }
                        
                        />
                        <TextInput
                                    placeholder="CVV"
                                    style={ styles.input }
                              />
                                 <TextInput
                                    placeholder="PIN"
                                    style={ styles.input }
                       />


                        </View>  
                        
                        <Button text='Add Money' name='otp' />
                        <Text style={{marginTop:8, textAlign:'center'}}>Secured by Interswitch</Text>

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
            backgroundColor: '#F8F8F8',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            marginTop: -24 ,
            paddingHorizontal:'10%'
      },
      inputContainer: {
            marginTop: "2%",
            marginBottom:'10%'
      },
      input: {
            borderWidth: 1.5,
            borderBottomColor: 'black',
            marginVertical: 16,
            borderColor: COLORS.background,
            paddingVertical: 8,
            paddingHorizontal: 16,
            
      },
      heading: {
            textAlign: 'center',
            color: 'white',   
            marginTop:16
      },
      subheading: {
          
            color: COLORS.white,
            fontWeight: 'bold',
            
      },
      image: {
       
      },
      main: {
           
            justifyContent: 'flex-start',     
            marginTop:16,
      
      },
      icon: {
            left: '10%',
            top:'20%',
            position:"absolute"
      }

})

export default Card;