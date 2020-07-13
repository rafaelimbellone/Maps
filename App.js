

import React, {Component,useEffect, useState, Fragment} from 'react';
import { StyleSheet, Alert, PermissionsAndroid, View, Text, Platform, TouchableOpacity, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Search from './Search';
import Directions from './Directions';
import Geocoding from 'react-native-geocoding';
import {getPixelSize} from'./utils';
import markerImage from './assets/marker.png';
import markerImageOrigin from './assets/markers.png'
import markerImageDestino from './assets/marker_red.png'
import backImage from './assets/back.png';
import Details from './Detais';

Geocoding.init('AIzaSyDy5PZU4Q96Pa4l6vboxVGIzq3-_2S7uNU');

export default class App extends Component{
  state={
    userPosition:null,
    destination: null,
    duration: null,
    distance: null,
    location: null,
  };

  async componentDidMount(){
    //pega o nome da (rua, avenida) através da latitude e longitude.
    const response = await Geocoding.from({latitude: -23.676117, longitude:-46.668733});
    //pega apenas a primeria parte dos dados.
    const address = response.results[0].formatted_address;
    //pega o endereço até a primeria vírgula.
    const location = address.substring(0, address.indexOf(','));
    this.setState({
                  location,
                  userPosition: {
                    latitude: -23.676117, 
                    longitude:-46.668733,
                    latitudeDelta:0.143,
                    longitudeDelta: 0.134,
                 }})      
  }
  
  //metodo pega o endereço digita pelo usuario.
  handlerLocationSelected = (data, {geometry}) => {
    const {location: {lat:latitude, lng: longitude}} = geometry;
    this.setState({
      destination:{
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    }})
  }
  // volta para a tela de pesquisar um endereço.
  handleBack = () => {
    this.setState({destination: null } );
  }
  
  render(){
    //const [hasLocationPermission, setHasLocationPermission] = useState(null);
    const {userPosition, destination, duration, distance, location} = this.state;
        
  return(    
    <View style={{flex:1}}> 
      <MapView style={{flex:1}}
               initialRegion={{latitude: -23.676117, 
                longitude:-46.668733,
                latitudeDelta:0.143,
                longitudeDelta: 0.134}}
               showsPointsOfInterest
               loadingEnabled   
               ref={el => this.mapView = el}
      >
         {destination && (
           <Fragment>
              <Directions
                origin={{latitude: -23.676117,
                          longitude:-46.668733}}
                destination={destination}
                onReady={result => {
                  this.setState({duration: Math.floor(result.duration)});
                  this.setState({distance: result.distance});
                  this.mapView.fitToCoordinates(result.coordinates,{
                      edgePadding:{
                        right: getPixelSize(50),
                        left: getPixelSize(50),
                        top: getPixelSize(50),
                        bottom:getPixelSize(280),
                      }
                    });
                }}
              />
              <Marker coordinate={{latitude: -23.676117,
                                   longitude:-46.668733
                                  }} 
                      anchor={{ x:0 , y:0 }} 
                      image={markerImage} 
              >
                <View style={styles.locationBoxOrigin}>
                  <View style={styles.locationTimeBox}>
                    <Text style={styles.locationTimeText}>{duration}</Text>
                    <Text style={styles.locationTimeTextSmall}>MIN</Text>  
                  </View>
                    <Text style={styles.locationText}>{location}</Text>  
                </View>
              </Marker>
              <Marker coordinate={destination} 
                      anchor={{ x:0 , y:0 }} 
                      image={markerImage} 
              >
                <View style={styles.locationBoxDestination}>
                   <Text style={styles.locationText}>{destination.title}</Text>
                </View>
              </Marker>
         </Fragment>
            )}
      </MapView>
      {destination ? 
                    <Fragment>
                      <TouchableOpacity style={styles.back} onPress={this.handleBack}>
                        <Image source={backImage}/>
                      </TouchableOpacity>
                      <Details/>
                    </Fragment> 
                   : <Search onLocationSelected={this.handlerLocationSelected}/>}
            
   </View>      
                            
  );
 }
}

const styles = StyleSheet.create({
  mapContainer:{
    flex:1,
  },
  search:{
    position: 'absolute',
    margin:5,
  },
  locationBoxDestination:{
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOpacity:0.1,
    elevation:1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius:3,
    flexDirection:'row',
    marginTop:10,
    marginLeft: 20,
  }, 
  locationBoxOrigin:{
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOpacity:0.1,
    elevation:1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius:3,
    flexDirection:'row',
    marginTop:15,
    marginRight: 50,
  }, 
  locationBoxDistance:{
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOpacity:0.1,
    elevation:1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius:3,    
    width:193,
    marginRight: 20,
  }, 
  locationText:{
    marginLeft: 8,
    marginRight: 10,
    fontSize:14,
    color:'#333',    
  }, 
  locationTimeBox:{
      backgroundColor:'#222',
      paddingHorizontal:5,
      
  },
  locationTimeText: {
    color:'#fff',
    fontSize: 12,
    textAlign: 'center',
    
  },
  locationTimeTextSmall:{
    color:'#fff',
    fontSize: 10,
    textAlign: 'center',
  }, 
  back: {
    position:'absolute',
    top:40,
    left:20,
  }
})

