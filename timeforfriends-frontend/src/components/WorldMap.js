import React, { useEffect, useContext } from "react";
import { Store } from "../Store";
import "../style/map.css";

const WorldMap = props => {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    let platform = new window.H.service.Platform({
      apikey: process.env.REACT_APP_API_KEY
    });
    let items = props.items;
    if (items.length) {
      let container = reRenderMap();
      let defaultLayers = platform.createDefaultLayers();

      const map = new window.H.Map(container, defaultLayers.vector.normal.map, {
        zoom: window.innerWidth > 600 ? 3 : 1,
        center: { lat: 25, lng: 5 }
      });

      let tiles = platform.getMapTileService({ type: "base" });
      let layer = tiles.createTileLayer("maptile", "normal.night", 256, "png", {
        style: "wings"
      });
      map.setBaseLayer(layer);

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
              `${p.name.firstName} ${p.name.lastName}`
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
              let cnt = evt.target.getData();

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
                let bubbleText = [];
                cnt.forEachEntry(event => {
                  if (event.a.data) {
                    bubbleText.push({
                      info: `${event.a.data}\n`,
                      pos: event.getPosition()
                    });
                  }
                });
                map.setCenter(
                  map.screenToGeo(
                    evt.currentPointer.viewportX,
                    evt.currentPointer.viewportY
                  )
                );
                let bubble;
                if (bubbleText.length > 1) {
                  bubble = new window.H.ui.InfoBubble(
                    evt.target.getGeometry(),
                    {
                      content: bubbleText.map(c => c.info).join(",")
                    }
                  );
                } else {
                  bubble = new window.H.ui.InfoBubble(
                    new window.H.geo.Point(
                      bubbleText[0].pos.lat,
                      bubbleText[0].pos.lng
                    ),
                    {
                      content: bubbleText[0].info
                    }
                  );
                }
                ui.addBubble(bubble);

                map.setZoom(map.getZoom() + 2, true);
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
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);
      // eslint-disable-next-line
      const behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map)
      );
      state.language.code === "en"
        ? ui.setUnitSystem(window.H.ui.UnitSystem.IMPERIAL)
        : ui.setUnitSystem(window.H.ui.UnitSystem.METRIC);

      window.addEventListener("resize", function() {
        map.getViewPort().resize();
      });

      // Lurig grej
      map.addEventListener("contextmenu", function(evt) {
        if (evt.target !== map) {
          return;
        }
        let coord = map.screenToGeo(evt.viewportX, evt.viewportY);
        let lat = Math.abs(coord.lat.toFixed(3));
        let lng = Math.abs(coord.lng.toFixed(3));
        if (lat >= 49.109 && lat <= 49.119 && lng >= 8.502 && lng <= 8.514) {
          evt.items.push(
            new window.H.util.ContextItem({
              label: "Boldy go where no man has gone before?",
              callback: function() {
                dispatch({
                  type: "LANGUAGE",
                  payload: { name: "Klingon", code: "kl" }
                });
              }
            })
          );
        }
      });
    }
  }, [props, state.language.code, dispatch]);

  const reRenderMap = () => {
    let parent = document.getElementById("parent");
    if (document.getElementById("worldmap")) {
      parent.removeChild(document.getElementById("worldmap"));
    }
    let container = document.createElement("div");
    container.setAttribute("id", "worldmap");
    container.setAttribute(
      "style",
      "width: 100vw; height: 95vh; background: grey"
    );
    parent.append(container);
    return container;
  };

  return <div id="parent" />;
};

export default WorldMap;
