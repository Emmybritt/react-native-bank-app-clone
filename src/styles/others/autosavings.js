import { StyleSheet } from "react-native"; 
import { COLORS ,SIZES } from "../../helpers/theme/constantstyles";

const styles = StyleSheet.create({
      container: {
      },
      containerPrimary: {
            paddingHorizontal:32
            
      },
      close: {
            marginTop: 32,
            marginBottom: 32,
            marginLeft:32
            
      },
      image: {
            marginTop:'20%'
            
      },
      paragraph: {
            textAlign: 'center',
            marginTop: 16,
            marginBottom: 64,
            color: COLORS.textGreen,
          
            
            
      },
      heading: {
            textAlign: 'center',
            color: COLORS.textGreen,
            fontSize: SIZES.h2,
            fontWeight: '500',
            marginTop: 16,
            fontWeight:'bold'
            
      }
})

export default styles;