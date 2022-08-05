import { View, Text, Image, StyleSheet } from 'react-native';


import { COLORS } from '../../helpers/theme/constantstyles';


const DepositSuccessful = () => {

      return (
            <View style={styles.container}>

                  <View style={styles.containerPrimary}>

                        <Text style={styles.heading}>Congratulations</Text>
                        <View style={styles.imageContainer}>
                          <Image style={styles.image} source={require('../../../assets/images/checked.png')}/>

                        </View>
                        <Text style={styles.text}>You have successfully added {'\n'} 1000.00 to your account</Text>
                  
                  </View>

            </View>
      )
}

const styles = StyleSheet.create({
      container: {
            height: '100%',
            backgroundColor: COLORS.white,
      },
      
      containerPrimary: {
            backgroundColor: COLORS.bluebg,
            borderRadius: 24,
            paddingHorizontal: 32,
            paddingTop: "30%",
            paddingBottom: "30%",
            marginTop: '20%',
            marginHorizontal:16
      },
      imageContainer: {
            justifyContent: 'center',
            marginVertical:24
      },
      image: {
            alignSelf:'center'
      },
      heading: {
            textAlign: 'center',
            color: COLORS.primary,
            fontWeight:'bold'
      },
      text: {
            textAlign: 'center',
            color:COLORS.inputBorder
      }
})

export default DepositSuccessful;