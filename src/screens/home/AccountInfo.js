import { View, Text , StyleSheet , Image, Pressable, TouchableOpacity} from 'react-native'
import {useState , useEffect} from 'react'
import { COLORS } from '../../helpers/theme/constantstyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Clipboard from 'expo-clipboard';
import CustomButton from '../../common/button/Index';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserProfile } from '../../redux/features/UserProfileSlice';

const AccountInfo = () => {

  const dispatch = useDispatch();

  const [firstName , setFirstName] = useState('Fname')
  const [lastName , setLastName] = useState('Lname')
  const [accountNumber , setAccountNumber] = useState(8654797542)
  const [email , setEmail] = useState('test@gmail.com')
  const [phoneNumber , setPhoneNumber] = useState('09157976458')
  const userInformation = useSelector(state => state.userProfile.data);

  // console.log('This is it ', userInformation);

  const getUserDetails = async ()=>{

    try{
     const firstName = await AsyncStorage.getItem('firstName')

     const lastName = await AsyncStorage.getItem('lastName')
     const account = await AsyncStorage.getItem('accountNumber')
     const phoneNumber = await AsyncStorage.getItem('phoneNumber')
     const email = await AsyncStorage.getItem('response')
     const userMail = JSON.parse(email)

     setFirstName(firstName)
     setLastName(lastName)
     setAccountNumber(account)
     setPhoneNumber(phoneNumber)
     setEmail(userMail.username)

    }
    catch{

    }
  }

  useEffect(()=>{
    getUserDetails()
    dispatch(FetchUserProfile())
  })
  
  const copyToClipboard =   (value) => {
    
    Clipboard.setString(value);
    alert('Copied!')

    };

  return (
    <View style={styles.container}>

      <View style={styles.containerPrimary}>

        <View style={styles.label}>
          <View>
             <Text style={styles.heading}>Account Name</Text>
            {/*<Text>Emmanuel berit</Text> */}
          <Text>{userInformation.first_name} {userInformation.last_name}</Text>
          </View>
          
          <TouchableOpacity style={styles.iconContainer} onPress={()=> copyToClipboard(`${userInformation.first_name} ${userInformation.last_name}`)}>
          <Image style={styles.icon} source={require('../../../assets/images/copy.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.label}>
          <Text style={styles.heading}>Account Number</Text>
          <Text>{userInformation.account_number}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={()=> copyToClipboard(`${userInformation.account_number}`)}>
          <Image style={styles.icon} source={require('../../../assets/images/copy.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.label}>
          <Text style={styles.heading}>Email</Text>
          <Text>{email}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={()=> copyToClipboard(`${email}`)}>
          <Image style={styles.icon} source={require('../../../assets/images/copy.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.label}>
          <Text style={styles.heading}>Phone Number</Text>
          <Text>{userInformation.phone_number}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={()=> copyToClipboard(`${userInformation.phone_number}`)}>
          <Image style={styles.icon} source={require('../../../assets/images/copy.png')} />
          </TouchableOpacity>
        </View>
      <CustomButton title="Save Changes" />
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({

  container:{
    height:'100%',
    backgroundColor: COLORS.bluebg,
    paddingHorizontal:'5%'

  },
  containerPrimary:{
    height:'100%',  
    paddingHorizontal:'5%',
    backgroundColor:'#f5f9f9',
    marginTop:'15%',
    paddingTop:'10%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  label:{
    width:'100%',
    height:70,
    borderRadius:12,
    paddingLeft:16,
    marginBottom:'10%',
    backgroundColor: 'white',
    paddingTop: 9,
    paddingBottom: 10,
    // paddingVertical: 20,

  },
  heading:{
    color:COLORS.primary,
    fontWeight:'bold',
    marginTop:8

  },
  icon:{
    height:15, 
    width:15 

  },
  iconContainer:{
    position:'absolute', 
    left:'95%', 
    top:'50%'

  }
})


export default AccountInfo;
