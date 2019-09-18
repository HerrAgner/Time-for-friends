import React, { useEffect } from "react";

const WorldMap = props => {
  let platform = new window.H.service.Platform({
    apikey: process.env.REACT_APP_API_KEY
  });
  let items = props.items;
  // let map
  useEffect(() => {
    if (items.length) {
      let container = reRenderMap();
      let defaultLayers = platform.createDefaultLayers();
      const map = new window.H.Map(container, defaultLayers.vector.normal.map, {
        zoom: 2,
        center: { lat: 15, lng: 5 }
      });

      let dataPoints = [];
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
              let bubble = new window.H.ui.InfoBubble(
                evt.target.getGeometry(),
                {
                  content: evt.target.getData()
                }
              );
              ui.addBubble(bubble);
            },
            false
          );

          let locations = result.Response.View[0].Result,
            position;
          position = {
            lat: locations[0].Location.DisplayPosition.Latitude,
            lng: locations[0].Location.DisplayPosition.Longitude
          };
          dataPoints.push(
            new window.H.clustering.DataPoint(
              position.lat,
              position.lng,
              1,
              `${p.name.firstName} ${p.name.lastName} in ${p.location.city}, ${
                p.location.country
              }`
            )
          );

          // addMarkerToGroup(
          //   group,
          //   position,
          //   `${p.name.firstName} ${p.name.lastName} in timezone: ${
          //     p.location.timeZone
          //   }`
          // );
          if (dataPoints.length === items.length) {
            let clusteredDataProvider = new window.H.clustering.Provider(
              dataPoints
            );

            let layer = new window.H.map.layer.ObjectLayer(
              clusteredDataProvider
            );
            map.addLayer(layer);
            clusteredDataProvider.addEventListener("tap", function(evt) {
              // Log data bound to the marker that has been tapped:
              let cnt = evt.target.getData();
              // if those data contain a data object it was a marker to be clicked
              // mine has a string (not yet set in the code above) which I show inside an InfoBubble
              if (typeof cnt.a.data !== "undefined") {
                console.log(cnt.a.data);
                let bubble = new window.H.ui.InfoBubble(
                  evt.target.getGeometry(),
                  {
                    content: cnt.a.data
                  }
                );
                ui.addBubble(bubble);
              } else {
                // console.log(evt.currentPointer);
                // console.log(evt.currentPointer.viewportX);

                // otherwise it was a cluster icon which doesn't contain a data object
                // set the map center to the coordinates where the user clicked
                // "true" is to have a smooth transition
                let bubbleText = [];
                cnt.forEachEntry(event => {
                  if (event.a.data) {

                    bubbleText.push({info: `${event.a.data}`, pos: event.getPosition()});
                  }
                });
                console.log(bubbleText[0].info);
                map.setCenter(
                  map.screenToGeo(
                    evt.currentPointer.viewportX,
                    evt.currentPointer.viewportY
                  )
                );
                  let bubble
                if(bubbleText.length > 1) {
                    bubble = new window.H.ui.InfoBubble(
                        evt.target.getGeometry(),
                        {
                            content: bubbleText.map(content => content.info).join(' ')
                        }
                    );
                } else {
                    bubble = new window.H.ui.InfoBubble(
                        new window.H.geo.Point(bubbleText[0].pos.lat, bubbleText[0].pos.lng),
                        {
                            content: bubbleText[0].info
                        }
                    );
                }
                ui.addBubble(bubble);

                // increase the zoom level by an amount which fits your needs
                // again "true" is to have a smooth transition
                map.setZoom(map.getZoom()+2, true);
              }
            });
          }
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
        let marker = new window.H.map.Marker(position);
        marker.setData(html);
        group.addObject(marker);
      };
    }
  }, [props.items]);

  const reRenderMap = () => {
    let parent = document.getElementById("parent");
    if (document.getElementById("worldmap")) {
      parent.removeChild(document.getElementById("worldmap"));
    }
    let container = document.createElement("div");
    container.setAttribute("id", "worldmap");
    container.setAttribute(
      "style",
      "width: 100%; height: 50vh; background: grey"
    );
    parent.append(container);
    return container;
  };

  return (
    <div id="parent">
      <div
        id="worldmap"
        style={{ width: "100%", height: "50vh", background: "grey" }}
      />
    </div>
  );
};

export default WorldMap;
