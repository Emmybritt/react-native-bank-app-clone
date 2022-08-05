import { StyleSheet } from "react-native";
import {COLORS ,SIZES} from '../../helpers/theme/constantstyles'

const styles = StyleSheet.create({
      container: {
            paddingHorizontal: 48,
            backgroundColor: COLORS.darkGreen,
            height: "100%",
            paddingTop:'15%'
            
            
      },
      header: {
            fontWeight: '400',
            fontSize: SIZES.h2,
            textAlign: 'center',
           
            color:COLORS.headingGrey
            
      },
      subheading: {
            color: COLORS.headingGrey,
            fontSize: SIZES.h3,
            textAlign: 'center',
            marginBottom: 32,
            lineHeight:30
            
      },
      image: {
            height: 45,
            width: 57,
            alignSelf: 'center',
            marginTop: '25%',
            marginBottom:'10%'
            
      },
      imageContainer: {
            justifyContent:'center'
            
      },
      input: {
            width: 50,
            height: 50,
            borderWidth: 2,
            borderColor:COLORS.inputBorder
            
      },
      containerInput: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical:32
      },
      footerText: {
            textAlign: 'center',
            color: COLORS.headingGrey,
            marginVertical:16
      }
})

export default styles;