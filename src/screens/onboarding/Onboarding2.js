import { Text, View, Image, StatusBar } from 'react-native'
import Button from '../../component/Button';

import styles from '../../styles/others/onboarding';

const Onboarding2 = () => {
      return (
            <View style={styles.container}>
            <StatusBar/>
            <View style={styles.containerPrimary}> 
                  <Image style={styles.image} source={require('../../../assets/images/money.png')}/>

            </View>

            <View  style={styles.containerSecondary}>
                  <Image style={styles.icon} source={require('../../../assets/images/bar2.png')}/>
                  <Text style={styles.heading}>Track your expenses and savings in the same place</Text>

                  {/* <Button text='Next' />
                  <Text style={{textAlign:'center', marginTop:16}}>Skip</Text> */}
            </View>
            
      </View>

      )
}

export default Onboarding2;