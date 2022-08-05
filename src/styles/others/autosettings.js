import { StyleSheet } from "react-native";
import { COLORS ,SIZES} from '../../helpers/theme/constantstyles'

const styles = StyleSheet.create({
      container: {
            paddingHorizontal:48
            
      },
      heading: {
            marginTop:24,
           
            color: COLORS.primary,
            fontSize: SIZES.h2,
            fontWeight:'700'
            
      },
      subheading: {
            
            fontWeight: '700',
            marginTop:16,
            
            
      },
      close: {
            width: 10,
            height: 12,
            marginTop:32
      },
      containerPrimary: {
            
      },
      inputContainer: {
            marginTop: 32,
            marginBottom:48
            
      },
      text: {
            color:COLORS.primary
            
      },
      input: {
            borderRadius: 40,
            height: 40,
            borderWidth: 1,
            borderColor: COLORS.inputBorder,
            marginVertical:16
      }
})

export default styles;