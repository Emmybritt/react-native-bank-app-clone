import { StyleSheet } from "react-native";
import {COLORS } from '../../helpers/theme/constantstyles'

const styles = StyleSheet.create({
      container: {
            backgroundColor: COLORS.background,
            height:'100%'
          
            
      },
      containerPrimary: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: COLORS.primary,
            paddingVertical: 16,
            justifyContent: 'center',
            width: '100%',
            height:'10%'

            
      },
      header: {
            color: COLORS.white,
            fontWeight: '200'

      },
      containerSecondary: {
            paddingHorizontal: 48,
            paddingTop: 48,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
             marginTop: -32,
            backgroundColor:COLORS.background
            

      },
      containerTertiary: {
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-around',
            paddingVertical:32
           
            
      },
      paragraph: {
            color: COLORS.inputGreen,
            textAlign:'center',
      },
      // input: {
      //      width: 50,
      //      height: 50,
      //      borderColor:(true ? COLORS.primary : COLORS.inputBorder),
      //       borderWidth: 2,
      //       fontSize: 32,
      //       paddingLeft:20
           
            
           
      //  },
      footerText: {
            textAlign: "center",
            marginTop:8
            
      }

})

export default styles;