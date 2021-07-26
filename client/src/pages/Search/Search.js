import * as React from "react";
import { useState, useEffect } from "react";
import GoogleIcon from "../../img/ggmaps.png";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchImg from "../../img/search.png";
import StarRating from "../../utils/Relevance";
import Tutorial from "../../components/Tutorial/Tutorial"
import "./Search.scss";

const Home = () => {
  // eslint-disable-next-line
  const [wc, setWc] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [allWcs, setAllWcs] = useState([]);
  const [search, setSearch] = useState("");
  // eslint-disable-next-line
  const [listSearch, setListSearch] = useState([]);
  const [markerSelected, setmarkerSelected] = useState([]);
  const [remainingMarkers, setRemainMarkers] = useState([]);
  const [globalRating, setGlobalRating] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);
  // eslint-disable-next-line
  const [info, setInfo] = useState("");
  const [sos, setSos] = useState(false);

  useEffect(() => {
    axios.get("/aseos").then((resultado) => {
      setAllWcs(resultado.data);
    });
  }, []);

  useEffect(() => {
    filterSearch();
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    if (showDiv === false) {
      document.getElementById("resultsSearch").style.display = "none";
    } else if (showDiv === true) {
      document.getElementById("resultsSearch").style.display = "block";
    }
  }, [showDiv]);

  useEffect(() => {
    if (sos === false) {
      document.getElementById("sos").className = "sos2";
    } else if (sos === true) {
      document.getElementById("sos").className = "sos";
    }
  }, [sos]);

  useEffect(() => {
    if (showPopUp === false) {
      document.getElementById("resultado").style.display = "none";
    } else if (showPopUp === true) {
      document.getElementById("resultado").style.display = "block";
    }
  }, [showPopUp]);

  const filterSearch = () => {
    let arraysss = [];
    document.getElementById("resultsSearch").innerHTML = "";
    for (let wcs of allWcs) {
      let searchlCase = search.toLowerCase();
      let nombre = wcs.nombre.toLowerCase();
      if (nombre.indexOf(searchlCase) !== -1) {
        arraysss.push(wcs);
        setFiltrados(arraysss);
      }
    }
  };

  // eslint-disable-next-line
  const searchWc = async (e) => {
    e.preventDefault();
    let wc = e.target.wc.value;
    let obj = {
      name: wc,
    };
    let resultWc = await axios.post("/api/search", obj);
    setWc(resultWc.data);
  };

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
      width: "100vw",
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
    width: "100vw",
    height: "90vh",
    latitude: 40.4205026,
    longitude: -3.7254743,
    zoom: 10,
  });

  const submitForm = (e) => {
    setshowPopUp(false);
    setSos(false);
    e.preventDefault();

    if (filtrados === []) {
      let wcToSearch = e.target.wc.value;
      setSearch(wcToSearch);
      setShowDiv(true);
    } else {
      let wcToSearch = e.target.wc.value;
      if (search === wcToSearch) {
        setShowDiv(true);
        setInfo("el baño que as introducido ya existe");
      } else {
        setFiltrados([]);
        setShowDiv(true);
        setSearch(wcToSearch);
      }
    }
    e.target.reset();
  };

  const stars = () => {
    return (
      <div className="popUpThumbail">
        <p>
          <img src="https://fotografias.antena3.com/clipping/cmsimages02/2020/04/27/EEAB541D-C2A5-4254-A620-5F597E99F93D/58.jpg" alt="Vista de la planta supeior de un centro comercial donde se pueden ver las dos plantas inferiores a traves de la apertura central"></img>
        </p>
        <p>{globalRating.nombre}</p>{" "}
        <a
          href={`http://www.google.com/maps/place/${globalRating.latitud},${globalRating.longitud}`}
        >
          {" "}
          <img className="ggMaps" src={GoogleIcon} alt="Icono de Google"></img>
        </a>
        <p>
          <StarRating totalStars={5} selected={globalRating.rating} />{" "}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Tutorial></Tutorial>
      <section className="Home">
        <div className="search">
          <form onSubmit={submitForm}>
            <input
              type="text"
              className="input"
              placeholder="Buscar Wc"
              name="wc"
            ></input>
            <input type="image" alt="Submit" src={SearchImg} />
          </form>
        </div>
        <div id="resultsSearch" className="resultsSearch">
          {search ? paintSearch() : ""}
        </div>
        <div className="map">
          <ReactMapGL
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
        </div>
        <div>
          <button id="sos" className="sos">
            SOS
          </button>
        </div>
      </section>

      <div id="resultado" className="popUp">
        {openPopup}

        {globalRating ? stars() : <p></p>}
      </div>
    </div>
  );
};

export default Home;
