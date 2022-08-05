import { Text, View, Image , StatusBar} from 'react-native'
import Button from '../../component/Button';

import styles from '../../styles/others/onboarding';

const Onboarding1 = () => {
      return (
            <View style={styles.container}>
                  <StatusBar/>
                  <View style={styles.containerPrimary}> 
                        <Image style={styles.image} source={require('../../../assets/images/card.png')}/>

                  </View>

                  <View style={styles.containerSecondary}>
                        <Image style={styles.icon} source={require('../../../assets/images/bar1.png')}/>
                        <Text style={styles.heading}>Manage all your Financial needs on the go</Text>

                        <Button text='Next' name='onboarding2'/>
                        <Text style={{textAlign:'center', marginTop:16}}>Skip</Text>
                  </View>
                  
            </View>

      )
}


export default Onboarding1;