import { StyleSheet } from 'react-native'
import { COLORS , SIZES } from '../../helpers/theme/constantstyles';

const styles = StyleSheet.create({
      
      container: {
            backgroundColor: "rgb(43, 105, 106)",
            height: "100%",
            width: "100%",
            paddingHorizontal:48
      },
      heading: {
            textAlign: "left",
            fontWeight: '400',
            color: COLORS.white,
            fontSize: SIZES.h1,
            marginTop: "70%", 
            marginBottom: '10%'
      },
      input: {
            backgroundColor: 'rgba(0,0,0,.52)',
            borderRadius: 40,
            height: 40,
            color: COLORS.white,
            paddingLeft:32

      },
      text: {
            color: 'rgba(255, 255 ,255 ,.66)',
            marginVertical:16
            
      },
      password: {
            color: 'rgba(255, 255 ,255 ,.66)',
            marginVertical: 16,
            textAlign:'center'
      },
      footerText: {
            textAlign:'center',
            color: 'rgba(255, 255 ,255 ,.66)',
            marginVertical:24
      },
      cta: {
            color: "white",
            fontWeight:'400'
      },
      loader:{
            position:'absolute',
            top:'59.5%',
            left:'80%',
            zIndex:1
      }

})

export default styles;