import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

/*
1em -------> 16
2em  -------> 32
3em  --------> 64
etc...

*/
//#0B535B

export const COLORS = { 
    white: "#fff",
    black: "#000000",
    primary: "#0B535B",
      background: '#F8F8F8',
      bluebg: '#E7EFF2',
      textGreen: '#667E81',
      darkGreen: '#314D50',
      inputGreen: '#072E33',
      headingGrey: "#DDDDDD",
  inputBorder: '#757575',
       inputText:'#F5F5F5',
       focus: '#44cfb0',
       danger: "#ef4444"
    
   
};
export const SIZES = {

      //my sizes

    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    h1: 30,
    h2: 22,
    h3: 16,
      h4: 14,
    h5: 12,
    
    // app dimensions
    width,
    height
};