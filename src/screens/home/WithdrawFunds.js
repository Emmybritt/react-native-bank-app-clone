import { Text, Image, TextInput, StyleSheet, View } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles"; 
import Button from "../../component/Button";
import CustomButton from "../../common/button/Index";

const WithdrawFunds = () => {
      return (
            <View style={ styles.container }>
                  
                  <View style={ styles.containerSecondary }>
                        <View style={styles.main}>
                              <Image style={ styles.image } source={require('../../../assets/images/bank.png')} />
                              <Text style={ styles.subheading }>Withdraw to Bank Account</Text>
                        </View>

                        <View style={ styles.inputContainer }>

                        <TextInput style={ styles.input }
                              placeholder="Account **********657"
                        
                        />
                        <TextInput
                                    placeholder="Select Bank"
                                    style={ styles.input }
                        
                        />
                        <TextInput
                                    placeholder="Amount"
                                    style={ styles.input }
                       />

                        </View>  
                        
                        {/* <Button text='Withdraw'/> */}
                        <CustomButton title='Withdraw'/>

                  </View>
            </View>
      )
}

const styles = StyleSheet.create({
      container: {
            backgroundColor: COLORS.background,
            height:'100%'            
      },
      containerSecondary: {
            backgroundColor: COLORS.background,

            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            // marginTop: -24 ,
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
      },
      subheading: {
          
            color: COLORS.black,
            fontWeight: 'bold',
      },
      image: {
           marginRight:16
      },
      main: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop:'10%',
            marginHorizontal:32,
         

      },
      icon: {
            width: 11,
            height: 11,
            marginHorizontal: 32,
            marginTop:5
      }

})

export default WithdrawFunds;