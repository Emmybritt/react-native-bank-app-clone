import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/others/otp';
import Button from '../../component/Button';
import { COLORS } from '../../helpers/theme/constantstyles';
import { useState } from 'react';
import CustomButton from '../../common/button/Index';


const OtpPage = () => {

      const [active1, setActive1] = useState(false)
      const[active2 , setActive2] = useState(false)
      const[active3 , setActive3] = useState(false)
      const[active4 , setActive4] = useState(false)
      
      return (
            <View style={styles.container}>
               

                  <View style={styles.containerSecondary}>
                        <Text style={styles.paragraph}>Input the 4 digit code sent to your phone to complete deposit</Text>

                        <View style={styles.containerTertiary}>
                              <TextInput maxLength={1} secureTextEntry keyboardType='numeric' caretHidden={true}
                                     onFocus={() => setActive1(true)}
                                     onEndEditing={()=> setActive1(false)}
                                      style={{   width: 50,
                                          height: 50,
                                          borderColor:(active1 ? COLORS.primary : COLORS.inputBorder),
                                           borderWidth: 2,
                                           fontSize: 25,
                                           paddingLeft:20}}
                                    
                              />
                              <TextInput maxLength={1} secureTextEntry
                                    keyboardType='numeric' caretHidden={true}
                                    
                                    onFocus={() => setActive2(true)}
                                    onEndEditing={()=> setActive2(false)}
                                    style={{   width: 50,
                                          height: 50,
                                          borderColor:(active2 ? COLORS.primary : COLORS.inputBorder),
                                           borderWidth: 2,
                                           fontSize: 25,
                                           paddingLeft:20}}
                              />
                              <TextInput
                                     onFocus={() => setActive3(true)}
                                     onEndEditing={()=> setActive3(false)}
                                    maxLength={1} secureTextEntry keyboardType='numeric' caretHidden={true}
                                    style={{   width: 50,
                                          height: 50,
                                          borderColor:(active3 ? COLORS.primaryd : COLORS.inputBorder),
                                           borderWidth: 2,
                                           fontSize: 25,
                                           paddingLeft:20}}
                              />
                              <TextInput
                                     onFocus={() => setActive4(true)}
                                     onEndEditing={()=> setActive4(false)}
                                      style={{   width: 50,
                                          height: 50,
                                          borderColor:(active4 ? COLORS.primary : COLORS.inputBorder),
                                           borderWidth: 2,
                                           fontSize: 25,
                                           paddingLeft:20}}
                                    maxLength={1} secureTextEntry keyboardType='numeric' caretHidden={true} />
            
                        </View>

                        {/* <Button text='Authorize' name='successful' /> */}
                        <CustomButton title='Authorize' onPress={()=> navigation.navigate('successful')}  />
                        <Text style={styles.footerText}>Powered by Interswitch</Text>



                  </View>
            </View>
            
      )
}

export default OtpPage;