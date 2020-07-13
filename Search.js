import React, {Component, useState} from 'react';
import {Platform} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class Search extends Component{
    state={
        searchFocused:false,
    }
    render(){
        const {searchFocused} = this.state;
        const { onLocationSelected } = this.props;
        return(
            
            <GooglePlacesAutocomplete
                    placeholder="Para onde?"
                    placeholderTextColor='#333'
                    onPress={onLocationSelected}
                    query={{
                        key:'AIzaSyDy5PZU4Q96Pa4l6vboxVGIzq3-_2S7uNU',
                        language:'pt'
                    }}
                    textInputProps={{
                        onFocus: () => {this.setState({searchFocused:true})},
                        onBlur: () => {this.setState({searchFocused:false})},
                        autoCapitalize:'none',
                        autoCorrect: false
                    }}
                    listViewDisplayed={searchFocused}
                    fetchDetails
                    enablePoweredByContainer={false}
                    styles={{
                        container:{
                            position:"absolute",
                            top: Platform.select({ios:60, android:40}),
                            width:"100%",
                        },
                        textInputContainer:{
                            flex: 1,
                            backgroundColor: "transparent",
                            height: 44,
                            marginHorizontal: 20,
                            borderTopWidth:0, 
                            borderBottomWidth:0,
                        },
                        textInput:{
                            height:52,
                            margin: 0,
                            borderRadius: 4,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginTop: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            elevation:5,
                            borderWidth:1,
                            borderColor:"#DDD",
                            fontSize:18,                    
                        },
                        listView: {
                            borderWidth: 1,
                            borderColor: "#DDD",
                            backgroundColor: "#FFF",
                            marginHorizontal: 20,
                            elevation: 5,
                            marginTop: 10,
                        },
                        description:{
                            fontSize:16,
                        },
                        row: {
                            padding:15,
                            height:52,
                        }

                    }}
            />
        )
    }
}