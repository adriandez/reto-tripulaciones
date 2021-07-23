import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import { debounce } from "debounce-react";
import axios from "axios";
import { Link } from "react-router-dom";
import MarkerImg from "../../img/marker.png";
import SearchImg from "../../img/search.png"
import "./Home.scss";

const Home = () => {
  const [wc, setWc] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [allWcs, setAllWcs] = useState([]);
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [markerSelected, setmarkerSelected] = useState([]);
  const [remainingMarkers, setRemainMarkers] = useState([])

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
    document.getElementById("resultsSearch").style.display = "block";
    return filtrados.map((item, i) => (
      <p className="listWcs" key={i}>
        <Link onClick={() => paintMarker(item.aseo_ID)}>{item.nombre} </Link>
      </p>
    ));
  };

  const paintMarker = (banio) => {
 
    document.getElementById("resultsSearch").style.display="none"
    

   
    axios.get(`/aseos/${banio}`).then((resultado) => {
      
      setmarkerSelected([resultado.data]);
      filtrarDatos([resultado.data])
    });
 
    

 

  
 
  };
 
  const filtrarDatos = (datos) =>{

 

     let arraylimpio = allWcs.filter((item)=> item.codigoAseo !== `${datos[0].codigoAseo}` )
 
     setRemainMarkers(arraylimpio)     

setViewport
     ({
      width: "100vw",
      height: "90vh",
      latitude: datos[0].latitud,
      longitude: datos[0].longitud,
      zoom: 13,
    });


  }
  

 
 

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

    if (wcToSearch.trim() == "") {
      document.getElementById("resultsSearch").innerText = "";
    } else {
      debounce(() => setSearch(wcToSearch), 1500);
    }
  };

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "90vh",
    latitude: 40.4205026,
    longitude: -3.7254743,
    zoom: 10,
  });

 
 
  return (
    <div>
      <section className="Home">
      <div className="search">
        <form onSubmit={searchWc}>
        
          <input
            type="text"
            className="input"
            placeholder="Buscar Wc"
            name="wc"
            onChange={wcSearch}
          >
            
            
            </input>
            <img type="submit" className="searchIcon" src={SearchImg}></img>
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
            
            {markerSelected===[]? console.log("no hay datos") : markerSelected.map((item, i) => (
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
        onFocus={() => openPopup(item.nombre)}
      ></div>
    </Marker>
  )) 
  
  
  }
  

            { remainingMarkers? remainingMarkers.map((item, i) => (
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
            )): ""}  
         
             {/* {remainingMarkers? remainingMarkers.map((item, i) => (
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
            )): ""}  */}
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
