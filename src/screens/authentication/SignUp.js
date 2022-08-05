import { View,ScrollView, Text, TextInput, Pressable , ActivityIndicator, Image } from "react-native"
 import { useState , useEffect } from 'react'
 import styles from '../../styles/authetication/signup'


import Button from "../../component/Button";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { OnboardingNavigation } from "../../helpers/OnboardingNavigation/OnboardingNavigation";
import Input from "../../common/input/Index";


const isValidEmail = (value) => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
      
      return regex.test(value);

}

 const SignUp = () => {

      const navigation = useNavigation()

      // const [typePassword, setPasswordType] = useState(false);
      const [isSecured, setSecured] = useState(true);  

      const getSecureEntry = () => {
            setPasswordType(prev => !prev);
      }

      const [formData, setFormData] = useState({});
      const [formErrors, setformErros] = useState({});

      const onChange = ({name, value}) => {
            setFormData({...formData, [name]: value})
            console.log(formData);
      }

 

      

      const [email, setMail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmpassword, setConfirmPassword] = useState('')
      const [mailError, setMailError] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const [confirmPasswordError , setConfirmPasswordError] = useState('')
      const [loading , setLoading] = useState(false)
      const [visible , setVisible] = useState(false)
      const [errorMsg , setErrorMsg] = useState('')
      
      
    
      const revealMailError = (mailError, showError) => {
            showError(mailError);    
      }

      const revealPasswordError = (passwordError, showError) => {
            showError(passwordError);
            
      }

      const revealConfirmPasswordError = (confirmPasswordError, showError) => {
            showError(confirmPasswordError)
            
      }
      
      const onMailChange = (value) => {
            setMail(value);              
      }

      const checkValidMail = () => {
            if (!isValidEmail(email)) return revealMailError("Enter a valid email" , setMailError)
      }

      const checkValidPassword = () => {
            
            if(password.length < 6) return revealPasswordError('Password is less than 6 characters', setPasswordError)
      }

      const checkValidConfirmPassword = () => {
            
            if (password !== confirmpassword) return revealConfirmPasswordError("Password doesn't match", setConfirmPasswordError);
            
      } 

      const onPasswordChange = (value) => {
            setPassword(value);
      }

      const onConfirmPasswordChange = (value) => {
            setConfirmPassword(value);
                  
      }


      const storeAccessToken = async (value, token) => {
            try {
                  
                  await AsyncStorage.setItem('response', JSON.stringify(value))
               
                  await AsyncStorage.setItem('token' , token)

                  
            }
            catch (error) {
                  alert(error)
            }
      }

      const storeRefreshToken = async(value)=>{

            try{
                  await AsyncStorage.setItem('refreshToken', value)
            }
            catch(error){
                  alert(error)
            }
      }


     
      const userInfo = { email, password, confirmpassword }

    

      const pushUserInfoToServer = async () => {

           
         
                  try {
                        setLoading(true)
                        setVisible(false)
                        const res = await axiosInstance.post('api/Auth/sign-up', userInfo)
                      
                         const data = await res.data
                        console.log(data)

                        if (data.status) {
                              navigation.navigate('Wallet Details');

                              setLoading(false);
                           

                           storeAccessToken(data.result[0], data.result[0].token)
                           storeRefreshToken(data.result[0].refresh_token)
                 
 
                        } 

                        if(!res.data.status){
                              setVisible(true)
                            
                           
                              alert('Username is already taken ')
                              setLoading(false)

                        }
                      
 
                    
                  }
                  catch (error) {
                        setLoading(false)
                         console.log(error)
                         alert('check your password fields or network and try again')
                        if(error){
                              setVisible(true);
                        }
                        setLoading(false)
                  }
      } 

            return (
                  <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                        <Text style={styles.heading}>Create Your Digital Wallet Account</Text>

                        <View>
                       
                              <Text style={styles.text}>Enter Your Email</Text>
                              <TextInput
                                    style={styles.input}
                                    autoCapitalize='none'
                                    keyboardType={"email-address"}
                                    value={email}
                                    placeholderTextColor='white'
                                    onChangeText={(value) => { onMailChange(value);}}
                                    onEndEditing={()=> {checkValidMail()}}
                              />

                               {mailError ? <Text style={styles.warning}>{ mailError}</Text> : null} 
                              <Text style={styles.text} >Create Password</Text>

                              <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    value={password}
                                    autoCapitalize='none'
                                    placeholderTextColor='white'
                                    onChangeText={(value) => { onPasswordChange(value) }}
                                    onEndEditing={()=> {checkValidPassword()}}
                          
                              />
                        
                              {passwordError ? <Text style={styles.warning}>{passwordError}</Text> : null}
                              
                              <Text style={styles.text}>Confirm Password</Text>

                              <TextInput
                                    style={styles.input}
                                     autoCapitalize='none'
                                    secureTextEntry={true}
                                    value={confirmpassword}
                                    placeholderTextColor='white'
                                    onChangeText={(value) => { onConfirmPasswordChange(value) }}
                                    onEndEditing={()=> {checkValidConfirmPassword()}}
                       
                              />
                  
                              
                              {confirmPasswordError ? <Text style={styles.warning}>
                                    { confirmPasswordError}</Text> : null}


                                    

                              <Text style={styles.text}>
                                    By creating an account you agrre to our Terms of Service and Privacy
                              </Text>
                        </View>

                        <ActivityIndicator animating={loading} color='white' style={styles.loader} size='small' />

                        {/* <ModalPopUp visible={visible} text={errorMsg}/> */}

                        <Button text='Sign Up' onPress={pushUserInfoToServer}></Button>

                        <Text style={styles.text}>Already have an account? <Text onPress={()=>{
                              navigation.navigate('SignIn')
                        }} style={styles.cta}>Sign In</Text></Text>

                  </ScrollView>

            )
           
      }

 export default SignUp;