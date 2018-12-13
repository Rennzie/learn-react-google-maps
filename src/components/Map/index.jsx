import React, { Component } from 'react';

import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Map, GoogleApiWrapper } from 'google-maps-react';

const styles = () => ({
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStyles = {
  margin: 'auto',
  width: '80%',
  height: '80%'
};

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
    const { classes, google } = this.props;
    return (
      <section className={classes.container}>
        <Map
          onClick={this.handleMapClick}
          google={google}
          zoom={zoom}
          style={mapStyles}
          initialCenter={initialCenter}
        />
      </section>
    );
  }
}

MapContainer.defaultProps = {
  zoom: 16,
  initialCenter: {
    lat: -30.565528,
    lng: 29.232544
  }
};

export default withStyles(styles)(
  GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    LoadingContainer: CircularProgress
  })(MapContainer)
);
