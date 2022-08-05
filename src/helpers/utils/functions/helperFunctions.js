
import axios from 'axios'

export const isValidEmail = (value) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  
  return regex.test(value);

}

export const testValidNumber = (value) => {
  const regex = /((^090)([23589]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/
  return regex.test(value)
  
}

export const errorHandler = (error, setError) => {
  setError(error)
  
}

export const serverRequest = async (baseUrl , route , requestType, payload, headers)=>{

  try{
    const res = await axios.requestType(`${baseUrl}${route}`)
  }
  catch (error){
    console.log(error)
  }

} 
