import { Text, View, Image , StyleSheet, ScrollView} from 'react-native'
import {useEffect}from 'react'
import Button from '../../component/Button'
import { OnboardingNavigation } from '../../helpers/OnboardingNavigation/OnboardingNavigation'
import { COLORS, SIZES } from '../../helpers/theme/constantstyles'
import { useNavigation } from '@react-navigation/native'


const Onboarding4 = () => {


      return (
            
            <ScrollView style={styles.container}>
                  <View style={styles.containerPrimary}>
                        <Image source={require('../../../assets/images/card.png')} style={styles.image} />
                        
                        <Text style={styles.heading}>Welcome to the Home of Finances</Text>

                        <Button text='Get Started' name='SignUp' disabled ={false} />
                  </View>
            </ScrollView>
      )
}

const styles = StyleSheet.create({
      container: {
            height: '100%',
            backgroundColor:'#314D50'
            
      },
      containerPrimary: {
            marginHorizontal: 32,
            marginTop:'20%'
      },
      image: {
            height: 350,
            width: 350,
            marginHorizontal:'auto'
            
      },
      heading: {
            fontSize: SIZES.h1,
            textAlign: 'center',
            marginTop: 80,
            color: COLORS.headingGrey,
            marginBottom:32
            
      }
})


export default Onboarding4;