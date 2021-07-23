import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import { debounce } from "debounce-react";
import axios from "axios";
import { Link } from "react-router-dom";
import MarkerImg from "../../img/marker.png";
import "./Home.scss";

const Home = () => {
  const [wc, setWc] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [allWcs, setAllWcs] = useState([]);
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);

  useEffect(() => {
    axios.get("/aseos").then((resultado) => {
      setAllWcs(resultado.data);
    });
  }, []);

  useEffect(() => {
    filterSearch();
  }, [search]);

  const filterSearch = () => {
    let arraysss = [];

    console.log(allWcs);

    console.log(search);
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

    console.log(resultWc.data);

    setWc(resultWc.data);
  };

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "90vh",
    latitude: 40.4205026,
    longitude: -3.7254743,
    zoom: 10,
  });
  console.log(wc);

  const paintSearch = () => {
    return filtrados.map((item) => (
      <p className="listWcs">
        <Link to={paintMarker(item.codigoAseo)}>{item.nombre}</Link>
      </p>
    ));
  };

  const openPopup = (index) => {
    document.getElementById("resultado").style.display = "block";
    document.getElementById("resultado").innerHTML = `


<p> ${index}  </p>
<p><img src="https://www.seekpng.com/png/detail/199-1996608_star-rating-3-5-stars.png"></p>
<p>Ahorarr dolore eiusmod apetecan la caidita ...</p>
 



`;
  };

  const wcSearch = (e) => {
    document.getElementById("resultsSearch").innerText = "";

    e.preventDefault();
    let wcToSearch = e.target.value;

    console.log(wcToSearch);

    if (wcToSearch.trim() == "") {
      document.getElementById("resultsSearch").innerText = "";
    } else {
      debounce(() => setSearch(wcToSearch), 1500);
    }
  };
  const paintMarker = (user) => {
    document.getElementById("resultsSearch").style.display = "none";

 

    let arraysss = [];

    for (let wcs of allWcs) {
      let nombre = wcs.codigoAseo.toLowerCase();

      if (nombre.indexOf(user) !== -1) {
        arraysss.push(wcs);
      }
    }
  };

  return (
    <div>
      <section className="Home">
        <form onSubmit={searchWc}>
          <input
            type="text"
            className="input"
            placeholder="Buscar Wc"
            name="wc"
            onChange={wcSearch}
          />
        </form>
        <div id="resultsSearch" className="resultsSearch">
          {search ? paintSearch() : ""}
        </div>
        <div className="map">
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          >
            {paintMarker}
            
            {filtrados.map((item, i) => (
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
                  onFocus={() => openPopup(item.nombre)}
                ></div>
              </Marker>
            ))}
          </ReactMapGL>
        </div>
      </section>

      <div id="resultado" className="popUp">
        {openPopup}
      </div>
    </div>
  );
};

export default Home;
