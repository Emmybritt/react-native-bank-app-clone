import { StyleSheet } from "react-native";
import {COLORS ,SIZES} from '../../helpers/theme/constantstyles'

const styles = StyleSheet.create({
      container: {
            paddingHorizontal: 48,
            backgroundColor: COLORS.darkGreen,
            height:"100%"
            
      },
      header: {
            fontWeight: '400',
            fontSize: SIZES.h2,
            textAlign: 'center',
            marginTop: "50%",  
            color:COLORS.headingGrey
      },
      subheading: {
            color: COLORS.headingGrey,
            fontSize: SIZES.h3,
            textAlign:'center'
            
      },
      imageContainer: {
            justifyContent:'center'
            
      },
      image: {
            marginVertical: 16,
            alignSelf:'center'
      },
      inputContainer: {
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical:32
            
      },
      input: {
            width: 50,
            height: 50,
            borderWidth: 2,
            borderColor:COLORS.inputBorder
      }
})

export default styles;