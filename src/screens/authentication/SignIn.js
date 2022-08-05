import { Text, View, Pressable, TextInput , ActivityIndicator , ScrollView} from 'react-native'
import {useState} from 'react'
import Button from '../../component/Button'
import styles from '../../styles/authetication/signin'
import { newDeviceSignIn } from '../../helpers/utils/Apiroutes/ServerRoutes'
import { useNavigation } from '@react-navigation/native'
import { isValidEmail } from '../../helpers/utils/functions/helperFunctions'

import axios from 'axios'
import axiosInstance from '../../helpers/axios/axiosInterceptor'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'

const SignIn = () => {

      const isLoading = useSelector((state) => state.user.isLoading);
      const token = useSelector((state) => state.user.token);

      

      const navigation = useNavigation()

      const [username, setUserName] = useState('')
      const [password, setPassword] = useState('')
      const [loading , setLoading] = useState(false)
      const [isDisabled , setIsDisabled] = useState(true)
      const [mailError , setMailError] = useState(false)
      
      const getUsername = (value) => {
            setUserName(value)
            
      }

      const getPassword = (value) => {
            setPassword(value)
      }

      const checkValidMail = ()=>{

            if(!isValidEmail(username)){
                  setMailError(true)

            }
      }

      const userData = { username, password }
      
      const pushUserInfoToServer = async () => {
          
            try {

                  AsyncStorage.removeItem('profile')


                  console.log(userData)

                  setLoading(true)

                  const res = await axiosInstance.post(`${newDeviceSignIn}`, userData)
                  console.log(res)
                  

                  if(res.data.status){
                        await AsyncStorage.setItem('signinMail' , username)
                        setLoading(false)
                        navigation.navigate('verify mail')
                       

                  }
                  if(!res.data.status){
                        setLoading(false)
                        alert("Can't sign you in at this time , try again")
                  }
            }
            catch (error) {
                  console.log(error)
                  setLoading(false)
            }
      }

      const checkValidField = ()=>{

            if(username && password){
                  setIsDisabled(false)
            }
      }

      return (
            <ScrollView style={styles.container}>
                  <Text style ={styles.heading}>Sign In</Text>

                  <View>
                        <Text style={styles.text}>Enter Email</Text>
                        <TextInput style={styles.input}
                              value={username}
                              onChangeText= {(value) => {getUsername(value); setMailError(false)} }
                              autoCapitalize='none'
                              onEndEditing={()=>{checkValidMail()}}
                        
                        />
                        {mailError ? <Text style={{color:'#eb3464'}}>Incorrect mail</Text> : null}
                        <Text style={styles.text}>Enter Password</Text>
                      
                        <TextInput style={styles.input}
                              autoCapitalize='none'
                              value={password}
                              onChangeText={(value)=> getPassword(value)}
                              secureTextEntry
                              editable={username ? true : false}
                        />
                        <Text style={styles.password} onPress={()=> navigation.navigate('forget password')} >Forgot Password?</Text>
                        <Text style={styles.password} onPress={()=> navigation.navigate('TestForm')} >Test form</Text>
                  </View>
                  <ActivityIndicator animating={loading} size='small' color='white' />
                  <Button text='Sign In'  onPress={pushUserInfoToServer}  disabled={password ? false : true} />
                  <Text style={styles.footerText}>Don't have an account? <Text onPress={()=>{
                        navigation.navigate('Onboard')
                  }} style={styles.cta}>Sign Up {isLoading ? 'loading' : 'not loading'}</Text></Text>
            </ScrollView>
      )
}

export default SignIn;