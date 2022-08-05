import { View, Text  , Pressable, TouchableOpacity} from 'react-native'
import Button from '../../component/Button'
import styles from '../../styles/others/changepassword'
 import {TextInput} from 'react-native-paper'
 import { useState } from 'react'
import { COLORS } from '../../helpers/theme/constantstyles'
import axiosInstance from '../../helpers/axios/axiosInterceptor'
import { changePin } from '../../helpers/utils/Apiroutes/ServerRoutes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../../common/button/Index'
import { useNavigation } from '@react-navigation/native'
import Input from '../../common/input/Index'
import { Ionicons } from '@expo/vector-icons'

const ChangePIN = () => {

  const [passwordVisible1 , setPasswordVisible1] = useState(true)
  const [passwordVisible2 , setPasswordVisible2] = useState(true)
  const [passwordVisible3 , setPasswordVisible3] = useState(true)
  const [loading, setLoading] = useState(false);

  const [oldPin , setOldPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin , setConfirmPin] = useState('');
  const navigation = useNavigation();

  const getOldPin = (value)=>{
    setOldPin(value)

  }

  const getNewPin = (value)=>{
    setNewPin(value)

  }

  const getConfirmPin = (value)=>{
    setConfirmPin(value)

  }

  const pinInfo = {oldPin , newPin , confirmPin}
  

  const updatePin = async ()=>{

    if (pinInfo.confirmPin) {
      setLoading(true)
    const token = await AsyncStorage.getItem('token')

    console.log(pinInfo);
   

    try{
      const res = await axiosInstance.post(`${changePin}`, pinInfo, {
        headers:{
          'Authorization' : `Bearer ${JSON.parse(token)}`
        }
      });
      // console.log(res.data);


   

      if(res.data.status){
        alert('updated pin successful')
        setLoading(true)
      }
      if(!res.data.status){
        alert('Old pin is incorrect');
        setLoading(false)
      }

    }
    catch(error){
       console.log(error)
       alert("pin doesn't match")
       setLoading(false)

    }
    }

    
  }


  return (

    <View style={styles.container}>

      <View style={styles.containerPrimary}>

        <View style={styles.containerSecondary}>

        <Text style={styles.text}>Old PIN</Text>

        <TextInput style={styles.input} maxLength={4} mode='outlined' activeOutlineColor={COLORS.primary}
        keyboardType='number-pad'
        secureTextEntry={passwordVisible1}
            right={<TextInput.Icon name={passwordVisible1 ? "eye" : "eye-off"} onPress={() => setPasswordVisible1(!passwordVisible1)} />}
            value={oldPin}
            onChangeText={(value)=> getOldPin(value)}
        ></TextInput>
        {/* <Input  /> */}

        </View>

        <View style={styles.containerSecondary}>

        <Text style={styles.text}>New PIN</Text>

        <TextInput style={styles.input} maxLength={4} mode='outlined' activeOutlineColor={COLORS.primary}
         keyboardType='number-pad'
         secureTextEntry={passwordVisible2}
         right={<TextInput.Icon name={passwordVisible2 ? "eye" : "eye-off"} onPress={() => setPasswordVisible2(!passwordVisible2)} />}
         value={newPin}
         onChangeText={(value)=> getNewPin(value)}
         editable={oldPin ? true : false}
        
        ></TextInput>

        </View>
   

        <View style={styles.containerSecondary}>

        <Text style={styles.text}>Confirm New PIN</Text>

        <TextInput style={styles.input} maxLength={4} mode='outlined' activeOutlineColor={COLORS.primary}
        keyboardType='number-pad'
         secureTextEntry={passwordVisible3}
         right={<TextInput.Icon name={passwordVisible3 ? "eye" : "eye-off"} onPress={() => setPasswordVisible3(!passwordVisible3)} />}
         value={confirmPin}
         onChangeText={(value)=> getConfirmPin(value) }
         editable={newPin ? true : false}
        
        ></TextInput>


        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{ textAlign: "center" }}>Forget Transaction PIN? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("reset pin");
            }}
          >
            <Text style={{ fontWeight: "bold", marginLeft: 7, color: '#0B535B' }}>Reset </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {/* <Button text="Save Changes" onPress={updatePin} /> */}
          <CustomButton title={loading ? "Updating..." : "Save Changes"} onPress={updatePin} />
        </View>
        {/* <Text style={{textAlign:'center'}}>Forget Transaction PIN? <Text style={{fontWeight:'bold'}} >Reset </Text> </Text>

        <View style={styles.buttonContainer}><Button text='Save Changes' onPress={updatePin}/></View> */}

        
      </View>
     
    </View>
  )
}

export default ChangePIN;