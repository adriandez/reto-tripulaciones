import * as React from "react";
import { useState, useEffect } from "react";
import GoogleIcon from "../../img/ggmaps.png";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import { debounce } from "debounce-react";
import axios from "axios";
import { Link } from "react-router-dom";
import MarkerImg from "../../img/marker.png";
import SearchImg from "../../img/search.png";
import StarRating from "../../util/Relevance";
import "./Home.scss";

const Home = () => {
  const [wc, setWc] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [allWcs, setAllWcs] = useState([]);
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [markerSelected, setmarkerSelected] = useState([]);
  const [remainingMarkers, setRemainMarkers] = useState([]);
  const [globalRating, setGlobalRating] = useState([]);
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    axios.get("/aseos").then((resultado) => {
      setAllWcs(resultado.data);
    });
  }, []);

  useEffect(() => {
    filterSearch();
  }, [search]);

  useEffect(() => {
    if (showDiv == false) {
      console.log("ahora es falso");
      document.getElementById("resultsSearch").style.display = "none";
    } else if (showDiv == true) {
      document.getElementById("resultsSearch").style.display = "block";
    }
  }, [showDiv]);

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
    document.getElementById("resultado").style.display = "block";

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
    e.preventDefault();
   
    if (filtrados === []) {
      let wcToSearch = e.target.wc.value;

      setSearch(wcToSearch);
      setShowDiv(true)
  
    } else {
      setFiltrados([]);
      setShowDiv(true)
      let wcToSearch = e.target.wc.value;

      setSearch(wcToSearch);
 
    }
    e.target.reset()
  };

  const stars = () => {
    return (
      <div className="popUpThumbail">
        <p>
          <img src="https://fotografias.antena3.com/clipping/cmsimages02/2020/04/27/EEAB541D-C2A5-4254-A620-5F597E99F93D/58.jpg"></img>
        </p>
        <p>{globalRating.nombre}</p>{" "}
        <a
          href={`http://www.google.com/maps/place/${globalRating.latitud},${globalRating.longitud}`}
        >
          {" "}
          <img className="ggMaps" src={GoogleIcon}></img>
        </a>
        <p>
          <StarRating totalStars={5} selected={globalRating.rating} />{" "}
        </p>
      </div>
    );
  };

  console.log(filtrados);

  return (
    <div>
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
      </section>

      <div id="resultado" className="popUp">
        {openPopup}

        {globalRating ? stars() : <p></p>}
      </div>
    </div>
  );
};

export default Home;
