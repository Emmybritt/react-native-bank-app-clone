import { View, Text , Modal, StyleSheet, Image , TouchableWithoutFeedback, Platform , TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import Button from './Button'
import { COLORS } from '../helpers/theme/constantstyles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { FancyAlert } from 'react-native-expo-fancy-alerts';


export const ModalPopUp = ({visible, text}) => {

  const [showModal , setShowModal] = useState(visible)

  useEffect(()=>{
    toggleModal()
  }, [visible])

  const toggleModal = ()=>{
    if(visible){
      setShowModal(true);
    }
    else{

      setShowModal(false);

    }
  }

  
  return (
   <Modal transparent visible={showModal} >
     <View style={styles.modal}>
       <View style={styles.modalContainer}>
         <TouchableWithoutFeedback onPress={()=> {setShowModal(false); 
         
        
        }}>
         <Image source={require('../../assets/images/cross.png')} style={{position:'absolute', top:18, right:24}}/>
         </TouchableWithoutFeedback>
       
         <Image style={{marginBottom:8}} source={require('../../assets/images/error.png')}/>
         <Text style={{color:COLORS.primary, fontWeight:'500', marginBottom:8}}>{text}</Text>
         <Text style={{textAlign:'center', color:COLORS.primary,}}>Just a tiny little error , check your input fields or network.</Text>
       </View>


     </View>

   </Modal>
  )
}

export const SuccessModal = ({visible, beneficiary, checkBeneficiary}) => {

  const [isVisible , setIsVisible] = useState(visible)
  const navigation = useNavigation()

  const toggleAlert = ()=>{

    if(visible){
      setIsVisible(true);
    }
    else{

      setIsVisible(false);

    }

  }

  useEffect(()=> toggleAlert())

 
  return <FancyAlert
    style={styles.alert}
    icon={
      <TouchableOpacity style={[ styles.icon, { borderRadius: 32 } ]}
      onPress={()=>{navigation.navigate('home')}}
      
      >
        <Ionicons
          name={Platform.select({ ios: 'ios-checkmark', android: 'checkmark' })}
          size={36}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    }
    
    visible={isVisible}
  >
    <View style={styles.content}>
      <Text style={styles.contentText}>Transaction was successful!!</Text>
 
      <TouchableOpacity style={[styles.btn , checkBeneficiary ? {display:'flex'} : {display:'none'}]} onPress={()=>{
      
        navigation.navigate('home')
      }} onPressIn={beneficiary}>
        <Text style={styles.btnText}>Save Beneficiary</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={()=>{
      
      navigation.navigate('home')
    }}>
      <Text style={styles.btnText}>Back Home</Text>
    </TouchableOpacity>
    </View>
  </FancyAlert>;
}



export const ErrorModal = ({visible, errorMessage, removeError}) => {

  const [isVisible , setIsVisible] = useState(visible)
  const navigation = useNavigation()



  const toggle = ()=>{

    if(!visible){
      setIsVisible(false)
      
     
    }
   else {
     setIsVisible(true)
   }

  }


    useEffect(()=>{toggle()}, [isVisible])

 
  const closeAlert = ()=>{
    removeError()
    setIsVisible(!visible)
    

  }


 
  return <FancyAlert
    style={styles.alert}
    icon={
      <View style={[ styles.icon, { borderRadius: 32,backgroundColor:'#e05158' } ]}>

        <TouchableWithoutFeedback>
       
        <Ionicons
          name={Platform.select({ ios: 'ios-close', android: 'md-close' })}
          size={36}
          color="#FFFFFF"
        />
        </TouchableWithoutFeedback>
      </View>
    }
    
    visible={isVisible}
    onRequestClose={()=> setIsVisible(!visible)}
  >
    <View style={styles.content}>
      <Text style={styles.contentText}>{errorMessage}</Text>
 
      <TouchableOpacity style={[styles.btn , {backgroundColor:'#e05158'}]}  onPress={()=> 
      {
        closeAlert();
        // navigation.navigate('home')
      }

      }
       >
        <Text style={styles.btnText}>ok</Text>
      </TouchableOpacity>
    </View>
  </FancyAlert>;
}


 
const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#EEEEEE',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: COLORS.primary,
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});
