import { View, ActivityIndicator } from 'react-native'
import { useState , useEffect , useRef} from 'react'
import styles from '../../styles/others/utility'
import SelectDropdown from 'react-native-select-dropdown'
import { TextInput } from 'react-native-paper'
import { cableTvRoute , cableTvPlans, initiateCablePurchase , verifyNumberRoute} from '../../helpers/utils/Apiroutes/ServerRoutes'
import { COLORS } from '../../helpers/theme/constantstyles'

import { useNavigation } from '@react-navigation/native'
import Button from '../../component/Button'
import axiosInstance from '../../helpers/axios/axiosInterceptor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../../common/button/Index'

const CableTv = () => {


  const [cableTvTypes , setCableTvTypes] = useState()
  const [cableTv , setCableTv] = useState()
  const [cableID , setCableID] = useState()
  const [plans , setPlans] = useState()
  const [price , setPrice] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [beneficiary , setBeneficiary] = useState()
  const [loading , setLoading] = useState(false)
  const [plan , setPlan] = useState()
  const [isLoading , setIsLoading] = useState(false)

  const dropdown_2 = useRef(null)
  const input_1 = useRef(null)
  const input_2 = useRef(null)


  const getCableTvProviders = async ()=>{

    try {
      const res = await axiosInstance(`${cableTvRoute}`)

      setCableTvTypes(res.data.result)

    }

    catch(error){

      alert(error)

    }

  }

  useEffect(()=>{

    getCableTvProviders()

  }, [])

  const getPlans =async ()=>{

    try{

      const res = await axiosInstance(`${cableTvPlans}${cableID}`)

      

      setPlans(res.data.result)

    }
    catch(error){

      alert(error)

    }

  }


  useEffect(()=>{
    if(cableID){
      getPlans()
    }
  }, [cableID])

  const verifySmartCard = async ()=>{

    try {

      setLoading(true)

      const res = await axiosInstance(`${verifyNumberRoute}?serviceType=${cableID}&card_number=${cardNumber}`)

    
      const user = await res.data.result[0].name
       setBeneficiary(user)

      setLoading(false)

    }
    catch(error){

      alert("can't find user account")


    }

  }

  const navigation = useNavigation()

  const initiateTransaction = async ()=>{

    setIsLoading(true)

    const transactionPayload = {
      serviceType :'cabletv',
      serviceProvider:`${cableID}`,
      amount: `${price}`,
      smartCardNumber : `${cardNumber}`,
      package :`${plan}`
    }

    console.log('From cable tv components', transactionPayload);

    try { 
      const token = await AsyncStorage.getItem('token')

      const res = await axiosInstance.post(`${initiateCablePurchase}`, transactionPayload,{
        headers:{
          Authorization : `Bearer ${JSON.parse(token)}`
        }
      })


      await AsyncStorage.setItem('cableData',JSON.stringify(res.data.result[0]))

      if(res.data.status){
        navigation.navigate('confirm cable')
        setIsLoading(false)

      }
      if(!res.data.status){
        setIsLoading(false)
        alert("There was an error , kindly try again later")
      }

    }
    catch(error){

      setIsLoading(false)
      alert("There was an error , kindly try again later")
    }
  }




  return (

    <View style={styles.container}>

      <View style={styles.containerSecondary}>

        <SelectDropdown 
        data={cableTvTypes}
        onSelect={(cable)=>{
          setCableID(cable.id)
          setCableTv(cable.description);
          dropdown_2.current.reset()
          input_1.current.clear()
          input_2.current.clear()
        
        

        }}

        buttonTextAfterSelection={(cable)=>{
          return cable.description

        }}
        rowTextForSelection={(cable)=>{
          return cable.description
        }}



      buttonStyle={{width:'100%', borderColor:COLORS.background,backgroundColor:COLORS.background, borderBottomColor:"black", borderWidth:1, borderRadius:4,marginBottom:'5%'}}
      defaultButtonText={'Select CableTv'}
      buttonTextStyle={{textAlign:'left', color:'grey', fontSize: 13}} 
      dropdownStyle={{
        backgroundColor:'white',
        borderRadius:10,
        borderColor:'grey',
        borderWidth:2,
        
       
      }}
      rowTextStyle={{color:'grey'}}
        
        />

        <SelectDropdown
         data={plans}
         onSelect={(plan)=>{
          setPrice(plan.price)
          setPlan(plan.id)
         }}
         ref={dropdown_2}

         buttonTextAfterSelection={(plan)=>{
           return plan.description

         }}
         rowTextForSelection={(plan)=>{
           return plan.description
         }}
         disabled={cableID ? false : true}

         buttonStyle={{width:'100%', borderColor:COLORS.background, backgroundColor:COLORS.background,borderBottomColor:"black", borderWidth:1, borderRadius:4,marginBottom:'5%'}}
         defaultButtonText={'Select Cable Plan'}
         buttonTextStyle={{textAlign:'left', color:'grey', fontSize: 13}} 
         dropdownStyle={{
          backgroundColor:'white',
          borderRadius:10,
          borderColor:'grey',
          borderWidth:2,
          
         
        }}
        rowTextStyle={{color:'grey'}}
        
         
        
        />

        <TextInput style={styles.input} mode='flat' value={(price ? `#${price}`: '' )} editable={false} caretHidden={true} placeholder='Price'    underlineColor='black'  ref={input_1}/>

        <TextInput style={styles.input}  mode='flat'
                             
          activeUnderlineColor={COLORS.primary}
         underlineColor='black'
        keyboardType='numeric' value = {cardNumber}
        onChangeText={(value)=> {setCardNumber(value)}}
        placeholder='Smart Card Number'
        ref={input_2}
        onEndEditing={()=> {verifySmartCard()}}
        editable={cableID ? true : false}
        />

        <ActivityIndicator animating={loading} size='large' style={{position:'absolute', top:'50%', zIndex:1, left:'40%'}}/>

        <TextInput mode='flat' activeUnderlineColor={COLORS.primary}
         underlineColor='black' editable={false} value={beneficiary} style={[styles.input, {display:(beneficiary ? 'flex' : 'none')}]}  ref={input_2}/>

        <View style={styles.buttonContainer}>
          {/* <Button text='Next' onPress={initiateTransaction} disabled={price && cardNumber && cableID ? false : true} /> */}
          <CustomButton onPress={initiateTransaction} title={loading ? 'Please wait..' : 'Next'} disabled={price && cardNumber && cableID ? false : true}  />
          </View>

          <ActivityIndicator animating={isLoading} size="large" color={COLORS.primary} style={{marginTop:16}}/>



      </View>

    </View>
  )

}

export default CableTv