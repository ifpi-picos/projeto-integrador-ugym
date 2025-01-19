import { StyleSheet,Dimensions} from "react-native";
import { temas } from "../../global/temas";


export const style = StyleSheet.create({
    boxInput:{
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:40,
        borderColor:temas.cores.lightgray,
        backgroundColor:temas.cores.bgScreen,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        // paddingHorizontal:20
    },
    input:{
        // backgroundColor:'red',
        height:'100%',
        width:'100%',
        borderRadius:40,
        fontSize:17,
        color:temas.cores.gray,
        // paddingHorizontal:20
    },
    titleInput:{
        marginLeft:5,
        color:temas.cores.primaria,
        marginTop:20
    },
    Button:{
        width:'10%',
    },
    Icon:{
        width:'100%',
    }
    
})