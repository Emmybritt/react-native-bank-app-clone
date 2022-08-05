import { View, Text, TextInput , ActivityIndicator} from 'react-native'
import { useState , useEffect} from 'react';
import axiosInstance from '../../helpers/axios/axiosInterceptor';
import Button from '../../component/Button';
import { authorizeElectricity , electricityBeneficiary } from '../../helpers/utils/Apiroutes/ServerRoutes';
import styles from '../../styles/others/bills';
import { SuccessModal , ErrorModal } from '../../component/ModalPopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../helpers/theme/constantstyles';
import CustomButton from '../../common/button/Index';

const ConfirmElectricity = () => {

  const [pin , setPin] = useState()
  const [data , setData] = useState('')

  const [errorVisible , setErrorVisible] = useState(false)
  const [successVisible , setSuccessVisible] = useState(false)
  const [errorMessage , setErrorMessage] = useState('')
  const [loading , setLoading] = useState(false)


  const RemoveError = () => {
    console.log('it is working');
    setErrorVisible(false)
  }


  const getPowerData = async ()=>{

    

    try {
      const powerInfo = await AsyncStorage.getItem('powerInfo')
      const powerData = JSON.parse(powerInfo)
      
      setData(powerData)
      
     

    }

    catch(error){
      alert(error)
    }
  }

  useEffect(()=>{ getPowerData()}, [])
  

  const authorizePowerPurchase= async ()=>{

    const token = await AsyncStorage.getItem('token')
    setLoading(true)
    
    try{

      const res = await axiosInstance.post(`${authorizeElectricity}${data.reference}`,{pin}, {headers:{
        'Authorization' : `Bearer ${JSON.parse(token)}`
      }})
      
     console.log(res)


      if(res.data.status){
        setSuccessVisible(true)
        setLoading(false)
      }
      if(!res.data.status){

        setErrorVisible(true)
        setErrorMessage(res.data.error_message)
        setLoading(false)
      
      }

    }
    catch(error){

      setErrorVisible(true)
      setErrorMessage('There was an error, kindly try again')
      setLoading(false)
      
      
    }
  }

 
 
  return (

    <View style={styles.container}>

      <View style={styles.containerPrimary}>

       <Text style={styles.amount}>{`\u20A6 ${data.amount}`}</Text>
     

       <View style={styles.containerSecondary}>
       <Text style={styles.detail}>Purchase Details</Text>

         <View style={styles.info}>
           <Text style={styles.text}>Service Provider:</Text>
           <Text style={styles.text}>{data.service_provider}</Text>
         </View>

         <View style={styles.info}>
           <Text style={styles.text}>Meter Number:</Text>
           <Text style={styles.text}>{data.meter_number}</Text>
         </View>


       <TextInput value={pin} onChangeText={(value)=> setPin(value)} maxLength={4} style={styles.input} placeholder='Input transfer pin' keyboardType='numeric'secureTextEntry />

       </View>


       {
          errorVisible ? <ErrorModal removeError={RemoveError} visible={true} errorMessage={errorMessage}/> : null
          

        }


       <View style={styles.buttonContainer}>
        {/* <Button text='Next' onPress={authorizePowerPurchase}/> */}
        <CustomButton onPress={authorizePowerPurchase} title={loading ? 'Please wait...' : 'Next'} />
        </View>
       <ActivityIndicator style={{marginTop:16}} color={COLORS.primary} animating={loading}/>



      </View>
      <SuccessModal visible={successVisible} checkBeneficiary={false}/>
     
     
     
    </View>
  )
}

export default ConfirmElectricity;