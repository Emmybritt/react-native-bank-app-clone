import { StyleSheet } from 'react-native'
import { COLORS } from '../../helpers/theme/constantstyles';

const styles = StyleSheet.create({
      container: {
            height: '100%',
            width: "100%",
            backgroundColor:COLORS.primary
      },
      containerPrimary: {
            display: 'flex',
            justifyContent: 'center',
            alignContent:"center",
        
            flex:1
            
      },
      containerImg: {
             height: 90,
             width: '100%',
      }

})

export default styles;