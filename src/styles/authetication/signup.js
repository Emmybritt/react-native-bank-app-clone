import { StyleSheet } from "react-native";
import {COLORS, SIZES} from '../../helpers/theme/constantstyles'

const styles = StyleSheet.create({
      input: {
            backgroundColor: 'rgba(0,0,0,.52)',
            borderRadius: 40,
            height: 40,
            color: COLORS.white,
            paddingLeft: 32,
            fontSize:16

      },
      heading: {
            textAlign: "center",
            fontWeight: '400',
            color: 'white',
            fontSize: SIZES.h1,
            marginTop: '50%', 
            marginBottom: '5%'

      },
      container: {
            backgroundColor: "rgb(43, 105, 106)",
            height: "100%",
            width: "100%",
            paddingHorizontal:48
      },
      text: {
            color: 'rgba(255, 255 ,255 ,.66)',
            marginVertical:16
      },
      cta: {
            color:COLORS.white
      },
      warning: {
            color:'#eb3464'
      },
      loader:{
            position:'absolute',
            top:'87%',
            left:'70%',
            zIndex:1
      }
})

export default styles;