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
          let group = new window.H.map.Group();

          map.addObject(group);

          group.addEventListener(
            "tap",
            function(evt) {
                console.log(evt.target.getData());
              // event target is the marker itself, group is a parent event target
              // for all objects that it contains
              let bubble = new window.H.ui.InfoBubble(
                evt.target.getGeometry(),
                {
                  // read custom data
                  content: evt.target.getData()
                }
              );
              // show info bubble
              ui.addBubble(bubble);
            },
            false
          );

          let locations = result.Response.View[0].Result,
            position
          position = {
            lat: locations[0].Location.DisplayPosition.Latitude,
            lng: locations[0].Location.DisplayPosition.Longitude
          };
          addMarkerToGroup(group, position, `${p.name.firstName} ${p.name.lastName} in timezone: ${p.location.timeZone}`);
        };

        let geocoder = platform.getGeocodingService();

        geocoder.geocode(geocodingParams, onResult, e => {
          alert(e);
        });
      });

      // eslint-disable-next-line
      let ui = window.H.ui.UI.createDefault(map, defaultLayers);
      // eslint-disable-next-line
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

      let addMarkerToGroup = (group, position, html) => {
        var marker = new window.H.map.Marker(position);
        // add custom data to the marker
        marker.setData(html);
        group.addObject(marker);
      };
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
