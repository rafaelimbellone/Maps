import React from 'react';

import MapViewDirections from 'react-native-maps-directions';

const Directions = ({destination, origin, onReady}) => (
   <MapViewDirections
     destination={destination}
     origin={origin}
     onReady={onReady}
     apikey="AIzaSyDy5PZU4Q96Pa4l6vboxVGIzq3-_2S7uNU"
     strokeWidth={3}
     strokeColor="#222"
   />
)

export default Directions;