import { View, Text , TextInput} from 'react-native'
import Button from '../../component/Button'
import styles from '../../styles/others/resetpassword'

import {useState , useRef} from 'react'
import { COLORS } from '../../helpers/theme/constantstyles'

const ResetPassword = () => {

  const [active1, setActive1] = useState(false)
  const [active2 , setActive2] = useState(false)
  const [active3 , setActive3] = useState(false)
  const [active4, setActive4] = useState(false)

  
  const [value1, setValue1] = useState('')
  const[value2 , setValue2] = useState('')
  const[value3 , setValue3] = useState('')
  const [value4, setValue4] = useState('')

  const input_1 = useRef(null)
  const input_2 = useRef(null)
  const input_3 = useRef(null)
  const input_4 = useRef(null)

  const getValue1 = (value) => {
    setValue1(value)
    
  }  

  const getValue2 = (value) => { 
     setValue2(value)
    
  }

  const getValue3 = (value) => {
    setValue3(value)
    
  }

  const getValue4 = (value) => {
    setValue4(value)
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <Text>To Reset your Password, enter the 4 digit OTP sent to your mobile number.</Text>

        <View style={styles.inputContainer}>

          <TextInput  style={ [styles.input , {borderColor:(active1 ? COLORS.primary : COLORS.inputBorder )}] } maxLength={1} keyboardType='number-pad' onFocus={() => setActive1(true)}
          onEndEditing={()=> setActive1(false)}   ref={input_1}
          onChangeText={(value) => { getValue1(value); 
          if(value) {input_2.current.focus() }}} caretHidden={true}/>

          <TextInput style={ [styles.input , {borderColor:(active2 ? COLORS.primary : COLORS.inputBorder )}] } maxLength={1} keyboardType='number-pad' onFocus={() => setActive2(true)}
          onEndEditing={()=> setActive2(false)}   ref={input_2}
          onChangeText={(value) => { getValue2(value); 
              if(value) {input_3.current.focus() }}} caretHidden={true}/>

          <TextInput style={ [styles.input , {borderColor:(active3 ? COLORS.primary : COLORS.inputBorder )}] }maxLength={1} keyboardType='number-pad' onFocus={() => setActive3(true)}
          onEndEditing={()=> setActive3(false)}   ref={input_3}
          onChangeText={(value) => { getValue3(value); 
              if(value) {input_4.current.focus() }}} caretHidden={true}/>

          <TextInput style={ [styles.input , {borderColor:(active4 ? COLORS.primary : COLORS.inputBorder )}] } maxLength={1} keyboardType='number-pad' onFocus={() => setActive4(true)}
          onEndEditing={()=> setActive4(false)}  onChangeText={(value) => { getValue4(value) }} ref={input_4} caretHidden={true}/>

        </View>

        <Text style={styles.text}>Didn't get an email? <Text style={{fontWeight:'bold'}}>Resend</Text></Text>

        <View style={styles.buttonContainer}><Button text='Next'/></View>
      </View>
    </View>
  )
}

export default ResetPassword;