import { StyleSheet } from "react-native";

import { COLORS, SIZES } from '../../helpers/theme/constantstyles'


const styles = StyleSheet.create({
      container: {
            backgroundColor: COLORS.background,
            height:'100%'
            
      },
      containerPrimary: {
            backgroundColor: COLORS.primary,
            paddingBottom: 38,
            paddingTop:24
            
      },
      containerSecondary: {
            backgroundColor:  COLORS.background,
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            marginTop: -24,
            paddingHorizontal: 32
         
      },
      inputContainer: {
            display: 'flex',
            marginVertical: 16,
            marginBottom:'10%'
          
      },
      input: {
            height:45   ,
            backgroundColor: COLORS.background,
            borderWidth:4,
            borderColor:COLORS.background,
            marginBottom:'5%',
            fontSize:16,
            paddingLeft:8
            
      },
      heading: {
            color: COLORS.white,
            textAlign:'center'
      },
      imageContainer: {
            display: 'flex',
            flexDirection: 'row',
      }, 
      image: {
            height: 150,
            width:150   
      }, 
      subheading: {
            marginTop: 40,
            marginBottom:16,
            fontSize: 18,
            color:'#B1ACAC',
            fontWeight: '400'
            
      },
      balanceContainer: {
            marginVertical:16
      },
      statement: {
            textAlign: 'right',
            color: COLORS.primary,
            fontSize: SIZES.h4
      },
      balance: {
            textAlign: 'right',
            color: COLORS.primary,
            fontSize: SIZES.h2,
            fontWeight:'bold'

      },
      containerTertiary: {
            paddingVertical: 32,
      },
      panel: {
            backgroundColor: COLORS.primary,
            width: '20%',
            height:'20%',
            borderRadius: 16,
            marginTop:32
            
      },
      main: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between'
      },
      textContainer: {
            position: 'absolute',
            left: '35%',
            top:'30%'
      },
      modal: {
            borderColor:COLORS.background,
            borderBottomColor: COLORS.inputBorder,
            borderWidth: 2,
            marginBottom: 24,
            color:'black'
      }

})

export default styles;