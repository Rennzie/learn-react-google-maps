import React, { Component } from 'react';

import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Map, GoogleApiWrapper } from 'google-maps-react';

const containerStyle = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStyles = {
  margin: 'auto',
  width: '80%',
  height: '80%'
};

/**
 *    GOAL:  To an interactive pseudo GIS map using the google maps API
 *
 *    1) return the LatLng from the map on click and use it to add a marker
 *
 */

class MapContainer extends Component {
  state = {};

  componentDidMount() {
    const { zoom, initialCenter } = this.props;
    this.setState(() => ({ initialCenter, zoom }));
  }

  // NEXT: trying to get a mouse click to return the coordinates
  handleMapClick = event => {
    const LatLng = event;
    console.log('clicked the map and got this event', LatLng);
  };

  render() {
    const { zoom, initialCenter } = this.state;
    const { google } = this.props;
    return (
      <Map
        onClick={this.handleMapClick}
        google={google}
        zoom={zoom}
        style={mapStyles}
        containerStyle={containerStyle}
        initialCenter={initialCenter}
      />
    );
  }
}

MapContainer.defaultProps = {
  zoom: 16,
  initialCenter: {
    lat: -30.565528,
    lng: 29.232544
  },
  centerAroundCurrentLocation: true
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  LoadingContainer: CircularProgress
})(MapContainer);
