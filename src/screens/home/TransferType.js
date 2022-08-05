import { View, Text, StyleSheet, Image , TouchableOpacity } from 'react-native'
import { COLORS } from '../../helpers/theme/constantstyles'

import { useNavigation } from '@react-navigation/native'


const TransferType = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <Text style={{color:'#c2c2c2', fontWeight:'bold'}}>Select Type</Text>

        <View style= {styles.containerSecondary}>

          <TouchableOpacity style={styles.label} onPress={()=> navigation.navigate('transfer to ulego')}>
          <View  >
            <Image style={styles.image} source={require('../../../assets/Uacct.png')}/>
            <Text style={styles.heading}>To Ulego Account</Text>
            <Text style={styles.subheading}>Transfer funds to another ulego acccount</Text>

          </View>

          </TouchableOpacity>

          <TouchableOpacity style={styles.label} onPress={()=> {navigation.navigate('transfer')}}>

          <View >
          <Image source={require('../../../assets/images/bank2.png')}/>
            <Text style={styles.heading}> To Other Banks</Text>
            <Text style={styles.subheading}>Transfer funds to other bank acccounts</Text>

          </View>

          </TouchableOpacity>

  
     

        </View>

      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    height:'100%',
    backgroundColor: COLORS.background,
    paddingHorizontal:'10%'
    

  },
  containerPrimary:{
    paddingTop:'20%'

  },
  containerSecondary:{
   marginTop:8,
    display:'flex',
    flexDirection:'row',
  
    justifyContent: 'space-between'

  },
  image:{
    height: 31,
    width: 30
  },
  label:{
    backgroundColor:COLORS.white,
    width:'45%',
    borderRadius: 12,
    paddingVertical:12,
    paddingLeft:12
  },
  subheading:{
    color:'#C2C2C2',
    fontSize:10

  },
  heading:{
    fontWeight:'700'
  }

})

export default TransferType