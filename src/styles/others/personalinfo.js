import { StyleSheet } from "react-native";
import { SIZES , COLORS } from "../../helpers/theme/constantstyles"; 

const styles = StyleSheet.create({
      container: {
            height: '100%',
            backgroundColor: COLORS.darkGreen,
            paddingHorizontal: 48,
            
      },
      heading: {
            color: COLORS.headingGrey,
            textAlign: 'left',
            marginTop: 64,
            fontWeight: '400',
            fontSize: SIZES.h2,
            marginBottom:6
      
      },
      subheading: {
            color: COLORS.headingGrey,
            textAlign:'left'
      },
      containerPrimary: {
            marginTop: 24,
            marginBottom:32
      },
      input: {
            marginVertical: 16,
            backgroundColor: COLORS.inputGreen,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 40,
            color:COLORS.inputText
      }


})

export default styles;