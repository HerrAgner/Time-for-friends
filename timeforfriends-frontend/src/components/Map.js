import React, { useEffect, useContext } from "react";
import { Store } from "../Store";

const Map = props => {
  const { state } = useContext(Store);
  useEffect(() => {
    let platform = new window.H.service.Platform({
      apikey: process.env.REACT_APP_API_KEY
    });
    let container = reRenderMap(props);
    let defaultLayers = platform.createDefaultLayers();

    let onResult = result => {
      let locations = result.Response.View[0].Result,
        position,
        marker;
      position = {
        lat: locations[0].Location.DisplayPosition.Latitude,
        lng: locations[0].Location.DisplayPosition.Longitude
      };
      let map = new window.H.Map(container, defaultLayers.vector.normal.map, {
        zoom: props.zoom,
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
      state.language.code === "en"
        ? ui.setUnitSystem(window.H.ui.UnitSystem.IMPERIAL)
        : ui.setUnitSystem(window.H.ui.UnitSystem.METRIC);
    };

    let geocoder = platform.getGeocodingService();
    let geocodingParams = {
      country: props.country,
      city: props.city
    };

    geocoder.geocode(geocodingParams, onResult, e => {
      alert(e);
    });
  }, [props, state.language.code]);

  const reRenderMap = props => {
    let parent = document.getElementById("parentSingleMap");
    if (document.getElementById(props._id)) {
      parent.removeChild(document.getElementById(props._id));
    }
    let container = document.createElement("div");
    container.setAttribute("id", props._id);
    container.setAttribute(
      "style",
      "width: 100%; height: 400px; background: grey"
    );
    parent.append(container);
    return container;
  };

  return (
    <div id="parentSingleMap">
      <div
        id={props._id}
        style={{ width: "100%", height: "400px", background: "grey" }}
      />
    </div>
  );
};

export default Map;
