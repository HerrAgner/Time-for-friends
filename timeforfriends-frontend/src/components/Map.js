import React, { Component } from "react";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.platform = null;
    this.map = null;

    this.state = {
      apikey: props.apikey,
      _id: props._id,
      zoom: props.zoom,
      theme: props.theme,
      style: props.style,
      geocodingParams: {
        searchText: props.geocodingParams
      }
    };
  }
  componentDidMount() {
    this.platform = new window.H.service.Platform({
      apikey: this.state.apikey
    });
    let container = document.getElementById(this.state._id);
    let defaultLayers = this.platform.createDefaultLayers();

    let onResult = result => {
      let locations = result.Response.View[0].Result,
        position,
        marker;
      position = {
        lat: locations[0].Location.DisplayPosition.Latitude,
        lng: locations[0].Location.DisplayPosition.Longitude
      };
      let map = new window.H.Map(container, defaultLayers.vector.normal.map, {
        zoom: this.state.zoom,
        center: { lat: position.lat, lng: position.lng }
      });
      marker = new window.H.map.Marker(position);
      map.addObject(marker);

        // eslint-disable-next-line
      let ui = window.H.ui.UI.createDefault(map, defaultLayers);
        // eslint-disable-next-line
      let behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map)
      );
    };

    let geocoder = this.platform.getGeocodingService();

    geocoder.geocode(this.state.geocodingParams, onResult, e => {
      alert(e);
    });
  }

  render() {
    return (
      <div
        id={this.state._id}
        style={{ width: "100%", height: "400px", background: "grey" }}
      />
    );
  }
}
