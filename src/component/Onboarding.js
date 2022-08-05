import { View, Text, SafeAreaView,FlatList } from 'react-native'
import Button from './Button'
import styles from '../styles/others/onboarding'

const slides = [
  {
    id: 1,
    image : require('../../assets/images/card.png'),
    text : 'Manage all your Financial needs on the go'
  },  {
    id: 2,
    image : require('../../assets/images/money.png'),
    text : 'Keep working and start saving.'
  },  {
    id: 3,
    image : require('../../assets/images/INVES.png'),
    text : 'Find Legitimate Opportunities to Invest in'
  }
]

const Slide = ({item})=>{
  return(
    <View style={styles.container}>
    <View style={styles.containerPrimary}> 
          <Image style={styles.image} source={item.image}/>

    </View>

    <View  style={styles.containerSecondary}>
          <Image style={styles.icon} source={require('../../../assets/images/bar3.png')}/>
          <Text style={styles.heading}>{item.text}</Text>

          <Button text='Next' />
          <Text style={{textAlign:'center', marginTop:16}}>Skip</Text>
    </View>
    
</View>
  )
}

const Onboarding = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <FlatList
      data={slides}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=> <Slide item={item}/>}
      />
      
      
    </SafeAreaView>
  )
}

export default Onboarding