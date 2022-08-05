import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../helpers/theme/constantstyles";


const styles = StyleSheet.create({
      container: {
            marginHorizontal: 48,
            paddingTop: 32
            
      },
      containerSecondary: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 16,
            backgroundColor: COLORS.background,
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius:10
            
            
      },
      image: {
            width: 10,
            height:12
      },
      heading: {
            color: COLORS.primary,
            fontWeight: '700',
            fontSize: SIZES.h2,
            marginTop: 32

            
      }, icon: {
           marginRight:12
            
      },
      text: {
            color: COLORS.black,
            fontWeight: "bold",
            fontSize:SIZES.h3
      },
      containerPrimary: {
            marginTop: 48
      }

});

export default styles;