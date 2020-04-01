import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map";

navigator.geolocation.getCurrentPosition(pos => {
  ReactDOM.render(
    // API KEY: &key=AIzaSyD7y_nN43cV_7PE6fwtfLcDhC2NW1INcuY
    <div style={{ width: "98vw", height: "98vh" }}>
      <Map lat={pos.coords.latitude} long={pos.coords.longitude} />
    </div>,
    document.getElementById("root")
  );
});
