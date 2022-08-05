
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../Onboarding'
import {Onboarding1 , Onboarding2, Onboarding3} from '../../constant/ScreenImports'

const Stack = createNativeStackNavigator()

const OnboardingRoute = () => {
      return (
            <Stack.Navigator>
                  <Stack.Screen name='onboarding route' component={Onboarding} options={{headerShown: false} }/> 
                  <Stack.Screen name='onboarding1' component={Onboarding1}  />
                  <Stack.Screen name='onboarding2' component={Onboarding2} options={{headerShown: false} } />
                  <Stack.Screen name='onboarding' component={Onboarding3} options={{headerShown: false} }/>
            </Stack.Navigator>
      )
}

export default OnboardingRoute;