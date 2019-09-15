import React, {Component} from "react"

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.platform = null;
        this.map = null;

        this.state = {
            app_id: props.app_id,
            app_code: props.app_code,
            _id: props._id,
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            zoom: props.zoom,
            theme: props.theme,
            style: props.style,
            geocodingParams: {
                searchText: props.geocodingParams
            }
        }
    }
    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);
        let container = document.getElementById(this.state._id);

// Retrieve the target element for the map:

// Get default map types from the platform object:
        let defaultLayers = this.platform.createDefaultLayers();

// Instantiate the map:
//         let map = new window.H.Map(
//             container,
//             defaultLayers.normal.map,
//             {
//                 zoom: 10,
//                 center: { lat: 55.51, lng: 13.4 }
//             });

// Define a callback function to process the geocoding response:
        var onResult = function(result) {
            var locations = result.Response.View[0].Result,
                position,
                marker;
            // Add a marker for each location found
            for (let i = 0;  i < locations.length; i++) {
                position = {
                    lat: locations[i].Location.DisplayPosition.Latitude,
                    lng: locations[i].Location.DisplayPosition.Longitude
                };
                // map.center.lng = position.lng
                let map = new window.H.Map(
                    container,
                    defaultLayers.normal.map,
                    {
                        zoom: 12,
                        center: { lat: position.lat, lng: position.lng }
                    }
                    );
                marker = new window.H.map.Marker(position);
                map.addObject(marker);

            }
        };


// Get an instance of the geocoding service:
        var geocoder = this.platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
        geocoder.geocode(this.state.geocodingParams, onResult, function(e) {
            alert(e);
        });
    }

    render() {
        return (
            <div id={this.state._id} style={{width: '100%', height: '400px', background: 'grey' }} />
        );
    }
}