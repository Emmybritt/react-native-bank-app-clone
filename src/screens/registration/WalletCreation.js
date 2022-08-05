import { View, Text, TextInput, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../../component/Button';
import { COLORS , SIZES } from '../../helpers/theme/constantstyles';
import { useState , useEffect} from 'react';
import { createWalletPath } from '../../helpers/utils/Apiroutes/ServerRoutes';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import axiosInstance from '../../helpers/axios/axiosInterceptor';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';





const WalletDetails = () => {

      


      const [phoneNumber, setPhoneNumber] = useState('');
      const [firstName, setFirstNme] = useState('');
      const [lastName, setLastName] = useState('');
      const [fnameError , setFnameError] = useState('')
      const [phoneError, setPhoneError] = useState('')
      const [loading , setLoading] = useState(false)
      const [visible , setVisible] = useState(false)
      const [errorMsg , setErrorMsg] = useState('')
      const [dateVisible , setDateVisible] = useState(false)
      const [dateOfBirth ,setDateOfBirth] = useState()
      const [middleName , setMiddleName] = useState('')
      
      const errorHandler = (error, setError) => {
            setError(error)
            
      }

      const onPhoneChange = (value) => {

         const num = parseInt(value)
         const parsedNumber = `+234${num}`

         setPhoneNumber(parsedNumber)

      }

      const onFirstNameChange = (value) => {
            
            setFirstNme(value)
            
      }

      const onLastNameChange = (value) => {
            
            setLastName(value)
      }

      const isNameInvalid = (value) => {
            if( value == '' ) return errorHandler('Field must not be empty', setFnameError)
      }

      const checkNumber = () => {
            if(phoneNumber.length < 10) return errorHandler('Enter a valid number' , setPhoneError)
      }

      const userData = { firstName, lastName, phoneNumber,dateOfBirth , middleName}
      
      const navigation = useNavigation()

      const pushDetailsToServer = async () => { 

            try { 
                  setLoading(true)
                  setVisible(false)

                  // Getting the access token 
                  const token = await AsyncStorage.getItem('token')

                  console.log(userData)
               

            //      Storing the user details
                  await AsyncStorage.setItem('userData' , JSON.stringify(userData))
                  
                  const res = await axiosInstance.post(`${createWalletPath}`, userData, {
                        headers: {
                              'Authorization' : `Bearer ${token}`
                        }
                  })
                  
                  if( res.data.status){navigation.navigate('verify number')} 
                  else if(!res.data.status){ alert('Phone number has been used');setLoading(false)}

          

                 setErrorMsg(res.data.error_message)
            }

            catch (error) {
                  console.log(error)
                  setLoading(false)
                 if(error){
                       
                     setVisible(true);

                  }
                 
               
            }

      }

      useEffect(()=>{
            if(!visible){
                  setVisible(false)
            }
            else{
                  setVisible(true)
            }
      }, [visible])

      const showDatePicker = () => {
            setDateVisible(true);
          };
        
      const hideDatePicker = () => {
            setDateVisible(false);
          };

       
      return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Create Your Digital Wallet</Text>

            <View>

                  <View>
                  <Text style={styles.text}>First Name</Text>
                  <TextInput
                        style={styles.input}
                       
                        autoCapitalize='none'
                        value={firstName}
                              placeholderTextColor='white'
                              onChangeText={(value) => { onFirstNameChange(value) }}
                              
                         onEndEditing={()=> {isNameInvalid()}}
                  />
                  </View>
           
                 

                    {fnameError ? <Text style={styles.warning}>{ fnameError}</Text> : null} 

                  <View>
                  <Text style={styles.text} >Surname</Text>

                  <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  value={lastName}
                  placeholderTextColor='white'
                  onChangeText={(value) => { onLastNameChange(value) }}
                  onEndEditing={()=> {isNameInvalid()}}
                  editable={firstName ? true : false}

                   />

                  </View>  

                  <View>

                  <Text style={styles.text}>Middle Name</Text>

                  <TextInput
                  style={styles.input}
                  value={middleName}
                  onChangeText={(value)=>{
                        setMiddleName(value)

                  }}
                  editable={lastName ? true : false}

                  />

                  </View>
             
                  
                  

                  <View >
                  <Text style={styles.text}>Phone Number</Text>
                        <Text style={{color:'grey', position:'absolute', zIndex:1, top:'66%', fontSize:16, left:10 ,}}>+234</Text>

                  <TextInput
                             
                        style={[styles.input, {paddingLeft:60, position:'relative'}]}

                        autoCapitalize='none'
                        placeholderTextColor='white'
                        onChangeText={(value) => { onPhoneChange(value) }}
                        onEndEditing={()=> {checkNumber()}}
                        keyboardType='number-pad'
                        editable={lastName ? true : false}
                        maxLength={11}

                  />
                   {phoneError ? <Text style={styles.warning}>{ phoneError}</Text> : null} 

                  </View>

                  <View >

                  <Text style={styles.text}>Date of Birth</Text>


                  <TouchableOpacity>
                  <TextInput
                  style={styles.input}
                  editable={false}
                  onPressIn={()=> showDatePicker()}
                  value={ dateOfBirth ? dateOfBirth.toLocaleDateString() : ''}
                  onMagicTap={()=> setDateVisible(true)}

                  />
                      <DateTimePickerModal
                    isVisible={dateVisible}
                    mode="date"
                    onConfirm={(date)=>{setDateOfBirth(date);
                        setDateVisible(false);
                       

                  }}
                   onCancel={()=> hideDatePicker()}
                  
                   />
                   </TouchableOpacity>
                 

                        
                  </View>

            


                 
                  <Text style={styles.text}>
                        By creating a wallet you agree to our Terms of Service and Privacy
                  </Text>
            </View>
          

            <ActivityIndicator animating={loading} style={{position:'absolute', top:'95%', zIndex:1, left:'70%'}} size='small' />
            <Button text='Next' onPress={pushDetailsToServer} disabled={phoneNumber && lastName && dateOfBirth ? false : true} ></Button>

      </ScrollView>
            
      )
}


const styles = StyleSheet.create({
      input: {
            backgroundColor: 'rgba(0,0,0,.52)',
            borderRadius: 40,
            height: 40,
            color: COLORS.white,
            paddingLeft: 20,
            fontSize:16

      },
      heading: {
            textAlign: "center",
            fontWeight: '400',
            color: 'white',
            fontSize: SIZES.h1,
            marginTop: '20%', 
            marginBottom: '5%'

      },
      container: {
            backgroundColor: "rgb(43, 105, 106)",
            height: "100%",
            width: "100%",
            paddingHorizontal:48,
            paddingBottom:'10%'
      },
      text: {
            color: 'rgba(255, 255 ,255 ,.66)',
            marginVertical:16
      },
      cta: {
            color:COLORS.white
      },
      warning: {
            color:'#eb3464',
            position:"absolute",
            top:'100%',
            fontSize:10
      },
      loader:{
            position:'absolute',
            top:'87%',
            left:'70%',
            zIndex:1
      }
})

export default WalletDetails;