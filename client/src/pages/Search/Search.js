import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchImg from "../../img/search.png";
import StarRating from "../../util/Relevance";

import "./Search.scss";

const Home = () => {

  const [filtrados, setFiltrados] = useState([]);
  const [allWcs, setAllWcs] = useState([]);
  const [search, setSearch] = useState("");

  const [markerSelected, setmarkerSelected] = useState([]);
  const [remainingMarkers, setRemainMarkers] = useState([]);
  const [globalRating, setGlobalRating] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);

  const [info, setInfo] = useState("");
  const [sos, setSos] = useState(false);

  useEffect(() => {
    axios.get("/aseos").then((resultado) => {
      setAllWcs(resultado.data);
    });
  }, []);







  const paintSearch = () => {
    return filtrados.map((item, i) => (
      <p className="listWcs" key={i}>
        <Link
          onClick={() => {
            paintMarker(item.aseo_ID);

            setShowDiv(false);
          }}
        >
          {item.nombre}{" "}
        </Link>
      </p>
    ));
  };

  const paintMarker = (aseos) => {
    axios.get(`/aseos/${aseos}`).then((resultado) => {
      setmarkerSelected([resultado.data]);
      filtrarDatos([resultado.data]);
    });
  };

  const filtrarDatos = (datos) => {
    let arraylimpio = allWcs.filter(
      (item) => item.codigoAseo !== `${datos[0].codigoAseo}`
    );

    setRemainMarkers(arraylimpio);

    setViewport({
      width: "375px",
      height: "90vh",
      latitude: datos[0].latitud,
      longitude: datos[0].longitud,
      zoom: 13,
    });
  };

  const openPopup = (nombre, latitud, longitud, aseo) => {
    setshowPopUp(true);
    setSos(true);

    axios.get(`/aseos/raiting/${aseo}`).then((resultado) => {
      let thumbnail = {
        nombre,
        latitud,
        longitud,
        aseo,
        rating: resultado.data.raiting,
      };

      setGlobalRating(thumbnail);
    });
  };

  const [viewport, setViewport] = useState({
    width: "375px",
    height: "90vh",
    latitude: 40.4205026,
    longitude: -3.7254743,
    zoom: 10,
  });

  return (
    <section className="map-container">
        <ReactMapGL
          className="map-container"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {markerSelected === []
            ? console.log("no hay datos")
            : markerSelected.map((item, i) => (
                <Marker
                  key={i}
                  latitude={item.latitud}
                  longitude={item.longitud}
                  offsetLeft={-20}
                  offsetTop={-30}
                >
                  <div
                    className="marker2"
                    tabIndex="0"
                    onFocus={() =>
                      openPopup(
                        item.nombre,
                        item.latitud,
                        item.longitud,
                        item.codigoAseo
                      )
                    }
                  ></div>
                </Marker>
              ))}
          {remainingMarkers
            ? remainingMarkers.map((item, i) => (
                <Marker
                  key={i}
                  latitude={item.latitud}
                  longitude={item.longitud}
                  offsetLeft={-20}
                  offsetTop={-30}
                >
                  <div
                    className="marker"
                    tabIndex="0"
                    onFocus={() =>
                      openPopup(
                        item.nombre,
                        item.latitud,
                        item.longitud,
                        item.codigoAseo
                      )
                    }
                  ></div>
                </Marker>
              ))
            : ""}
        </ReactMapGL>
    </section>
  );
};

export default Home;
