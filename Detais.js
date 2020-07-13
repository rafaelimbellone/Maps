import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import uberX from './assets/uberx.png';

export default class Details extends Component{
    render(){
        return(
        <View style={styles.container}>
          <Text style={styles.typeTitle}>Popular</Text>
          <Text style={styles.typeDescription}>Viagens baratas</Text>
          <Image style={styles.typeImage} source={uberX}/>
          <Text style={styles.typeTitle}>UberX</Text>
          <Text style={styles.typeDescription}>R$ 6.00</Text>
          <TouchableOpacity style={styles.requestButtom} onPress={() => {}}>
              <Text style={styles.requestButtomText}>Solicitar</Text>
          </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
       backgroundColor: '#fff',
       height:260,
       width:'100%',
       position:'absolute',
       bottom:0,
       shadowColor:'#000',
       shadowOpacity: 0.2,
       shadowRadius:10,
       elevation:3,
       borderColor:'#DDD',
       borderWidth:1,
       alignItems:'center',
       padding:5,
    },
    typeTitle:{
      fontSize:20,
      color:'#222',
    },
    typeDescription:{
        fontSize:16,
        color:'#666',
    },
    typeImage:{
       height:80,
       margin:10,
    },
    requestButtom:{
      backgroundColor:"#222",
      justifyContent:'center',
      alignItems:'center',
      height:44,
      alignSelf:'stretch',
      marginTop:10,
    },
    requestButtomText:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:18,
    },
})