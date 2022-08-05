import { View, Text , StyleSheet, Image , TextInput } from 'react-native'
import Button from '../../component/Button'
import { COLORS } from '../../helpers/theme/constantstyles'
import { useState, useRef } from 'react'

import axiosInstance from '../../helpers/axios/axiosInterceptor'
import { useNavigation } from '@react-navigation/native'

import { verifyPasswordReset  } from '../../helpers/utils/Apiroutes/ServerRoutes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../../common/button/Index'

const MailPassword = () => {


  const[active1 , setActive1] = useState(false)
  const[active2 , setActive2] = useState(false)
  const[active3 , setActive3] = useState(false)
  const[active4 , setActive4] = useState(false)
  const[active5 , setActive5] = useState(false)
  const[active6 , setActive6] = useState(false)

  const [value1 , setValue1] = useState()
  const [value2 , setValue2] = useState()
  const [value3 , setValue3] = useState()
  const [value4 , setValue4] = useState()
  const [value5 , setValue5] = useState()
  const [value6 , setValue6] = useState()

  const input_2 = useRef(null)
  const input_3 = useRef(null)
  const input_4 = useRef(null)
  const input_5 = useRef(null)
  const input_6 = useRef(null)

  const getValue1 = (value)=>{
    setValue1(value)
    
  }
  const getValue2 = (value)=>{
    setValue2(value)
    
  }
  const getValue3 = (value)=>{
    setValue3(value)
    
  }
  const getValue4 = (value)=>{
    setValue4(value)
    
  }
  const getValue5 = (value)=>{
    setValue5(value)
    
  }
  const getValue6 = (value)=>{
    setValue6(value)
    
  }



  const navigation = useNavigation()

  const resetToken = `${value1}${value2}${value3}${value4}${value5}${value6}`

  

  const verifyPin = async ()=>{

    const mail = await AsyncStorage.getItem('forgottenPassswordMail')
    await AsyncStorage.setItem('resetToken' , resetToken)


    try {

      


     
       const res = await axiosInstance.get(`${verifyPasswordReset}/${mail}/${resetToken}`)

       
      

       if(res.data.status){
         navigation.navigate('create new password')
        }
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <View style={styles.container}>

      <View style={styles.containerPrimary}>

        <Image style={styles.image} source ={require('../../../assets/images/email.png')}/>
        <Text  style={styles.heading}>Check your email</Text>

        <View style={styles.inputContainer}>
          <TextInput style={[styles.input, { borderColor:(active1 ? COLORS.focus : COLORS.inputBorder)}]} maxLength={1} secureTextEntry keyboardType='numeric' caretHidden={true} onFocus={() => setActive1(true)} onEndEditing={()=> setActive1(false)}  onChangeText={(value) => { getValue1(value); if(value) {input_2.current.focus() }}}/>

          <TextInput style={[styles.input, { borderColor:(active2 ? COLORS.focus : COLORS.inputBorder)}]}maxLength={1} secureTextEntry keyboardType='numeric' caretHidden={true} onFocus={() => setActive2(true)} onEndEditing={()=> setActive2(false)}   ref={input_2} onChangeText={(value) => { getValue2(value); 
          if(value) {input_3.current.focus() }}}/>

          <TextInput style={[styles.input, { borderColor:(active3 ? COLORS.focus : COLORS.inputBorder)}]} maxLength={1} secureTextEntry keyboardType='numeric' caretHidden={true} onFocus={() => setActive3(true)} onEndEditing={()=> setActive3(false)}  ref={input_3} onChangeText={(value) => { getValue3(value); 
          if(value) {input_4.current.focus() }}}/>

          <TextInput style={[styles.input, { borderColor:(active4 ? COLORS.focus : COLORS.inputBorder)}]} maxLength={1} secureTextEntry keyboardType='numeric' caretHidden={true} onFocus={() => setActive4(true)} onEndEditing={()=> setActive4(false)} ref={input_4} onChangeText={(value) => { getValue4(value); if(value){input_5.current.focus()} }}/>

          <TextInput value={value5} onChangeText={(value)=> {getValue5(value);  if(value){input_6.current.focus()}}} onEndEditing={()=> setActive5(false)} onFocus={()=> setActive5(true)} ref={input_5} style={[styles.input, {borderColor: (active5 ? COLORS.focus : COLORS.inputBorder )}]} secureTextEntry maxLength={1} caretHidden={true}/>

         <TextInput value={value6} onChangeText={(value)=> getValue6(value)} onEndEditing={()=> setActive6(false)} onFocus={()=> setActive6(true)} ref={input_6} style={[styles.input, {borderColor: (active6 ? COLORS.focus : COLORS.inputBorder )}]} secureTextEntry maxLength={1} caretHidden={true}/>

        </View>

        <Text style={styles.footerText}>Enter the 6 digit pin sent to your email to create a new password</Text>

        {/* <Button text='Continue' onPress={verifyPin}/> */}
        <CustomButton title="Continue" onPress={verifyPin}/>


      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    backgroundColor: COLORS.darkGreen,
    height:'100%',
    paddingHorizontal:'15%'

  },
  containerPrimary:{
    display: 'flex',
    justifyContent:'center',
    paddingTop:'60%'



  },
  heading:{
    textAlign:'center',
    color: COLORS.headingGrey,
    fontSize:24,
    fontWeight:'400',
    marginVertical:'15%'

  },
  inputContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'

  },
  footerText:{
    textAlign:'center',
    color:COLORS.headingGrey,
    marginTop:'10%',
   fontSize:18,
   marginBottom:'20%'

  },
  image:{
    alignSelf:'center'

  },
  input:{
    width:'8%',
    height:30,
    borderWidth:2,
    marginHorizontal:'3%',
    paddingLeft:'2%',
    color:"white"

  }

})
export default MailPassword