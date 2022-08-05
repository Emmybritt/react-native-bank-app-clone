import { View, Text, TextInput, StyleSheet } from 'react-native'
import Button from '../../component/Button'
import { COLORS } from '../../helpers/theme/constantstyles'
import { useState } from 'react'

import axiosInstance from '../../helpers/axios/axiosInterceptor'
import {resetPassword} from '../../helpers/utils/Apiroutes/ServerRoutes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../common/button/Index'

const CreateNewPassword = () => {

  const [password , setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [confirmPassword , setConfirmPassword] = useState('')

  const getPassword = (value)=>{
    setPassword(value)

  }

  const getConfirmPassword = (value) =>{
    setConfirmPassword(value)
  }


  const navigation = useNavigation()

  const recreatePassword = async ()=>{
    setLoading(true);

    try {


      const resetToken = await AsyncStorage.getItem('resetToken')
      const userMail = await AsyncStorage.getItem('forgottenPassswordMail')

      console.log(resetToken , userMail , password, confirmPassword)


      const resetData = {email: userMail , code: resetToken, newPassword: password, confirmNewPassword: confirmPassword}

      console.log('resetData', resetData);


      const res = await axiosInstance.post(`${resetPassword}`, resetData)

      console.log(res.data)

      if(res.data.status){

        alert('You have successfully changed your password') ;
        navigation.navigate('welcome back');
        setLoading(false);

      }

      else if(!res.data.status){ alert('Check your password fields and try again')}

    }
    catch (error){
      alert('There was an error, check your network and try again')
      setLoading(false);
    }
  }

  return (
    <View style ={styles.container}>

      <Text style={styles.text}>Create a new Password</Text>

      <View style={styles.containerPrimary}>
        <TextInput placeholder='Enter New Password'  autoCapitalize='none' style={styles.input} placeholderTextColor='grey' value={password} onChangeText={(value)=> getPassword(value)} secureTextEntry/>

        <TextInput placeholder='Confirm New Password'  autoCapitalize='none' style={styles.input} placeholderTextColor='grey' value={confirmPassword} onChangeText={(value)=> getConfirmPassword(value)} secureTextEntry/>

        {/* <Button text='Create New Password' onPress={recreatePassword} /> */}
        <CustomButton onPress={recreatePassword} title={loading ? 'Please wait...' : "Create new Password"} />


      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{

    backgroundColor: COLORS.darkGreen,
    height: "100%",
    width: "100%",
    paddingHorizontal:48,
    paddingTop:'50%',
    // borderWidth:10,
    // borderColor:COLORS.primary

  },
  text:{
    color: COLORS.white,
    fontSize:32,
    fontWeight:'500',
    marginBottom:'20%'

  },
  containerPrimary:{
    

  },
  input:{

    backgroundColor: 'rgba(0,0,0,.52)',
    borderRadius: 40,
    height: 40,
    color: COLORS.white,
    paddingLeft:32,
    marginBottom:'10%',
    height: 46,

  }

})

export default CreateNewPassword;