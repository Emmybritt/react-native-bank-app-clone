import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllAsyncData = async ()=>{

  try {


    const data = await AsyncStorage.getItem('response')
    const userData = await AsyncStorage.getItem('userData')


    const dataObject = JSON.parse(data)
    const userDataObject = JSON.parse(userData)


    const userMail = dataObject.result[0].username;
    const token = dataObject.result[0].token

    console.log(userMail , token, userDataObject)
       

  }
  catch (error) {

    console.log(error)

  }
}


( function(){

  getAllAsyncData()

} )()