import React, { Component } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox
} from "@react-google-maps/api";
import { IconButton, Modal, Button, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const libraries = ["places"];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateEvent: false,
      createEventName: null,
      createEventDate: null,
      currentPosition: { lat: this.props.lat, lng: this.props.long },
      defaultPosition: { lat: this.props.lat, lng: this.props.long },
      markers: [
        { label: "test1", position: { lat: 36.5, lng: -119.5 } },
        { label: "test2", position: { lat: 36, lng: -119 } }
      ]
    };
  }

  render() {
    return (
      <LoadScript
        libraries={libraries}
        googleMapsApiKey="AIzaSyD7y_nN43cV_7PE6fwtfLcDhC2NW1INcuY"
      >
        <GoogleMap
          mapContainerStyle={{
            height: "98vh",
            width: "98vw"
          }}
          zoom={13}
          center={{ lat: this.props.lat, lng: this.props.long }}
        >
          <StandaloneSearchBox>
            <input
              type="text"
              placeholder="Search for events..."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `500px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-250px"
              }}
            />
          </StandaloneSearchBox>

          {this.state.markers.map((marker, i) => {
            console.log(marker.position);
            return (
              <Marker key={i} label={marker.label} position={marker.position} />
            );
          })}

          <Marker
            draggable={true}
            position={this.state.currentPosition}
            onDragEnd={e => {
              this.setState({
                currentPosition: { lat: e.latLng.lat(), lng: e.latLng.lng() }
              });
            }}
          />

          <IconButton
            style={{ position: "absolute", bottom: 20, left: 20 }}
            onClick={() => {
              this.setState({ showCreateEvent: true });
            }}
          >
            <AddIcon />
          </IconButton>
          <Modal
            open={this.state.showCreateEvent}
            onClose={() => {
              this.setState({ showCreateEvent: false });
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "98vh"
              }}
            >
              <div
                style={{
                  width: 250,
                  minHeight: 150,
                  backgroundColor: "#FFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20
                }}
              >
                <TextField
                  label="Name of event"
                  variant="outlined"
                  style={{ paddingBottom: 10 }}
                  onChange={e => {
                    this.setState({ createEventName: e.target.value });
                  }}
                />
                <TextField
                  label="Set date and time"
                  type="datetime-local"
                  defaultValue="2020-04-01T10:30"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => {
                    this.setState({ createEventDate: e.target.value });
                  }}
                />
                <Button
                  style={{ marginTop: 5, paddingTop: 10, textAlign: "center" }}
                  onClick={() => {
                    console.log(this.state.createEventName);
                    console.log(this.state.createEventDate);
                    this.setState(prevState => ({
                      markers: [
                        ...prevState.markers,
                        { position: this.state.currentPosition }
                      ]
                    }));
                    this.setState({
                      currentPosition: this.state.defaultPosition
                    });
                  }}
                >
                  Create Event
                </Button>
              </div>
            </div>
          </Modal>
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
