import { View, Text, Image, TextInput } from "react-native"
import styles from "../../styles/others/createpin";

import Button from "../../component/Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CreatePin = () => {
      
      
      return (
            <View style={styles.container}>
                  <Text style={styles.header}>Almost done</Text>
                  <View style={styles.imageContainer}>
                        
                  <Image style={styles.image} source={require('../../../assets/images/password.png')} />

                  </View>
                  <Text style={ styles.subheading }>Create a secure four(4) digit PIN for authorizing all your transactions</Text>

                  <View style={ styles.inputContainer }>
                        <TextInput style={styles.input} />
                        
                        <TextInput style={ styles.input }/>
                        
                        <TextInput style=
                         {styles.input} />
                        
                        <TextInput style={ styles.input }/>

                  </View>

                  <Button text='Create PIN' name='home'/>

            </View>
      )
}

export default CreatePin;