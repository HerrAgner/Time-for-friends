import React, { useEffect } from "react";

const WorldMap = props => {
  let items = props.items;
  useEffect(() => {
    if (items.length) {
      let platform = new window.H.service.Platform({
        apikey: process.env.REACT_APP_API_KEY
      });
      let container = document.getElementById("worldmap");
      let defaultLayers = platform.createDefaultLayers();
      let map = new window.H.Map(container, defaultLayers.vector.normal.map, {
        zoom: 1,
        center: { lat: 15, lng: 5 }
      });
      items.forEach(p => {
        let geocodingParams = {
          country: p.location.country,
          city: p.location.city
        };
        let onResult = result => {
          let locations = result.Response.View[0].Result,
            position,
            marker;
          position = {
            lat: locations[0].Location.DisplayPosition.Latitude,
            lng: locations[0].Location.DisplayPosition.Longitude
          };

          marker = new window.H.map.Marker(position);
          map.addObject(marker);
        };

        let geocoder = platform.getGeocodingService();

        geocoder.geocode(geocodingParams, onResult, e => {
          alert(e);
        });
      });

      // eslint-disable-next-line
      window.H.ui.UI.createDefault(map, defaultLayers);
      // eslint-disable-next-line
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    }
  }, [props.items]);

  return (
    <div
      id="worldmap"
      style={{ width: "100%", height: "50vh", background: "grey" }}
    />
  );
};

export default WorldMap;
