import { Text, View, Image } from 'react-native'
import React from 'react';
import Button from '../../component/Button';

import styles from '../../styles/others/onboarding';

const Onboarding3 = () => {
      return (
            <View style={styles.container}>
                  <View style={styles.containerPrimary}> 
                        <Image style={styles.image} source={require('../../../assets/images/INVES.png')}/>

                  </View>

                  <View  style={styles.containerSecondary}>
                        <Image style={styles.icon} source={require('../../../assets/images/bar3.png')}/>
                        <Text style={styles.heading}>Find Legitimate Opportunities to Invest in</Text>

                        {/* <Button text='Next' />
                        <Text style={{textAlign:'center', marginTop:16}}>Skip</Text> */}
                  </View>
                  
            </View>

      )
}


export default Onboarding3;