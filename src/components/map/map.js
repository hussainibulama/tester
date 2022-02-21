import React from "react";

import {
  Map,
  Marker,
  GoogleApiWrapper,
} from "google-maps-react";

// ...

export class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorldWide: "",
      isNationWide: "",
    };
  }

  render() {
    const coords = { lat: 9.57999, lng: 8.05953 };

    const triangleCoords = [
      { lat: 6.465422, lng: 3.406448 },
      { lat: 10.609319, lng: 7.429504 },
      { lat: 9.072264, lng: 7.491302 },
    ];
    const points = [
      { lat: 6.465422, lng: 3.406448 },
      { lat: 10.609319, lng: 7.429504 },
      { lat: 9.072264, lng: 7.491302 },
    ];
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (
      <>
        
          <Map
            google={this.props.google}
            initialCenter={{ lat: 9.082, lng: 8.6753 }}
            style={{
              width: "100%",
              borderRadius: 5,
              height: 450,
              position: "relative",
            }}
            zoom={6.2}
          >
            {this.props.val.map((item) => {
              return (
                <Marker
                  title={item.id}
                  name={item.id}
                  
                  position={item.coordinate}
                />
              );
            })}
          
        
          
         
          </Map>
        
     
      
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAkG4G0HYIVAvcGxeq7VRH0NKHoH85bI9A",
})(Maps);
