import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

function ChirpMap(props) {
    var googleMap = "";
    if(props.currentLocation) {
        var markers = props.posts.map((chirp, i) => {
            var location = {
                lat: chirp.loc.coordinates[1],
                lng: chirp.loc.coordinates[0]
            };
            var result = (<Marker key={chirp.cuid} position={location} />);
            return result;
        })
        googleMap = (<section style={{height: "400px"}} className="map">
            <GoogleMapLoader containerElement={<div
                style={{
                    height: "100%",
                }}
                />}
            googleMapElement={
                <GoogleMap
                ref={(map) => console.log(map)}
                defaultZoom={12}
                defaultCenter={{lat: props.currentLocation[1], lng: props.currentLocation[0]}}>
                {markers}
                </GoogleMap>
            }
            />
            </section>);
    } else {
        console.log("No location! Not rendering map.");
    }
    return (
        <div className="listView">
          {googleMap}
        </div>
    );
}

ChirpMap.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
    currentLocation: PropTypes.array.isRequired
};

export default connect()(ChirpMap);
