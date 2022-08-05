import Swiper from 'react-native-swiper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScrollView } from 'react-native'

import { Onboarding2, Onboarding1,Onboarding3, Onboarding4 } from '../../helpers/utils/screen/ScreenImports'

// const Stack = createNativeStackNavigator()
// loop={false} showsPagination={false}
const Onboarding = () => {
      return (
            
            <Swiper loop={false} showsPagination={false}>
                  <Onboarding1/>
                  <Onboarding2/>
                  <Onboarding3/>
                  <Onboarding4 />   

            </Swiper>            
            
              
      )
}

export default Onboarding;