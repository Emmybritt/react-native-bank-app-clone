import { View, Image, Text } from 'react-native';
import styles from '../../styles/others/transferconfirm';
import Button from '../../component/Button';
import CustomButton from '../../common/button/Index';


const TransferSuccessful = () => {
      return (
            <View style={styles.container}>
                  <View style={styles.main}>
                            <Image style={styles.checked} source={require('../../../assets/images/checked.png')} />
                              <Text style={{textAlign:'center',  color: '#0B535B',
            fontWeight: '700',
            fontSize: 22,
            marginVertical:8, marginBottom:32}}>Transfer Successful</Text>

                              <View style={styles.infoContainer}>
                                    <View style={styles.info}>
                                          <Text>Account Number:</Text>
                                          <Text>211004783</Text>
                                    </View>
                                    <View style={styles.info}>
                                          <Text>Name:</Text>
                                          <Text>Suberu Micheal</Text>
                                    </View>
                                    <View style={styles.info}>
                                          <Text>Bank:</Text>
                                          <Text>Ulego MFB</Text>
                                    </View>
                                   
                                    <View style={styles.info}>
                                          <Text>Description</Text>
                                          <Text></Text>
                                    </View>

                        </View>
                        
                              {/* <Button text='Back to Home' name='home'/> */}
                              <CustomButton title='Back to Home' />
                        </View>
                  
                
            </View>
      )
}

export default TransferSuccessful;