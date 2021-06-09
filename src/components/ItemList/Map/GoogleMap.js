import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from 'constants/constants';
import Avatar from 'assets/images/user.svg';

const style = {
  width: '100%',
  height: '80vh',
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {},

      mapCenter: {
        lat: props.centerLatitude,
        lng: props.centerLongitude,
      },
    };
  }

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng,
        }}
        center={{
          lat: this.props.latitude,
          lng: this.props.longitude,
        }}
        containerStyle={style}
        zoom={10}
      >
        <Marker
          position={{
            lat: this.props.centerLatitude,
            lng: this.props.centerLongitude,
          }}
          icon={{
            url: Avatar,
            scaledSize: this.props.google.maps.Size(5, 5),
          }}
        />
        <Marker
          position={{
            lat: this.props.latitude,
            lng: this.props.longitude,
          }}
          onClick={() => this.props.goToDetail(this.props.listingId)}
        ></Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(MapContainer);
