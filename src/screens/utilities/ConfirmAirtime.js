import { View, Text, TextInput, ActivityIndicator, Modal, TouchableOpacity, Image } from 'react-native'
import { useState , useEffect} from 'react';
import axiosInstance from '../../helpers/axios/axiosInterceptor';
import Button from '../../component/Button';
import { authorizeAirtime , airtimeBeneficiary } from '../../helpers/utils/Apiroutes/ServerRoutes';
import styles from '../../styles/others/bills';

import { SuccessModal, ErrorModal } from '../../component/ModalPopUp';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../helpers/theme/constantstyles';
import CustomButton from '../../common/button/Index';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeUserAirtime, setErrorMsgNull } from '../../redux/features/AirtimeSlice';
import { useNavigation } from '@react-navigation/native';
// import { set } from 'immer/dist/internal';

const MyOwnModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Modal transparent visible={showModal} >
     <View style={styles.modal}>
       <View style={styles.modalContainer}>
         <TouchableOpacity onPress={()=> {setShowModal(false); 
         
        
        }}>
         <Image source={require('../../../assets/images/cross.png')} style={{position:'absolute', top:18, right:24}}/>
         </TouchableOpacity>
       
         <Image style={{marginBottom:8}} source={require('../../../assets/images/error.png')}/>
         <Text style={{color:COLORS.primary, fontWeight:'500', marginBottom:8}}></Text>
         <Text style={{textAlign:'center', color:COLORS.primary,}}>Just a tiny little error , check your input fields or network.</Text>
       </View>


     </View>

   </Modal>
  )
}

const ConfirmAirtime = () => {

  const [pin , setPin] = useState()
 
  const [data , setData] = useState({})
  const [errorVisible , setErrorVisible] = useState(false)
  const [successVisible , setSuccessVisible] = useState(false)
  const [errorMessage , setErrorMessage] = useState('')
  const [loading , setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const dispatch = useDispatch();
  const errorMsg = useSelector((store) => store.airtime.errorMsg);
  console.log('error message from confirm airtime', errorMsg);

  const isLoading = useSelector((store) => store.airtime.isLoading);
  const hasAuthorizePaynment = useSelector(state => state.airtime.hasAuthorizePaynment);

  const navigation = useNavigation();

  // console.log('This is the ',hasAuthorizePaynment);

  useEffect(() => {
    if (hasAuthorizePaynment === true) {
      setSuccessVisible(prev => !prev);
      setTimeout(() => {
        setSuccessVisible(false);
        
      }, 10000);
    }
  }, [hasAuthorizePaynment])

  const RemoveError = () => {
    dispatch(setErrorMsgNull())
  }

  const getairtimePurchaseData = async ()=>{

    

    try {
      const airtimeInfo = await AsyncStorage.getItem('airtimeInfo')
      const airtimeData = JSON.parse(airtimeInfo)
      
      setData(airtimeData)
     

    }

    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{ getairtimePurchaseData()}, [])

  useEffect(() => {
    if (errorMsg) {
      setErrorVisible(true);
      setErrorMessage(errorMsg);
    }else{
      setErrorVisible(false)
    }
  }, [errorMsg])
  

  const authorizeAirtimePurchase = async () => {

    const token = await AsyncStorage.getItem('token');
    console.log(token);
    

    if (!pin) {
      setPasswordError("Enter your pin to continue")
    }else{
      setLoading(true)
      setPasswordError(null);
      dispatch(authorizeUserAirtime({pin, token, data}));
    
    }

    
    
    // try{

    //   const res = await axiosInstance.post(`${authorizeAirtime}${data.reference}`,{pin}, {headers:{
    //     'Authorization' : `Bearer ${JSON.parse(token)}`
    //   }})
      

    //    console.log(res)
    //   if(res.data.status){
    //     setSuccessVisible(true)
    //     setLoading(false)
    //   }
    //   if(!res.data.status){

    //     setErrorVisible(true)
    //    console.log(errorVisible)
    //    setErrorMessage(res.data.error_message)
    //    setLoading(false)
      
    //   }

    // }
    // catch(error){
    //   console.log(error)
    //   if(error){
    //   setErrorVisible(true)
    //   setErrorMessage("There was an error , kindly try again!")
    //   setLoading(false)


    //   }
    // }
  }




  return (


    <View style={styles.container}>

      <View style={styles.containerPrimary}>

       <Text style={styles.amount}>{`\u20A6${data.amount}`}</Text>  

       <View style={styles.containerSecondary}>
       <Text style={styles.detail}>Purchase Details</Text>

         <View style={styles.info}>
           <Text style={styles.text}>Number:</Text>
           <Text style={styles.text}>{data.beneficiary_number}</Text>
         </View>

         <View style={styles.info}>
           <Text style={styles.text}>Network:</Text>
           <Text style={styles.text}>{data.service_provider}</Text>
         </View>


       <TextInput value={pin} onChangeText={(value)=> setPin(value)} maxLength={4} style={styles.input} placeholder='Input transfer pin' keyboardType='numeric'secureTextEntry />
       {passwordError && <Text style={{marginTop: -18, color: COLORS.danger}}>{passwordError}</Text>}
       
       

       </View>


       <View style={styles.buttonContainer}>
        {/* <Button text='Next' onPress={authorizeAirtimePurchase}/></View>
       <ActivityIndicator size={'large'} color={COLORS.primary} animating={loading} style={{marginTop:16}}/> */}
       <CustomButton onPress={authorizeAirtimePurchase} title={isLoading ? "Please wait.." : 'Next'} />
       {/* <Text>heheheh</Text> */}
       
       </View>
      <ActivityIndicator size={'large'} color={COLORS.primary} animating={isLoading} style={{marginTop:16}}/>


       {
          errorVisible ? <ErrorModal removeError={RemoveError} visible={true} errorMessage={errorMessage}/> : null
          

        }

        {/* <ErrorModal visible={errorMsg ? true : false} errorMessage={errorMessage} /> */}
        <MyOwnModal />



      </View>
     

      <SuccessModal visible={successVisible} checkBeneficiary={false}/>

     
     
     
    </View>
  )
}

export default ConfirmAirtime;